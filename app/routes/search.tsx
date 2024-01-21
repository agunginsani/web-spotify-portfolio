import type { MetaFunction } from "@remix-run/node";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Spotify - Search" }];
};

export default function Route() {
  const navigation = useNavigate();
  const params = useParams();
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    wrapperRef.current?.scrollTo({ top: 0 });
    if (searchInputRef.current)
      searchInputRef.current.value = params.query ?? "";
  }, [params.query]);

  return (
    <div
      ref={wrapperRef}
      className="mx-auto h-[calc(100svh_-_theme(spacing.6))] w-full max-w-screen-md overflow-auto rounded-lg bg-slate-900 px-4"
    >
      <div className="sticky top-0 flex flex-col bg-slate-900 py-4">
        <input
          className="md:w-96 sm:w-full rounded-full bg-gray-700 px-5 py-3 text-white outline-white"
          ref={searchInputRef}
          type="search"
          name="q"
          placeholder="What do you want to listen to?"
          defaultValue={params.query ?? ""}
          onChange={(e) => {
            const pathnames = location.pathname.split("/").filter(Boolean);
            const type = pathnames.length > 2 ? pathnames[2] : "artists";
            const { value } = e.currentTarget;
            if (value === "") return navigation("");
            navigation(`${value}/${type}`);
          }}
        />
        {params.query ? <SearchFilters /> : null}
      </div>
      <Outlet />
    </div>
  );
}

function SearchFilters() {
  const params = useParams();
  const items = [
    { param: "artists", label: "Artists" },
    { param: "tracks", label: "Songs" },
    { param: "shows", label: "Podcasts & Shows" },
    { param: "albums", label: "Albums" },
    { param: "playlists", label: "Playlists" },
  ];
  return (
    <div className="mt-3 overflow-auto flex gap-4">
      {items.map((item) => (
        <NavLink key={item.param} to={`${params.query}/${item.param}`}>
          {({ isActive }) => (
            <div
              className={clsx("p-2 text-sm text-nowrap rounded-full", {
                "bg-slate-700 text-white": !isActive,
                "bg-white text-black": isActive,
              })}
            >
              {item.label}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
