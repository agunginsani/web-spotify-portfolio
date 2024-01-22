import type { LoaderFunctionArgs } from "@remix-run/node";
import {
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

  const response = await client(
    request,
    `https://api.spotify.com/v1/search?${searchParams}`,
  );

  if (response.ok) {
    const data = schema.parse(await response.json());
    return data;
  }

  if (response.status === 400) {
    return {
      artists: {
        items: [],
        offset: 0,
        limit: 0,
        previous: null,
        next: null,
        total: 0,
      },
    } satisfies z.infer<typeof schema>;
  }

  throw response;
}

export default function Route() {
  const data = useLoaderData<typeof loader>();
  const artists = data.artists;
  const params = useParams();

  const error = useRouteError();
  const { load, ...fetcher } = useFetcher<z.infer<typeof schema>>();

  const [infiniteItems, setInfiniteItems] = useState(artists.items);
  const [offset, setOffset] = useState(artists.offset);
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
      const items = fetcher.data.artists.items;
      setInfiniteItems((prevs) => [...prevs, ...items]);
      if (fetcher.data.artists.next === null) observer.current?.disconnect();
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (offset > artists.offset) {
      const searchParams = new URLSearchParams();
      searchParams.append("offset", offset.toString());
      searchParams.append("type", params.type!);
      searchParams.append("q", searchInputRef.current?.value ?? "");
      load(`?${searchParams}`);
    }
  }, [artists.offset, load, offset, params.type]);

  useEffect(() => {
    setOffset(0);
    setInfiniteItems(artists.items);
  }, [artists.items]);

  if (isRouteErrorResponse(error)) {
    return <div>{error.data}</div>;
  }

  return (
    <>
      <ul className="flex flex-col flex-wrap justify-between gap-0 text-white lg:flex-row lg:gap-3">
        {infiniteItems.map((item, index) => {
          const avatar = item.images.length === 0 ? null : item.images[0].url;
          return infiniteItems.length === index + 1 ? (
            <li ref={lastItemRef} key={item.id} className="flex lg:w-auto">
              <ArtistCard id={item.id} name={item.name} avatar={avatar} />
            </li>
          ) : (
            <li key={item.id} className="flex lg:w-auto">
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
    <button className="h-ful flex w-full flex-row items-center gap-1 rounded-none bg-gray-800 p-3 hover:bg-gray-700 lg:w-[175px] lg:flex-col lg:rounded-lg">
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
      <div className="w-full overflow-hidden lg:hidden">
        <div className="overflow-hidden text-ellipsis text-nowrap text-left font-bold">
          {name}
        </div>
        <div className="text-left text-sm text-slate-500">Artist</div>
      </div>
    </button>
  );
}
