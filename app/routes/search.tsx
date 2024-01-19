import type { MetaFunction } from "@remix-run/node";
import { NavLink, Outlet, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Spotify - Search" }];
};

export default function Route() {
  const navigation = useNavigate();
  const params = useParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current)
      searchInputRef.current.value = params.query ?? "";
  }, [params.query]);

  return (
    <div className="mx-auto h-[calc(100vh_-_theme(spacing.6))] w-full max-w-screen-md overflow-auto rounded-lg bg-slate-900 px-4">
      <div className="sticky top-0 bg-slate-900 py-4">
        <input
          className="mb-3 w-96 rounded-full bg-gray-700 px-5 py-3 text-white outline-white"
          ref={searchInputRef}
          type="search"
          name="q"
          placeholder="What do you want to listen to?"
          defaultValue={params.query ?? ""}
          onChange={(e) => {
            const { value } = e.currentTarget;
            if (value === "") return navigation("");
            navigation(`${value}/artists`);
          }}
        />
      </div>
      <SearchFilters />
      <Outlet />
    </div>
  );
}

function SearchFilters() {
  return (
    <div>
      <NavLink to="artists">Artists</NavLink>
      <NavLink to="tracks">Songs</NavLink>
      <NavLink to="shows">Podcasts & Shows</NavLink>
      <NavLink to="albums">Albums</NavLink>
      <NavLink to="playlists">Playlists</NavLink>
    </div>
  );
}
