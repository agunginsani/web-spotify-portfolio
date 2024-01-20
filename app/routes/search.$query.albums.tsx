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
        release_date: z.coerce.date(),
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
      albums: {
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
  const albums = data.albums;
  const params = useParams();

  const error = useRouteError();
  const { load, ...fetcher } = useFetcher<z.infer<typeof schema>>();

  const [infiniteItems, setInfiniteItems] = useState(albums.items);
  const [offset, setOffset] = useState(albums.offset);
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
      const items = fetcher.data.albums.items;
      setInfiniteItems((prevs) => [...prevs, ...items]);
      if (fetcher.data.albums.next === null) observer.current?.disconnect();
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (offset > albums.offset) {
      const searchParams = new URLSearchParams();
      searchParams.append("offset", offset.toString());
      searchParams.append("type", params.type!);
      searchParams.append("q", searchInputRef.current?.value ?? "");
      load(`?${searchParams}`);
    }
  }, [albums.offset, load, offset, params.type]);

  useEffect(() => {
    setOffset(0);
    setInfiniteItems(albums.items);
  }, [albums.items]);

  if (isRouteErrorResponse(error)) {
    return <div>{error.data}</div>;
  }

  return (
    <>
      <ul className="flex flex-wrap justify-between gap-3 text-white">
        {infiniteItems.map((item, index) => {
          const avatar = item.images.length === 0 ? null : item.images[0].url;
          const [year] = item.release_date.split("-");
          const [artist] = item.artists;
          return infiniteItems.length === index + 1 ? (
            <li ref={lastItemRef} key={item.id}>
              <AlbumCard
                id={item.id}
                year={year}
                name={item.name}
                avatar={avatar}
                artist={artist.name}
              />
            </li>
          ) : (
            <li key={item.id}>
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
      {fetcher.state === "loading" ? <div>Loading...</div> : null}
    </>
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
    <button className="flex h-full w-[175px] flex-col items-center gap-1 rounded-lg bg-gray-800 p-3 hover:bg-gray-700">
      {avatar === null ? (
        <div className="h-[140px] rounded-full object-cover" />
      ) : (
        <img
          src={avatar}
          alt=""
          role="presentation"
          className="w-full max-h-[140px] rounded-lg object-cover"
          width={size}
          height={size}
        />
      )}
      <div className="w-full text-left font-bold text-nowrap overflow-hidden text-ellipsis">
        {name}
      </div>
      <div className="w-full text-left text-sm text-slate-500">
        {year} • {artist}
      </div>
    </button>
  );
}
