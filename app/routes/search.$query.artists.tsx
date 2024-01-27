import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  defer,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { client } from "~/helpers/network";

const schema = z.object({
  artists: z.object({
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    offset: z.number(),
    total: z.number(),
    limit: z.number(),
    items: z.array(
      z.object({
        name: z.string(),
        id: z.string(),
        images: z.array(
          z.object({
            url: z.string().url(),
            height: z.number(),
            width: z.number(),
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
  searchParams.set("type", "artist");
  searchParams.set("limit", limit.toString());
  searchParams.set("market", "ID");

  const response = client(
    request,
    `https://api.spotify.com/v1/search?${searchParams}`,
  ).then(async (response) => {
    if (response.ok) {
      const data = schema.parse(await response.json());
      return data.artists;
    }
    if (response.status === 400) {
      return {
        items: [],
        offset: 0,
        limit: 0,
        previous: null,
        next: null,
        total: 0,
      } satisfies z.infer<typeof schema>["artists"];
    }
    throw response;
  });

  return defer({ artists: response });
}

export default function Route() {
  const error = useRouteError();
  const { infiniteItems, fetcher, lastItemRef } = useInfiniteItems();

  if (isRouteErrorResponse(error)) {
    return <div>{error.data}</div>;
  }

  return (
    <>
      <ul className="flex flex-col flex-wrap justify-between gap-0 text-white lg:flex-row lg:gap-3">
        {infiniteItems.map((item, index) => {
          const avatar = item.images.length === 0 ? null : item.images[0].url;
          const key = `${item.id}_${index}`;
          return infiniteItems.length === index + 1 ? (
            <li
              ref={lastItemRef}
              key={key}
              className="flex w-full overflow-hidden lg:w-auto"
            >
              <ArtistCard id={item.id} name={item.name} avatar={avatar} />
            </li>
          ) : (
            <li key={key} className="flex w-full overflow-hidden lg:w-auto">
              <ArtistCard id={item.id} name={item.name} avatar={avatar} />
            </li>
          );
        })}
      </ul>
      {fetcher.state === "loading" ? <div>Loading...</div> : null}
    </>
  );
}

type ArtistCard = {
  id: string;
  name: string;
  avatar: string | null;
};

function ArtistCard({ avatar, name }: ArtistCard) {
  const size = 150;
  return (
    <button className="h-ful flex w-full flex-row items-center gap-1 overflow-hidden rounded-none bg-gray-800 p-3 hover:bg-gray-700 lg:w-[175px] lg:flex-col lg:rounded-lg">
      {avatar === null ? (
        <div className="mr-2 h-full max-h-12 w-full max-w-12 rounded-full lg:mr-0 lg:max-h-[140px] lg:max-w-[140px]" />
      ) : (
        <img
          src={avatar}
          alt=""
          role="presentation"
          className="mr-2 h-full max-h-12 w-full max-w-12 rounded-full object-cover lg:mr-0 lg:max-h-[140px] lg:max-w-[140px]"
          width={size}
          height={size}
        />
      )}

      {/* Large screen. */}
      <div className="hidden w-full text-left font-bold lg:block">{name}</div>
      <div className="hidden w-full text-left text-sm text-slate-500 lg:block">
        Artist
      </div>

      {/* Small screen. */}
      <div className="overflow-hidden lg:hidden">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-left font-bold">
          {name}
        </div>
        <div className="text-left text-sm text-slate-500">Artist</div>
      </div>
    </button>
  );
}

type ArtistItems = z.infer<typeof schema>["artists"]["items"];

function useInfiniteItems() {
  const data = useLoaderData<typeof loader>();
  const initialOffset = 0;
  const params = useParams();
  const { load, ...fetcher } = useFetcher<typeof loader>();
  const [infiniteItems, setInfiniteItems] = useState<ArtistItems>([]);
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
      Promise.resolve(fetcher.data.artists).then(({ items, next }) => {
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

  useEffect(() => {
    data.artists.then((artist) => {
      setOffset(0);
      setInfiniteItems(artist.items);
    });
  }, [data]);

  return { infiniteItems, fetcher, lastItemRef };
}
