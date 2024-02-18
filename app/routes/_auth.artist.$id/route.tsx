import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PlayIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { z } from "zod";
import { client } from "~/helpers/network.server";
import { useSnackbar } from "~/helpers/snackbar";

const schemeArtist = z.object({
  id: z.string(),
  name: z.string(),
  followers: z.object({
    href: z.string().nullable(),
    total: z.number(),
  }),
  images: z.array(
    z.object({
      url: z.string().url(),
      height: z.number(),
      width: z.number(),
    }),
  ),
});

const numberFormatter = new Intl.NumberFormat();

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = z.string().parse(params.id);
  const [artist, isFollowing] = await Promise.all([
    getArtist({ request, id }),
    checkFollowing({ request, id }),
  ]);
  return { artist, isFollowing };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const _action = formData.get("_action");

  if (_action === "follow") {
    const id = z.string().parse(formData.get("id"));
    return toggleFollowing({ request, id });
  }

  throw new Response("Something went wrong", { status: 500 });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Something went wrong | Spotify" }];
  return [{ title: `${data.artist.name} | Spotify` }];
};

export default function Route() {
  const { artist } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [image] = artist.images;
  return (
    <>
      <header className="flex flex-col gap-1 bg-gradient-to-b from-green-800 via-green-900 to-black px-4 pb-4">
        <nav className="sticky top-0 flex h-14 items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="size-5 bg-transparent" />
          </button>
        </nav>
        <img
          src={image.url}
          height={image.height}
          width={image.width}
          alt=""
          role="presentation"
          className="mx-auto size-36 rounded-full"
        />
        <h1 className="text-2xl font-bold">{artist.name}</h1>
        <span className="text-sm text-slate-400">
          {numberFormatter.format(artist.followers.total)} monthly listeners
        </span>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-6">
            <FollowButton />
            <ShareButton />
            <MoreButton />
          </div>
          <button className="flex size-14 items-center justify-center rounded-full bg-green-500">
            <PlayIcon className="size-6 text-black" />
          </button>
        </div>
      </header>
    </>
  );
}

function FollowButton() {
  const { artist, isFollowing } = useLoaderData<typeof loader>();
  const { dispatch } = useSnackbar();
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      dispatch({ type: "show", message: fetcher.data.message });
    }
  }, [dispatch, fetcher.data, fetcher.state]);

  return (
    <fetcher.Form method={isFollowing ? "DELETE" : "PUT"}>
      <input type="hidden" name="id" value={artist.id} />
      <button
        name="_action"
        value="follow"
        className="rounded-full border border-white px-4 py-2 text-xs font-bold disabled:border-slate-400 disabled:text-slate-400"
        disabled={
          fetcher.formData?.get("_action") === "follow" &&
          (fetcher.state === "submitting" || fetcher.state === "loading")
        }
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </fetcher.Form>
  );
}

function ShareButton() {
  const { dispatch } = useSnackbar();
  return (
    <button
      aria-label="Share"
      onClick={() => {
        navigator.clipboard.writeText(location.href);
        dispatch({ type: "show", message: "Link copied to clipboard" });
      }}
    >
      <ShareIcon className="size-6" />
    </button>
  );
}

function MoreButton() {
  return (
    <button aria-label="More">
      <EllipsisVerticalIcon className="size-6" />
    </button>
  );
}

async function checkFollowing({
  request,
  id,
}: {
  request: Request;
  id: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("type", "artist");
  searchParams.set("ids", id);
  const response = await client(
    request,
    `https://api.spotify.com/v1/me/following/contains?${searchParams}`,
  );
  const json = await response.json();
  return z.array(z.boolean()).parse(json)[0];
}

async function getArtist({ request, id }: { request: Request; id: string }) {
  const response = await client(
    request,
    `https://api.spotify.com/v1/artists/${id}`,
  );
  const json = schemeArtist.parse(await response.json());
  return schemeArtist.parse(json);
}

async function toggleFollowing({
  request,
  id,
}: {
  request: Request;
  id: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("type", "artist");
  searchParams.set("ids", id);
  const response = await client(
    request,
    `https://api.spotify.com/v1/me/following?${searchParams}`,
    {
      method: request.method,
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!response.ok) {
    throw response;
  }

  if (request.method === "DELETE") {
    return { message: "Removed to Your Library" };
  }

  if (request.method === "PUT") {
    return { message: "Added to Your Library" };
  }

  throw new Response('Invalid "method"', { status: 500 });
}
