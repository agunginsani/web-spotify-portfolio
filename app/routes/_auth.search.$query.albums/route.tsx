import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  defer,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { client } from "~/helpers/network.server";
import { ErrorElement } from "~/routes/_auth.search/components";

const schema = z.object({
  albums: z.object({
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    offset: z.number(),
    total: z.number(),
    limit: z.number(),
    items: z.array(
      z.object({
        name: z.string(),
        id: z.string(),
        release_date: z.string(),
        images: z.array(
          z.object({
            url: z.string().url(),
            height: z.number(),
            width: z.number(),
          }),
        ),
        artists: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            href: z.string().url(),
          }),
        ),
      }),
    ),
  }),
});

const limit = 50;

export async function loader({ request, params }: LoaderFunctionArgs) {
  const query = z.string().parse(params.query);

  const searchParams = new URL(request.url).searchParams;
  searchParams.set("q", query);
  searchParams.set("type", "album");
  searchParams.set("limit", limit.toString());
  searchParams.set("market", "ID");

  const response = client(
    request,
    `https://api.spotify.com/v1/search?${searchParams}`,
  ).then(async (response) => {
    if (response.ok) {
      const data = schema.parse(await response.json());
      return data.albums;
    }
    if (response.status === 400) {
      return {
        items: [],
        offset: 0,
        limit: 0,
        previous: null,
        next: null,
        total: 0,
      } satisfies z.infer<typeof schema>["albums"];
    }
    throw response;
  });

  return defer({ albums: response });
}

export default function Route() {
  const data = useLoaderData<typeof loader>();
  const error = useRouteError();
  const { loadMoreItems, lastItemRef } = useInfiniteItems();

  if (isRouteErrorResponse(error)) {
    return <div>{error.data}</div>;
  }

  return (
    <Suspense fallback={null}>
      <Await resolve={data.albums} errorElement={<ErrorElement />}>
        {(album) => {
          const items = [...album.items, ...loadMoreItems];
          return (
            <ul
              className="flex flex-col flex-wrap justify-between gap-0 lg:flex-row lg:gap-3"
              aria-label="Albums"
            >
              {items.map((item, index) => {
                const avatar =
                  item.images.length === 0 ? null : item.images[0].url;
                const [year] = item.release_date.split("-");
                const [artist] = item.artists;
                return items.length === index + 1 ? (
                  <li
                    ref={lastItemRef}
                    key={item.id}
                    className="flex w-full overflow-hidden lg:w-auto"
                  >
                    <AlbumCard
                      id={item.id}
                      year={year}
                      name={item.name}
                      avatar={avatar}
                      artist={artist.name}
                    />
                  </li>
                ) : (
                  <li
                    key={item.id}
                    className="flex w-full overflow-hidden lg:w-auto"
                  >
                    <AlbumCard
                      id={item.id}
                      year={year}
                      name={item.name}
                      avatar={avatar}
                      artist={artist.name}
                    />
                  </li>
                );
              })}
            </ul>
          );
        }}
      </Await>
    </Suspense>
  );
}

type AlbumCard = {
  id: string;
  name: string;
  avatar: string | null;
  year: string;
  artist: string;
};

function AlbumCard({ avatar, name, year, artist }: AlbumCard) {
  const size = 150;
  return (
    <button className="flex w-full items-center gap-1 overflow-hidden bg-gray-800 p-3 hover:bg-gray-700 lg:w-[175px] lg:flex-col lg:rounded-lg">
      {avatar === null ? (
        <div className="mr-2 size-full max-h-12 max-w-12 rounded-lg lg:mr-0 lg:max-h-[140px] lg:max-w-[140px]" />
      ) : (
        <img
          src={avatar}
          alt=""
          role="presentation"
          className="mr-2 size-full max-h-12 max-w-12 rounded-lg object-cover lg:mr-0 lg:max-h-[140px] lg:max-w-[140px]"
          width={size}
          height={size}
        />
      )}

      {/* Large screen */}
      <div className="hidden w-full overflow-hidden text-ellipsis text-nowrap text-left font-bold lg:block">
        {name}
      </div>
      <div className="hidden w-full text-right text-sm text-slate-500 lg:block lg:text-left">
        {year} • {artist}
      </div>

      {/* Small screen. */}
      <div className="overflow-hidden lg:hidden">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-left font-bold">
          {name}
        </div>
        <div className="text-left text-sm text-slate-500">
          {year} • {artist}
        </div>
      </div>
    </button>
  );
}

type AlbumItems = z.infer<typeof schema>["albums"]["items"];

function useInfiniteItems() {
  const initialOffset = limit;
  const params = useParams();
  const { load, ...fetcher } = useFetcher<typeof loader>();
  const [loadMoreItems, setInfiniteItems] = useState<AlbumItems>([]);
  const [offset, setOffset] = useState(initialOffset);
  const observer = useRef<IntersectionObserver>();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastItemRef = useCallback((node: HTMLLIElement) => {
    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setOffset((prev) => prev + limit);
      }
    });

    if (node instanceof Element) {
      observer.current.observe(node);
    }
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      Promise.resolve(fetcher.data.albums).then(({ items, next }) => {
        setInfiniteItems((prevs) => [...prevs, ...items]);
        if (next === null) observer.current?.disconnect();
      });
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (offset > initialOffset) {
      const searchParams = new URLSearchParams();
      searchParams.append("offset", offset.toString());
      searchParams.append("type", params.type!);
      searchParams.append("q", searchInputRef.current?.value ?? "");
      load(`?${searchParams}`);
    }
  }, [initialOffset, load, offset, params.type]);

  return { loadMoreItems, lastItemRef };
}
