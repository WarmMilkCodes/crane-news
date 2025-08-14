// src/data/media/movies.ts
import { ia, movie } from "./builders";
import type { MediaItem } from "./types";

export const movies: MediaItem[] = [
  movie({
    id: "detour-1945",
    title: "Detour",
    year: 1945,
    poster: "/detour.jpg",
    url: ia("Detour", "Detour_512kb.mp4"),
    mature: false,
  }),

  movie({
    id: "plan9-1959",
    title: "Plan 9 from Outer Space",
    year: 1959,
    poster: "/plan-9.jpg",
    url: ia("Plan_9_from_Outer_Space_1959", "Plan_9_from_Outer_Space_1959_512kb.mp4"),
    mature: false,
  }),

  movie({
    id: "20000leagues-1916",
    title: "20,000 Leagues Under the Sea",
    year: 1916,
    poster: "/20000-leagues.jpg",
    url: ia("20000LeaguesUndertheSea", "20000_Leagues_Under_the_Sea_512kb.mp4"),
    mature: false,
  }),

  movie({
    id: "sahara-1943",
    title: "Sahara",
    year: 1943,
    poster: "/sahara.jpg",
    url: ia("sahara-colorized", "Sahara 1943.mp4"),
    mature: false,
  }),

  movie({
    id: "mohicans-1936",
    title: "Last of the Mohicans",
    year: 1936,
    poster: "/mohicans.jpg",
    url: ia("last-of-the-mohicans-1936-colorized", "Last of the Mohicans 1936 colorized.mp4"),
    mature: false,
  }),

  movie({
    id: "night-of-the-living-dead-1968",
    title: "Night of the Living Dead",
    year: 1968,
    poster: "/livingdead.jpg",
    url: ia("Night.Of.The.Living.Dead_1080p", "NightOfTheLivingDead_DVD9_512kb.mp4"),
    mature: true,
  }),

  // Non-IA source
  movie({
    id: "mclintock-1963",
    title: "McLintock",
    year: 1963,
    poster: "/mclintock.jpg",
    url: "https://publicdomainmovie.net/movie.php?id=Mclintock.avi&type=.mp4",
    source: "Other",
    mature: false,
  }),
];
