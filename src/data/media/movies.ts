import { ia, movie } from "./builders";
import type { MediaItem } from "./types";

export const movies: MediaItem[] = [
  movie({
    id: "night-of-the-living-dead-1968",
    title: "Night of the Living Dead",
    year: 1968,
    poster: "/livingdead.jpg",
    url: ia("Night.Of.The.Living.Dead_1080p", "NightOfTheLivingDead_DVD9_512kb.mp4"),
    mature: true,
    notes: "PD in the U.S.; pick a clean transfer."
  }),
  movie({
    id: "detour-1945",
    title: "Detour",
    year: 1945,
    poster: "/detour.jpg",
    url: ia("Detour", "Detour_512kb.mp4"),
  }),
  movie({
    id: "plan9-1959",
    title: "Plan 9 from Outer Space",
    year: 1959,
    poster: "/plan-9.jpg",
    url: ia("Plan_9_from_Outer_Space_1959", "Plan_9_from_Outer_Space_1959_512kb.mp4"),
  }),
];
