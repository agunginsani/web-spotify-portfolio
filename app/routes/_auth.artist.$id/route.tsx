import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { z } from "zod";
import { client } from "~/helpers/network.server";

const scheme = z.object({
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.name} | Spotify` }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = await client(
    request,
    `https://api.spotify.com/v1/artists/${params.id}`,
  );
  const data = scheme.parse(await response.json());
  return scheme.parse(data);
}

export default function Route() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [image] = data.images;
  return (
    <>
      <header className="flex flex-col gap-1 bg-gradient-to-b from-green-800 via-green-900 to-black px-4 pb-4">
        <nav className="sticky top-0 flex h-14 items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-5 w-5 bg-transparent" />
          </button>
        </nav>
        <img
          src={image.url}
          height={image.height}
          width={image.width}
          alt=""
          role="presentation"
          className="mx-auto h-36 w-36 rounded-full"
        />
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <span className="text-sm text-slate-400">
          {numberFormatter.format(data.followers.total)} monthly listeners
        </span>
      </header>
    </>
  );
}
