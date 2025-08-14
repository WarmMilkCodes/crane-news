import type { MediaItem } from "./types";
import { movies } from "./movies";
import { seriesList } from "./series";

export * from "./types";

// All items in one export
export const media: MediaItem[] = [...movies, ...seriesList];
