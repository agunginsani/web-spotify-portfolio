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
import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { z } from "zod";
import { client } from "~/helpers/network.server";

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

  return null;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Something went wrong | Spotify" }];
  return [{ title: `${data.artist.name} | Spotify` }];
};

export default function Route() {
  const { artist, isFollowing } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
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
            <Form method={isFollowing ? "DELETE" : "PUT"}>
              <input type="hidden" name="id" value={artist.id} />
              <button
                name="_action"
                value="follow"
                className="rounded-full border border-white px-4 py-2 text-xs font-bold disabled:border-slate-400 disabled:text-slate-400"
                disabled={
                  navigation.formData?.get("_action") === "follow" &&
                  navigation.state === "submitting"
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </Form>
            <button>
              <ShareIcon className="size-6" />
            </button>
            <button>
              <EllipsisVerticalIcon className="size-6" />
            </button>
          </div>
          <button className="flex size-14 items-center justify-center rounded-full bg-green-500">
            <PlayIcon className="size-6 text-black" />
          </button>
        </div>
      </header>
    </>
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
  return response;
}
