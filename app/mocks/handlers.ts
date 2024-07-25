import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.spotify.com/v1/artists/1", () => {
    return HttpResponse.json({
      id: "1",
      name: "Test",
      followers: {
        href: null,
        total: 8,
      },
      images: [
        {
          url: "https://picsum.photos/300",
          height: 300,
          width: 300,
        },
      ],
    });
  }),
  http.get("https://api.spotify.com/v1/me/following/contains", () => {
    return HttpResponse.json([false]);
  }),
  http.post("https://accounts.spotify.com/api/token", () => {
    return HttpResponse.json({ access_token: "MOCKED_ACCESS_TOKEN" });
  }),
];
