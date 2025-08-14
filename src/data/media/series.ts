// src/data/media/series.ts
import { ia, series, ep } from "./builders";
import type { MediaItem } from "./types";

export const seriesList: MediaItem[] = [
  // ——————————————————————————————————————————
  // The Beverly Hillbillies (TV, 1962)
  // ——————————————————————————————————————————
  series({
    id: "the-beverly-hillbillies-1962",
    title: "The Beverly Hillbillies (TV, 1962)",
    year: 1962,
    poster: "/the-beverly-hillbillies.jpg",
    notes: "Only certain episodes are public domain. We list verified items.",
    episodes: [
      ep({ season: 1, year: 1962 })({
        id: "s01e01",
        episode: 1,
        title: "The Clampetts Strike Oil",
        url: ia(
          "Beverly_Hillbillies_Ep01_The_Clampetts_Strike_Oil",
          "BH01_The_Clampetts_Strike_Oil_512kb.mp4"
        ),
        notes:
          "Jed Clampett's cousin Pearl convinces him to move his entire family and her son Jethro to Beverly Hills after he strikes oil."
      }),
      ep({ season: 1, year: 1962 })({
        id: "s01e02",
        episode: 2,
        title: "Getting Settled",
        url: ia(
          "Beverly_Hillbillies_Ep02_Getting_Settled",
          "BH02_Getting_Settled_512kb.mp4"
        ),
        notes:
          "Miss Hathaway mistakenly assumes the Clampetts are incompetent backwoods hillbillies instead of millionaires."
      }),
      ep({ season: 1, year: 1962 })({
        id: "s01e03",
        episode: 3,
        title: "Meanwhile, Back at the Cabin",
        url: ia(
          "Beverly_Hillbillies_Ep03_Meanwhile_Back_At_The_Cabin",
          "BH03_Meanwhile_Back_At_The_Cabin_512kb.mp4"
        ),
        notes:
          "At their new mansion, the Clampetts realize fancy amenities can’t replace country life."
      }),
      ep({ season: 1, year: 1962 })({
        id: "s01e04",
        episode: 4,
        title: "The Clampetts Meet Mrs. Drysdale",
        url: ia(
          "Beverly_Hillbillies_Ep04_The_Clampetts_Meet_Mrs_Drysdale",
          "BH04_The_Clampetts_Meet_Mrs_Drysdale_512kb.mp4"
        ),
        notes:
          "The Clampetts believe Mrs. Drysdale has a serious drinking problem after Mr. Drysdale’s description."
      }),
      ep({ season: 1, year: 1962 })({
        id: "s01e05",
        episode: 5,
        title: "Jed Buys Stock",
        url: ia(
          "TheBeverlyHillbillies-JedBuysStock-Ep.1x05",
          "TheBeverlyHillbillies105-JedBuysStock_512kb.mp4"
        ),
        notes:
          "Mr. Drysdale suggests investments; Jed buys cows, pigs, chickens, and other ‘stock’."
      }),
      ep({ season: 1, year: 1962 })({
        id: "s01e06",
        episode: 6,
        title: "Trick or Treat",
        url: ia(
          "Beverly_Hillbillies_Ep06_Trick_Or_Treat",
          "BH06_Trick_Or_Treat_512kb.mp4"
        ),
        notes:
          "The Clampetts meet their Beverly Hills neighbors on Halloween night — with surprises."
      })
    ]
  }),

  // ——————————————————————————————————————————
  // Dragnet (TV, 1951)
  // ——————————————————————————————————————————
  series({
    id: "dragnet-1951",
    title: "Dragnet (TV, 1951)",
    year: 1951,
    poster: "/dragnet.jpg",
    notes: "Only certain episodes are public domain. We list verified items.",
    episodes: [
      ep({ season: 1, year: 1951 })({
        id: "s01e01",
        episode: 1,
        title: "The Human Bomb",
        url: ia(
          "Dragnet1951/Dragnet/Season 1",
          "Dragnet (1951) - S01E01 - The Human Bomb.mp4"
        )
      }),
      ep({ season: 1, year: 1951 })({
        id: "s01e02",
        episode: 2,
        title: "The Big Actor",
        url: ia(
          "Dragnet1951/Dragnet/Season 1",
          "Dragnet (1951) - S01E02 - The Big Actor.mp4"
        )
      }),
      ep({ season: 1, year: 1951 })({
        id: "s01e05",
        episode: 5,
        title: "The Big Cast",
        url: ia(
          "Dragnet1951/Dragnet/Season 1",
          "Dragnet (1951) - S01E05 - The Big Cast.mp4"
        )
      }),
      ep({ season: 1, year: 1951 })({
        id: "s01e11",
        episode: 11,
        title: "The Big September Man",
        url: ia(
          "Dragnet1951/Dragnet/Season 1",
          "Dragnet (1951) - S01E11 - The Big September Man.mp4"
        )
      }),
      ep({ season: 1, year: 1951 })({
        id: "s01e12",
        episode: 12,
        title: "The Big Phone Call",
        url: ia(
          "Dragnet1951/Dragnet/Season 1",
          "Dragnet (1951) - S01E12 - The Big Phone Call.mp4"
        )
      }),
      ep({ season: 1, year: 1951 })({
        id: "s01e13",
        episode: 13,
        title: "The Big Chasing",
        url: ia(
          "Dragnet1951/Dragnet/Season 1",
          "Dragnet (1951) - S01E13 - The Big Chasing.mp4"
        )
      }),
      ep({ season: 1, year: 1951 })({
        id: "s01e14",
        episode: 14,
        title: "The Big Lamp",
        url: ia(
          "Dragnet1951/Dragnet/Season 1",
          "Dragnet (1951) - S01E14 - The Big Lamp.mp4"
        )
      }),
      ep({ season: 2, year: 1951 })({
        id: "s02e01",
        episode: 1,
        title: "The Big Jump",
        url: ia(
          "Dragnet1951/Dragnet/Season 2",
          "Dragnet (1951) - S02E01 - The Big Jump.mp4"
        )
      })
    ]
  }),

  // ——————————————————————————————————————————
  // Farscape (TV, 1999) — sample PD-list (verify each)
  // ——————————————————————————————————————————
  series({
    id: "farscape-1999",
    title: "Farscape (TV, 1999)",
    year: 1999,
    poster: "/farscape.jpg",
    notes:
      "Only certain episodes are public domain. We list verified items as discovered.",
    episodes: [
      ep({ season: 1, year: 1999 })({
        id: "s01e01",
        episode: 1,
        title: "Premiere",
        url: ia("farscape-s-01", "Farscape S01E01 Premiere.mp4")
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e02",
        episode: 2,
        title: "Exodus from Genesis",
        url: ia("farscape-s-01", "Farscape S01E02 Exodus from Genesis.mp4")
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e03",
        episode: 3,
        title: "Back and Back and Back to the Future",
        url: ia(
          "farscape-s-01",
          "Farscape S01E03 Back and Back and Back to the Future.mp4"
        )
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e04",
        episode: 4,
        title: "Throne for a Loss",
        url: ia("farscape-s-01", "Farscape S01E04 Throne for a Loss.mp4")
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e05",
        episode: 5,
        title: "PK Tech Girl",
        url: ia("farscape-s-01", "Farscape S01E05 PK Tech Girl.mp4")
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e06",
        episode: 6,
        title: "Thank God It's Friday, Again",
        url: ia(
          "farscape-s-01",
          "Farscape S01E06 Thank God it's Friday, Again..mp4"
        )
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e07",
        episode: 7,
        title: "I, E.T.",
        url: ia("farscape-s-01", "Farscape S01E07 I, E.T..mp4")
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e08",
        episode: 8,
        title: "That Old Black Magic",
        url: ia("farscape-s-01", "Farscape S01E08 That Old Black Magic.mp4")
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e09",
        episode: 9,
        title: "DNA Mad Scientist",
        url: ia("farscape-s-01", "Farscape S01E09 DNA Mad Scientist.mp4")
      }),
      ep({ season: 1, year: 1999 })({
        id: "s01e10",
        episode: 10,
        title: "They've Got a Secret",
        url: ia(
          "farscape-s-01",
          "Farscape S01E10 They've Got a Secret.mp4"
        )
      })
    ]
  })
];
