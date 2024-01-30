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
  const pathnames = location.pathname.split("/").filter(Boolean);
  const type = pathnames.length > 2 ? pathnames[2] : "artists";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    wrapperRef.current?.scrollTo({ top: 0 });
    if (searchInputRef.current)
      searchInputRef.current.value = params.query ?? "";
  }, [params.query, type]);

  return (
    <div
      ref={wrapperRef}
      className="mx-auto h-[calc(100svh_-_theme(spacing.6))] w-full max-w-screen-md overflow-auto rounded-lg bg-black sm:bg-slate-900"
    >
      <div className="sticky top-0 flex flex-col bg-slate-900">
        <div className="p-4">
          <input
            className="w-full rounded-full bg-gray-700 px-5 py-3 text-white outline-white lg:w-96"
            ref={searchInputRef}
            type="search"
            name="q"
            placeholder="What do you want to listen to?"
            defaultValue={params.query ?? ""}
            onChange={(e) => {
              const { value } = e.currentTarget;
              if (value === "") return navigation("");
              navigation(`${value}/${type}`);
            }}
          />
        </div>
        {params.query ? <SearchFilters /> : null}
      </div>
      <div className="pb-4 lg:px-4" key={location.pathname}>
        <Outlet />
      </div>
    </div>
  );
}

function SearchFilters() {
  const params = useParams();
  const items = [
    { param: "artists", label: "Artists" },
    // { param: "tracks", label: "Songs" },
    // { param: "shows", label: "Podcasts & Shows" },
    { param: "albums", label: "Albums" },
    // { param: "playlists", label: "Playlists" },
  ];
  return (
    <div className="flex gap-4 overflow-auto pb-4">
      <div />
      {items.map((item) => (
        <NavLink key={item.param} to={`${params.query}/${item.param}`}>
          {({ isActive }) => (
            <div
              className={clsx("text-nowrap rounded-full px-3 py-2 text-sm", {
                "bg-slate-700 text-white": !isActive,
                "bg-white text-black": isActive,
              })}
            >
              {item.label}
            </div>
          )}
        </NavLink>
      ))}
      <div />
    </div>
  );
}
