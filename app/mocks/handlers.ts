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
  http.get("https://api.spotify.com/v1/search", ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    if (searchParams.get("type") === "album") {
      return HttpResponse.json({
        albums: {
          next: "https://api.spotify.com/v1/search?query=a&type=album&market=ID&offset=50&limit=50",
          previous: null,
          offset: 0,
          total: 150,
          limit: 50,
          items: [
            {
              name: "Avenged Sevenfold",
              id: "3Id3VUk9jSKBD1guNo1buF",
              release_date: "2007-10-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27333c52ca8309741c6999ca742",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0233c52ca8309741c6999ca742",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485133c52ca8309741c6999ca742",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "0nmQIMXWTXfhgOBdNzhGOs",
                  name: "Avenged Sevenfold",
                  href: "https://api.spotify.com/v1/artists/0nmQIMXWTXfhgOBdNzhGOs",
                },
              ],
            },
            {
              name: "AM",
              id: "78bpIziExqiI9qztvNFlQu",
              release_date: "2013-09-09",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e024ae1c4c5c45aabe565499163",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048514ae1c4c5c45aabe565499163",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "7Ln80lUS6He07XvHI8qqHH",
                  name: "Arctic Monkeys",
                  href: "https://api.spotify.com/v1/artists/7Ln80lUS6He07XvHI8qqHH",
                },
              ],
            },
            {
              name: "A Rush of Blood to the Head",
              id: "0RHX9XECH8IVI3LNgWDpmQ",
              release_date: "2002-08-27",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273de09e02aa7febf30b7c02d82",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02de09e02aa7febf30b7c02d82",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851de09e02aa7febf30b7c02d82",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "4gzpq5DPGxSnKTe4SA8HAU",
                  name: "Coldplay",
                  href: "https://api.spotify.com/v1/artists/4gzpq5DPGxSnKTe4SA8HAU",
                },
              ],
            },
            {
              name: "Andra & The Backbone",
              id: "2puZQ79KT5q5RPae7khveD",
              release_date: "2006-12-28",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2738a25f55567169ee8dbc97fcc",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e028a25f55567169ee8dbc97fcc",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048518a25f55567169ee8dbc97fcc",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "4ucwey7FxkHXkLK7jSfevU",
                  name: "Andra & The Backbone",
                  href: "https://api.spotify.com/v1/artists/4ucwey7FxkHXkLK7jSfevU",
                },
              ],
            },
            {
              name: "Armageddon - The 1st Album",
              id: "3gHhPm8z8tid1kvpniUKuK",
              release_date: "2024-05-27",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2730fc598038040859794c600e2",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e020fc598038040859794c600e2",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048510fc598038040859794c600e2",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "6YVMFz59CuY7ngCxTxjpxE",
                  name: "aespa",
                  href: "https://api.spotify.com/v1/artists/6YVMFz59CuY7ngCxTxjpxE",
                },
              ],
            },
            {
              name: "THE ALBUM",
              id: "2gNPnKP1PDkB5SZz3IMKuX",
              release_date: "2020-10-02",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2731895052324f123becdd0d53d",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e021895052324f123becdd0d53d",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048511895052324f123becdd0d53d",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "41MozSoPIsD1dJM0CLPjZF",
                  name: "BLACKPINK",
                  href: "https://api.spotify.com/v1/artists/41MozSoPIsD1dJM0CLPjZF",
                },
              ],
            },
            {
              name: "Apricot Princess",
              id: "4DxNdQzm6cBYuSn4dCimmT",
              release_date: "2017-04-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2731bd6d088d3d81972af4cb81d",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e021bd6d088d3d81972af4cb81d",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048511bd6d088d3d81972af4cb81d",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "7pbDxGE6nQSZVfiFdq9lOL",
                  name: "Rex Orange County",
                  href: "https://api.spotify.com/v1/artists/7pbDxGE6nQSZVfiFdq9lOL",
                },
              ],
            },
            {
              name: "Unorthodox Jukebox",
              id: "58ufpQsJ1DS5kq4hhzQDiI",
              release_date: "2012-12-07",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273926f43e7cce571e62720fd46",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02926f43e7cce571e62720fd46",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851926f43e7cce571e62720fd46",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "0du5cEVh5yTK9QJze8zA0C",
                  name: "Bruno Mars",
                  href: "https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C",
                },
              ],
            },
            {
              name: "ArTi Semestinya Cinta",
              id: "48VJneXoN4AW5QAT4Ruwkc",
              release_date: "2024-03-07",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273f4d7e497258b4a0bd0b5a973",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02f4d7e497258b4a0bd0b5a973",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851f4d7e497258b4a0bd0b5a973",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "7j5PGC0BF48rRtcmgbVvOT",
                  name: "Arsy Widianto",
                  href: "https://api.spotify.com/v1/artists/7j5PGC0BF48rRtcmgbVvOT",
                },
                {
                  id: "0kPb52ySN2k9P6wEZPTUzm",
                  name: "Tiara Andini",
                  href: "https://api.spotify.com/v1/artists/0kPb52ySN2k9P6wEZPTUzm",
                },
              ],
            },
            {
              name: "A",
              id: "5MZmR5AcTABUFr1gVfQ2ra",
              release_date: "2013-05-10",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2731a1a54fcd6a8dfd1148ed7ea",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e021a1a54fcd6a8dfd1148ed7ea",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048511a1a54fcd6a8dfd1148ed7ea",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "7fUtt9kVZOyn9LWy0JbDRI",
                  name: "Agnetha Fältskog",
                  href: "https://api.spotify.com/v1/artists/7fUtt9kVZOyn9LWy0JbDRI",
                },
              ],
            },
            {
              name: "ASHER",
              id: "2HNKo2vMGhc9wON4NDfb04",
              release_date: "2023-02-02",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2738bace6ec56354296cc380c7a",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e028bace6ec56354296cc380c7a",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048518bace6ec56354296cc380c7a",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "6FTLayBxjkQeanFdUusk1I",
                  name: "Fabio Asher",
                  href: "https://api.spotify.com/v1/artists/6FTLayBxjkQeanFdUusk1I",
                },
              ],
            },
            {
              name: "Akhir Tak Bahagia",
              id: "7zv0LcKjGlAUiTXQJzqhSY",
              release_date: "2021-03-12",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2731d8c87142038d9c62d74c19f",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e021d8c87142038d9c62d74c19f",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048511d8c87142038d9c62d74c19f",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "5IjwAAk3njAeiFY1InInsn",
                  name: "Misellia",
                  href: "https://api.spotify.com/v1/artists/5IjwAAk3njAeiFY1InInsn",
                },
              ],
            },
            {
              name: "A",
              id: "269gDxEMvfzrLdfTVWwEFj",
              release_date: "1997",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27399a3bd80a5afa538fb919f4b",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0299a3bd80a5afa538fb919f4b",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485199a3bd80a5afa538fb919f4b",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "4g59G9OEAMkD8pd8oiEqx0",
                  name: "Supercar",
                  href: "https://api.spotify.com/v1/artists/4g59G9OEAMkD8pd8oiEqx0",
                },
              ],
            },
            {
              name: "A State of Trance Radio Top 50 - 2024, Vol, 2",
              id: "4mOiFiFmD9rjLUvjgJzL8i",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2731cf8f6477fd02c8431863ea1",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e021cf8f6477fd02c8431863ea1",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048511cf8f6477fd02c8431863ea1",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "0SfsnGyD8FpIN4U4WCkBZ5",
                  name: "Armin van Buuren",
                  href: "https://api.spotify.com/v1/artists/0SfsnGyD8FpIN4U4WCkBZ5",
                },
              ],
            },
            {
              name: "Allein Allein",
              id: "2xSMhp31viwXmp1oZGKdLs",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273d291f98632123657a64e75ec",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02d291f98632123657a64e75ec",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851d291f98632123657a64e75ec",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "0NGAZxHanS9e0iNHpR8f2W",
                  name: "Alok",
                  href: "https://api.spotify.com/v1/artists/0NGAZxHanS9e0iNHpR8f2W",
                },
                {
                  id: "0lIiVp6FVbJR2utszYQhNf",
                  name: "INNERVERSE",
                  href: "https://api.spotify.com/v1/artists/0lIiVp6FVbJR2utszYQhNf",
                },
                {
                  id: "5F96KjVVl5nnGRkXs8E8Za",
                  name: "FREY",
                  href: "https://api.spotify.com/v1/artists/5F96KjVVl5nnGRkXs8E8Za",
                },
              ],
            },
            {
              name: "Axel F",
              id: "3GOvsaX9iG8WU8gTccXRK6",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273fc2143a139ba0beb72a1f5d5",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02fc2143a139ba0beb72a1f5d5",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851fc2143a139ba0beb72a1f5d5",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "73jBynjsVtofjRpdpRAJGk",
                  name: "Dimitri Vegas & Like Mike",
                  href: "https://api.spotify.com/v1/artists/73jBynjsVtofjRpdpRAJGk",
                },
                {
                  id: "6xQvQwZQQuq9R3TdPNbcR8",
                  name: "Bassjackers",
                  href: "https://api.spotify.com/v1/artists/6xQvQwZQQuq9R3TdPNbcR8",
                },
              ],
            },
            {
              name: "A",
              id: "4pyvUT61X7FcjvItZogGt3",
              release_date: "2018-03-10",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2731b08fe5890685038821f9b1c",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e021b08fe5890685038821f9b1c",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048511b08fe5890685038821f9b1c",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "21toYB9udeC6Zdi9fJL0wu",
                  name: "Thomas Farnon",
                  href: "https://api.spotify.com/v1/artists/21toYB9udeC6Zdi9fJL0wu",
                },
              ],
            },
            {
              name: "Muhammad Ali",
              id: "7mAfZEurqdGBfykp7RvbdP",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273369b0fbe1666f139c4c399f5",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02369b0fbe1666f139c4c399f5",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851369b0fbe1666f139c4c399f5",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "2FKWNmZWDBZR4dE5KX4plR",
                  name: "Diljit Dosanjh",
                  href: "https://api.spotify.com/v1/artists/2FKWNmZWDBZR4dE5KX4plR",
                },
                {
                  id: "0ErzCpIMyLcjPiwT4elrtZ",
                  name: "NLE Choppa",
                  href: "https://api.spotify.com/v1/artists/0ErzCpIMyLcjPiwT4elrtZ",
                },
              ],
            },
            {
              name: "A",
              id: "5snT1JyEMwAAa1nSYUL9fj",
              release_date: "1997-05-14",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27302808154a0b153da9fad0d09",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0202808154a0b153da9fad0d09",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485102808154a0b153da9fad0d09",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "3JByu9VCNA1Rs6puGfRupj",
                  name: "Denki Groove",
                  href: "https://api.spotify.com/v1/artists/3JByu9VCNA1Rs6puGfRupj",
                },
              ],
            },
            {
              name: "Bem-vinda ao Meu Mundo",
              id: "5Qv2e46BVgwKfSuKYERL3u",
              release_date: "2024-07-25",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273cd0dccbaee203ad7fed15b51",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02cd0dccbaee203ad7fed15b51",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851cd0dccbaee203ad7fed15b51",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "1AL2GKpmRrKXkYIcASuRFa",
                  name: "Wesley Safadão",
                  href: "https://api.spotify.com/v1/artists/1AL2GKpmRrKXkYIcASuRFa",
                },
                {
                  id: "2LiTVEYDOEckioqrkD83jL",
                  name: "Rey Vaqueiro",
                  href: "https://api.spotify.com/v1/artists/2LiTVEYDOEckioqrkD83jL",
                },
              ],
            },
            {
              name: "ÁNGEL",
              id: "2iiR2powAnVyARFx7deWZT",
              release_date: "2024-07-25",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273aad34a7453e8d91e64a2093f",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02aad34a7453e8d91e64a2093f",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851aad34a7453e8d91e64a2093f",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "6XkjpgcEsYab502Vr1bBeW",
                  name: "Grupo Frontera",
                  href: "https://api.spotify.com/v1/artists/6XkjpgcEsYab502Vr1bBeW",
                },
                {
                  id: "5lwmRuXgjX8xIwlnauTZIP",
                  name: "Romeo Santos",
                  href: "https://api.spotify.com/v1/artists/5lwmRuXgjX8xIwlnauTZIP",
                },
              ],
            },
            {
              name: "Apa Mungkin",
              id: "26VYaukDjQn7rwT4ummk31",
              release_date: "2022-09-23",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2738869d13091935994879f2a47",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e028869d13091935994879f2a47",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048518869d13091935994879f2a47",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "47z98pKd71yIbgXwe9LPVC",
                  name: "Bernadya",
                  href: "https://api.spotify.com/v1/artists/47z98pKd71yIbgXwe9LPVC",
                },
              ],
            },
            {
              name: "Ask That God",
              id: "5iEtQfZATfimid3Ogvce5m",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273539b85bf093856207373e138",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02539b85bf093856207373e138",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851539b85bf093856207373e138",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "67hb7towEyKvt5Z8Bx306c",
                  name: "Empire Of The Sun",
                  href: "https://api.spotify.com/v1/artists/67hb7towEyKvt5Z8Bx306c",
                },
              ],
            },
            {
              name: "A",
              id: "5MltogtE2HY0tWCYRDVZam",
              release_date: "2021-03-24",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273ffc5f1ba19068adca91008f0",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ffc5f1ba19068adca91008f0",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851ffc5f1ba19068adca91008f0",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "1gIxoB0mBUoPr7rPyy31xf",
                  name: "Guiano",
                  href: "https://api.spotify.com/v1/artists/1gIxoB0mBUoPr7rPyy31xf",
                },
              ],
            },
            {
              name: "ASOT 1183 - A State of Trance Episode 1183 (Including Live at Tomorrowland 2021 - Around The World)",
              id: "7Mjt0NP8JxFXPccluXCcGH",
              release_date: "2024-07-25",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273ead13472550679a9ad4ca3f8",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ead13472550679a9ad4ca3f8",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851ead13472550679a9ad4ca3f8",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "0SfsnGyD8FpIN4U4WCkBZ5",
                  name: "Armin van Buuren",
                  href: "https://api.spotify.com/v1/artists/0SfsnGyD8FpIN4U4WCkBZ5",
                },
                {
                  id: "25mFVpuABa9GkGcj9eOPce",
                  name: "Armin van Buuren ASOT Radio",
                  href: "https://api.spotify.com/v1/artists/25mFVpuABa9GkGcj9eOPce",
                },
              ],
            },
            {
              name: "A",
              id: "0QMw1gwIYT6RuWxiJfVdZb",
              release_date: "2020-10-06",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273eca173b3efa49529b424ea2c",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02eca173b3efa49529b424ea2c",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851eca173b3efa49529b424ea2c",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "0KTG5waRVn8cBCL3z8nrBH",
                  name: "kopi",
                  href: "https://api.spotify.com/v1/artists/0KTG5waRVn8cBCL3z8nrBH",
                },
              ],
            },
            {
              name: "Ao After e Além, Pt.2",
              id: "34eaUTnAMJMnniGG1mOlJu",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2738a6230aa60e130f13801fd3e",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e028a6230aa60e130f13801fd3e",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048518a6230aa60e130f13801fd3e",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "3CIIaeZuFYrAD6PRVyuO4U",
                  name: "Felipe Amorim",
                  href: "https://api.spotify.com/v1/artists/3CIIaeZuFYrAD6PRVyuO4U",
                },
              ],
            },
            {
              name: "Ao After e Além, Pt.2",
              id: "3JwIFbN3vbfRfDbVdwkkWy",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27366922a1a51dc1cb4d88c3af3",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0266922a1a51dc1cb4d88c3af3",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485166922a1a51dc1cb4d88c3af3",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "3CIIaeZuFYrAD6PRVyuO4U",
                  name: "Felipe Amorim",
                  href: "https://api.spotify.com/v1/artists/3CIIaeZuFYrAD6PRVyuO4U",
                },
              ],
            },
            {
              name: "Adi Hkaytek Wrouh",
              id: "10yReaCN91tSkQktsko3s5",
              release_date: "2024-07-26",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273049ff14e5b59ac2370f30c50",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02049ff14e5b59ac2370f30c50",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851049ff14e5b59ac2370f30c50",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "59N7N5tX53jyPhAmsRi4or",
                  name: "Cheb Bilal",
                  href: "https://api.spotify.com/v1/artists/59N7N5tX53jyPhAmsRi4or",
                },
              ],
            },
            {
              name: "A",
              id: "64kxjfrQjOjaqQSNgqbfyg",
              release_date: "2023-02-05",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27356597058601e828979aaf193",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0256597058601e828979aaf193",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485156597058601e828979aaf193",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "7grgd8YDgskqZRTSXMhXf8",
                  name: "Lone Robot Uno",
                  href: "https://api.spotify.com/v1/artists/7grgd8YDgskqZRTSXMhXf8",
                },
              ],
            },
            {
              name: "A",
              id: "1RTd49Y2zd82VsAFZy5PRy",
              release_date: "2019-04-05",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27386f26bcaf1677c99da294164",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0286f26bcaf1677c99da294164",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485186f26bcaf1677c99da294164",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "4nNxZ9weXMeokvs9ohcmZl",
                  name: "The Slaps",
                  href: "https://api.spotify.com/v1/artists/4nNxZ9weXMeokvs9ohcmZl",
                },
              ],
            },
            {
              name: "Aku Yang Jatuh Cinta",
              id: "3JyJQxbVR1nCUdNn1aXYTX",
              release_date: "2021-11-19",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2736dabfe1ad020adcd7b6c2108",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e026dabfe1ad020adcd7b6c2108",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048516dabfe1ad020adcd7b6c2108",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "6YPfs6tdZXvnlzgZNU3SYT",
                  name: "Dudy Oris",
                  href: "https://api.spotify.com/v1/artists/6YPfs6tdZXvnlzgZNU3SYT",
                },
              ],
            },
            {
              name: "A (Special Edition)",
              id: "51NB4PIC5vgboVu6RaLoa2",
              release_date: "2021-11-01",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273fe4ad65e7e0b7542566c6a0a",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02fe4ad65e7e0b7542566c6a0a",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851fe4ad65e7e0b7542566c6a0a",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "73kxDUq2Hl7Upy4o0yFxXv",
                  name: "INI",
                  href: "https://api.spotify.com/v1/artists/73kxDUq2Hl7Upy4o0yFxXv",
                },
              ],
            },
            {
              name: "A",
              id: "2gOBG51ZUKrYGnxwFxySGM",
              release_date: "2003-05-20",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2730e9fef77877d3660efade99d",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e020e9fef77877d3660efade99d",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048510e9fef77877d3660efade99d",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "2iUVQjheBnvOt8vaBrxXJz",
                  name: "Cass McCombs",
                  href: "https://api.spotify.com/v1/artists/2iUVQjheBnvOt8vaBrxXJz",
                },
              ],
            },
            {
              name: "A",
              id: "043ZPXFPotTR0yjuQ7cCKf",
              release_date: "2017-12-06",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2738f663269ebc14d83d1ed0061",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e028f663269ebc14d83d1ed0061",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048518f663269ebc14d83d1ed0061",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "2BM933ADIluGGrPBOhPgIt",
                  name: "SiM",
                  href: "https://api.spotify.com/v1/artists/2BM933ADIluGGrPBOhPgIt",
                },
              ],
            },
            {
              name: "A",
              id: "0bH74T4pClqWmhltGOI8H9",
              release_date: "2015-06-01",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2738e629ff126ba9fe6fa843fcf",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e028e629ff126ba9fe6fa843fcf",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048518e629ff126ba9fe6fa843fcf",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "4Kxlr1PRlDKEB0ekOCyHgX",
                  name: "BIGBANG",
                  href: "https://api.spotify.com/v1/artists/4Kxlr1PRlDKEB0ekOCyHgX",
                },
              ],
            },
            {
              name: "Aferin Bana",
              id: "0LBF46qGy65WEcrtbxetHP",
              release_date: "2024-07-25",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273ca24776a536cd49a135112e0",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ca24776a536cd49a135112e0",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851ca24776a536cd49a135112e0",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "1U449OOb70EZlElNjLMwCM",
                  name: "Demet Akalın",
                  href: "https://api.spotify.com/v1/artists/1U449OOb70EZlElNjLMwCM",
                },
              ],
            },
            {
              name: "A",
              id: "39saGNX0gkAhxgRVT56CYE",
              release_date: "1999-08-11",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2731631498fa397b9942075e947",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e021631498fa397b9942075e947",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048511631498fa397b9942075e947",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "3Mvc8kRgr8LRYYgvFmlZqn",
                  name: "Ayumi Hamasaki",
                  href: "https://api.spotify.com/v1/artists/3Mvc8kRgr8LRYYgvFmlZqn",
                },
              ],
            },
            {
              name: "A",
              id: "0gAeBluPTzErtHSkeIieRl",
              release_date: "2023-08-01",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2734376f9aec7c51408ac060f17",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e024376f9aec7c51408ac060f17",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048514376f9aec7c51408ac060f17",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "2wK2OV9gpWlU6r1iowfzkY",
                  name: "Headass U",
                  href: "https://api.spotify.com/v1/artists/2wK2OV9gpWlU6r1iowfzkY",
                },
              ],
            },
            {
              name: "A",
              id: "0uYltmXlAqYjpHnkUXcjDD",
              release_date: "2019-07-15",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273305308b9c2cda36ffa1ae05e",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02305308b9c2cda36ffa1ae05e",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851305308b9c2cda36ffa1ae05e",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "5JzGdNWFlf4S7upAVbiX35",
                  name: "sAewoo",
                  href: "https://api.spotify.com/v1/artists/5JzGdNWFlf4S7upAVbiX35",
                },
              ],
            },
            {
              name: "A",
              id: "2bOCPCPFTuthdghfBwBt4S",
              release_date: "2021-09-15",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27308a01ee4d1c3a95de00197b0",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0208a01ee4d1c3a95de00197b0",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485108a01ee4d1c3a95de00197b0",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "5JHlNfEowjO3TBglD42vAi",
                  name: "SATOH",
                  href: "https://api.spotify.com/v1/artists/5JHlNfEowjO3TBglD42vAi",
                },
              ],
            },
            {
              name: "A",
              id: "2pFQgWV0f774TyUJhwAaY3",
              release_date: "2023-10-13",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273ca395991a2aee9ccb3b32e36",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ca395991a2aee9ccb3b32e36",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851ca395991a2aee9ccb3b32e36",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "4cMoQHghGUYbKgHbsBOI7G",
                  name: "evan aloe",
                  href: "https://api.spotify.com/v1/artists/4cMoQHghGUYbKgHbsBOI7G",
                },
                {
                  id: "3JW2MOQr7TD00OHA3embui",
                  name: "evan aloe xo",
                  href: "https://api.spotify.com/v1/artists/3JW2MOQr7TD00OHA3embui",
                },
              ],
            },
            {
              name: "A",
              id: "5fqdRq0DUNz1xmuru8llHt",
              release_date: "2022-07-18",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273f2f732bdf30dc155ba6bdbe1",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02f2f732bdf30dc155ba6bdbe1",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851f2f732bdf30dc155ba6bdbe1",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "1zxMdRQOvrzem9mP0Qor54",
                  name: "Noé Boon",
                  href: "https://api.spotify.com/v1/artists/1zxMdRQOvrzem9mP0Qor54",
                },
              ],
            },
            {
              name: "A",
              id: "6jPJD5R1mtomkm7HzgDCEo",
              release_date: "2024-05-25",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2733e5acd68d368349e7ba19902",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e023e5acd68d368349e7ba19902",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048513e5acd68d368349e7ba19902",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "5nigqQeORXgrRcs9bLQkY0",
                  name: "Col Sullivan",
                  href: "https://api.spotify.com/v1/artists/5nigqQeORXgrRcs9bLQkY0",
                },
              ],
            },
            {
              name: "a",
              id: "1ZwOqhsmcmAP0AOYe935hT",
              release_date: "2020-08-28",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b27345a495c0443b9cd7e4ecc9e5",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e0245a495c0443b9cd7e4ecc9e5",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d0000485145a495c0443b9cd7e4ecc9e5",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "2BaVLnps9TqLACLVfASidH",
                  name: "waifu",
                  href: "https://api.spotify.com/v1/artists/2BaVLnps9TqLACLVfASidH",
                },
              ],
            },
            {
              name: "A",
              id: "0mok7M7Pmz4kwnWTesBC4u",
              release_date: "2023-06-30",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273057f31e9d441c0a74f240839",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02057f31e9d441c0a74f240839",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851057f31e9d441c0a74f240839",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "5Kt6MttjG8m2rlMdjA8WiA",
                  name: "After Thoughts",
                  href: "https://api.spotify.com/v1/artists/5Kt6MttjG8m2rlMdjA8WiA",
                },
              ],
            },
            {
              name: "A",
              id: "3DLx0YvuSMiOZUDuQ5OuKn",
              release_date: "2021-11-12",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273822a11d96d21b8a2a6b8686a",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02822a11d96d21b8a2a6b8686a",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851822a11d96d21b8a2a6b8686a",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "5Jxv8p3dEf5cFKiDaNdvLP",
                  name: "Angelicca",
                  href: "https://api.spotify.com/v1/artists/5Jxv8p3dEf5cFKiDaNdvLP",
                },
              ],
            },
            {
              name: "A",
              id: "6HDTuFOdtkETh4RnxIDNVm",
              release_date: "2013-01-01",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2730a36e7057bf69cdd8f342bfe",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e020a36e7057bf69cdd8f342bfe",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048510a36e7057bf69cdd8f342bfe",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "6HKV18fbiZPLNSoTUnTALb",
                  name: "Anton Ewald",
                  href: "https://api.spotify.com/v1/artists/6HKV18fbiZPLNSoTUnTALb",
                },
              ],
            },
            {
              name: "A",
              id: "5ErVOYXCz2M9XP8GbuYCTy",
              release_date: "2019-03-15",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b273c8791cb28df8b277f55a389a",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02c8791cb28df8b277f55a389a",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00004851c8791cb28df8b277f55a389a",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "1ACkka9D9f1fH494mxN7uG",
                  name: "Kevin Jere",
                  href: "https://api.spotify.com/v1/artists/1ACkka9D9f1fH494mxN7uG",
                },
              ],
            },
            {
              name: "A",
              id: "4ROG2ndFBR2blUk8X3g1k7",
              release_date: "2024-02-13",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d0000b2735fcbc73bbf09d94f3f70b869",
                  height: 640,
                  width: 640,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d00001e025fcbc73bbf09d94f3f70b869",
                  height: 300,
                  width: 300,
                },
                {
                  url: "https://i.scdn.co/image/ab67616d000048515fcbc73bbf09d94f3f70b869",
                  height: 64,
                  width: 64,
                },
              ],
              artists: [
                {
                  id: "5JTg5GgAQ6tHnqvU2sSFOm",
                  name: "wewewe",
                  href: "https://api.spotify.com/v1/artists/5JTg5GgAQ6tHnqvU2sSFOm",
                },
              ],
            },
          ],
        },
      });
    }

    return HttpResponse.json({
      artists: {
        next: "https://api.spotify.com/v1/search?query=a&type=artist&market=ID&offset=50&limit=50",
        previous: null,
        offset: 0,
        total: 134,
        limit: 50,
        items: [
          {
            name: "Avenged Sevenfold",
            id: "0nmQIMXWTXfhgOBdNzhGOs",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb29ec9d388f7d0f9b3480f316",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517429ec9d388f7d0f9b3480f316",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17829ec9d388f7d0f9b3480f316",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "aespa",
            id: "6YVMFz59CuY7ngCxTxjpxE",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb573935eb61a1897aeb43c531",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174573935eb61a1897aeb43c531",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178573935eb61a1897aeb43c531",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Adele",
            id: "4dpARuHxo51G3z768sgnrY",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb68f6e5892075d7f22615bd17",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517468f6e5892075d7f22615bd17",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17868f6e5892075d7f22615bd17",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Ari Lasso",
            id: "1sqYIwXAmhrcSTsYmsTFAr",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb4e1ed336c3ff93a95fa44e14",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051744e1ed336c3ff93a95fa44e14",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1784e1ed336c3ff93a95fa44e14",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Arctic Monkeys",
            id: "7Ln80lUS6He07XvHI8qqHH",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051747da39dea0a72f581535fb11f",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1787da39dea0a72f581535fb11f",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Alan Walker",
            id: "7vk5e3vY1uw9plTHJAMwjN",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebbf753c009fd9c2d53351dd3c",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174bf753c009fd9c2d53351dd3c",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178bf753c009fd9c2d53351dd3c",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Taylor Swift",
            id: "06HL4z0CvFAxyc27GXpf02",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174e672b5f553298dcdccb0e676",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178e672b5f553298dcdccb0e676",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Ada Band",
            id: "2owBL6a90fnWufVtP70K8f",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebde3d4318cebdd3276d8afc89",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174de3d4318cebdd3276d8afc89",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178de3d4318cebdd3276d8afc89",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Audy",
            id: "611ajYp7fMbkU5CYF08tje",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb57e03ee8e4a5acd8415f8cd3",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517457e03ee8e4a5acd8415f8cd3",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17857e03ee8e4a5acd8415f8cd3",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Agnes Monica",
            id: "5auFhdM0ZgtH6cXwncgZ4m",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb09160e5ffdc256e65713a8a9",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517409160e5ffdc256e65713a8a9",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17809160e5ffdc256e65713a8a9",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Ardhito Pramono",
            id: "3TkSKriI4EZmTxSFyzs0fd",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebe8a47fac892453717b0bf3f7",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174e8a47fac892453717b0bf3f7",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178e8a47fac892453717b0bf3f7",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Andra & The Backbone",
            id: "4ucwey7FxkHXkLK7jSfevU",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b2738a25f55567169ee8dbc97fcc",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e028a25f55567169ee8dbc97fcc",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d000048518a25f55567169ee8dbc97fcc",
                height: 64,
                width: 64,
              },
            ],
          },
          {
            name: "Arijit Singh",
            id: "4YRxDV8wJFPHPTeXepOstw",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb0261696c5df3be99da6ed3f3",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051740261696c5df3be99da6ed3f3",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1780261696c5df3be99da6ed3f3",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Afgan",
            id: "4cgBCGxtlfap2g6jveB7du",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb36dc52aab3e17d697323fa7b",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517436dc52aab3e17d697323fa7b",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17836dc52aab3e17d697323fa7b",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Ariana Grande",
            id: "66CXWjxzNUsdJxJ2JdwvnR",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb40b5c07ab77b6b1a9075fdc0",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517440b5c07ab77b6b1a9075fdc0",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17840b5c07ab77b6b1a9075fdc0",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Nadin Amizah",
            id: "20zafXaLhm5IcXnSU93rNn",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb53f93c516b1f5e853151f06f",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517453f93c516b1f5e853151f06f",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17853f93c516b1f5e853151f06f",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Astrid",
            id: "6GxmlugWFw4hmhUQ5uP93l",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebd2c8ee4b694ccf41c5b56c0d",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174d2c8ee4b694ccf41c5b56c0d",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178d2c8ee4b694ccf41c5b56c0d",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Anne-Marie",
            id: "1zNqDE7qDGCsyzJwohVaoX",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb679c995b0d4a641ba32aa5f0",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174679c995b0d4a641ba32aa5f0",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178679c995b0d4a641ba32aa5f0",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Aftershine",
            id: "6daEl3JyMDgK52fKuqPelL",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb1328fbfd0eeadf7072e1a7e4",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051741328fbfd0eeadf7072e1a7e4",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1781328fbfd0eeadf7072e1a7e4",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Armada",
            id: "6H857CtcaYMSxOB4jvSIZf",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebd206ec3c54ee3fa78af0fd09",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174d206ec3c54ee3fa78af0fd09",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178d206ec3c54ee3fa78af0fd09",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "A",
            id: "3HBxYEtI2i43MzWyTXupVv",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb6e6439b0fe1b1a12f05a327c",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051746e6439b0fe1b1a12f05a327c",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1786e6439b0fe1b1a12f05a327c",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Agust D",
            id: "5RmQ8k4l3HZ8JoPb4mNsML",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb191d43dca6f2f5a126e43e4b",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174191d43dca6f2f5a126e43e4b",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178191d43dca6f2f5a126e43e4b",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Adrian Khalif",
            id: "6X28gNASnalAWseUA8uI4X",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb963432ca084c87dea48d18aa",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174963432ca084c87dea48d18aa",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178963432ca084c87dea48d18aa",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Anggi Marito",
            id: "1JvbNeV9zG9Sew1JyaWsyx",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb9d673f84b11eed39b6007241",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051749d673f84b11eed39b6007241",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1789d673f84b11eed39b6007241",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Akon",
            id: "0z4gvV4rjIZ9wHck67ucSV",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb14020d1e8b482b6e1c5e720d",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000517414020d1e8b482b6e1c5e720d",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f17814020d1e8b482b6e1c5e720d",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Tiara Andini",
            id: "0kPb52ySN2k9P6wEZPTUzm",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebaba46ef4a37dae4a8d99f07e",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174aba46ef4a37dae4a8d99f07e",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178aba46ef4a37dae4a8d99f07e",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Arash Buana",
            id: "3OFUmiZcD0AWtjOYFJVpwM",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebbf1a4574c82d76605bca2a00",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174bf1a4574c82d76605bca2a00",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178bf1a4574c82d76605bca2a00",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Ade Astrid",
            id: "5vrJLn1FurkDASBuhQI79t",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b2739fc030e81820c88b56387878",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e029fc030e81820c88b56387878",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d000048519fc030e81820c88b56387878",
                height: 64,
                width: 64,
              },
            ],
          },
          {
            name: "Arsy Widianto",
            id: "7j5PGC0BF48rRtcmgbVvOT",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebcfbb23382ea9a0dfbd371077",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174cfbb23382ea9a0dfbd371077",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178cfbb23382ea9a0dfbd371077",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Andmesh",
            id: "6IDsZZ4IHgs9VblBgQQSmt",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebf89ddd2d4c1723297636f4ff",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174f89ddd2d4c1723297636f4ff",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178f89ddd2d4c1723297636f4ff",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Halsey",
            id: "26VFTg2z8YR0cCuwLzESi2",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb3d5ddee9415ccf4baaa9f26e",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051743d5ddee9415ccf4baaa9f26e",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1783d5ddee9415ccf4baaa9f26e",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Amigdala",
            id: "40wi3VPurw0e4t3Yggo2Fk",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273c2a6f96ecb2a8809d2ee0e87",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e0252675b5d14d11ca034a92fe2",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d0000485152675b5d14d11ca034a92fe2",
                height: 64,
                width: 64,
              },
            ],
          },
          {
            name: "Andi Rianto",
            id: "4yRVdMqPrguKBFwZYpmke0",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb0ed8228cbff5eeb561591f22",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051740ed8228cbff5eeb561591f22",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1780ed8228cbff5eeb561591f22",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "Aziz Hedra",
            id: "6ygKuZFz2sRggPZRaLHVHD",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb048aa0f73d35a9e301d54697",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174048aa0f73d35a9e301d54697",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178048aa0f73d35a9e301d54697",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "ANGGA DERMAWAN",
            id: "2VyXluaQ6KiQdNLecBtLXY",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273e0a21500ce257ebea2d847a3",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e02e0a21500ce257ebea2d847a3",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00004851e0a21500ce257ebea2d847a3",
                height: 64,
                width: 64,
              },
            ],
          },
          { name: "a", id: "2GAOjeyjFNsuz1RNpqIOuj", images: [] },
          {
            name: "A",
            id: "35qsRBNNhRMICiuATSskko",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b2735b73604c6b2288a9ff1d8f4d",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e025b73604c6b2288a9ff1d8f4d",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d000048515b73604c6b2288a9ff1d8f4d",
                height: 64,
                width: 64,
              },
            ],
          },
          {
            name: "A",
            id: "1dIc8SElekAIf7zZUc3e1y",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebe729b5d99265263439597a30",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174e729b5d99265263439597a30",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178e729b5d99265263439597a30",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "A",
            id: "0JM6Dyo1DMdx2RYbH1Hpmn",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5ebe74eb7cfe7a72d14c400cbfc",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174e74eb7cfe7a72d14c400cbfc",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178e74eb7cfe7a72d14c400cbfc",
                height: 160,
                width: 160,
              },
            ],
          },
          { name: "A", id: "7pccewB9Ova2BMcPKVWKAT", images: [] },
          { name: "A", id: "2pBWKPJCsDMuNxru6MWKUv", images: [] },
          { name: "A", id: "4IJGG0kPMPWoP1CUnXIqDf", images: [] },
          {
            name: "A",
            id: "6h0Qo2M4iEJBo78Kbcw3nF",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273dfcc73258c4dd63e8ef0f79b",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e02dfcc73258c4dd63e8ef0f79b",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00004851dfcc73258c4dd63e8ef0f79b",
                height: 64,
                width: 64,
              },
            ],
          },
          { name: "A", id: "5vL9N8SrL7gU6y8syxOcWB", images: [] },
          {
            name: "A",
            id: "3f9OwgLz4OSqOaYIaOKrBJ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273fc3635bf58a8a87555931c00",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e02fc3635bf58a8a87555931c00",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00004851fc3635bf58a8a87555931c00",
                height: 64,
                width: 64,
              },
            ],
          },
          {
            name: "a",
            id: "30HzuIZwrC6DkcGkAPpxAH",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273f78921c7575d9117ba72a29a",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e02f78921c7575d9117ba72a29a",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00004851f78921c7575d9117ba72a29a",
                height: 64,
                width: 64,
              },
            ],
          },
          { name: "A", id: "5DjIN5EHG85YTiCZgu4CFj", images: [] },
          {
            name: "Â",
            id: "10FkbDQFjWJJBZQ7EEpt8Q",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb7260b77414e03463de3bae50",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab676161000051747260b77414e03463de3bae50",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f1787260b77414e03463de3bae50",
                height: 160,
                width: 160,
              },
            ],
          },
          {
            name: "A",
            id: "2LLBEKeFNpUDwrZWFDwZl2",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d0000b273f80dbb580245c4b4c70af801",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00001e02f80dbb580245c4b4c70af801",
                height: 300,
                width: 300,
              },
              {
                url: "https://i.scdn.co/image/ab67616d00004851f80dbb580245c4b4c70af801",
                height: 64,
                width: 64,
              },
            ],
          },
          {
            name: "Å",
            id: "6oxx7e9b265qJCMCdhHUl6",
            images: [
              {
                url: "https://i.scdn.co/image/ab6761610000e5eb220d7de0623c8145d4e87ba4",
                height: 640,
                width: 640,
              },
              {
                url: "https://i.scdn.co/image/ab67616100005174220d7de0623c8145d4e87ba4",
                height: 320,
                width: 320,
              },
              {
                url: "https://i.scdn.co/image/ab6761610000f178220d7de0623c8145d4e87ba4",
                height: 160,
                width: 160,
              },
            ],
          },
        ],
      },
    });
  }),
];
