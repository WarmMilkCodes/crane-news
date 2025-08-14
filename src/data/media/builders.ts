import type { Episode, MediaItem, MovieOrShort, Series } from "./types";

// Internet Archive URL helper (keeps paths short in data files)
export function ia(identifier: string, file: string) {
  return `https://archive.org/download/${identifier}/${encodeURIComponent(file)}`;
}

// Shorthand builders
export function movie(partial: Omit<MovieOrShort, "kind" | "source"> & { source?: MediaItem["source"] }): MovieOrShort {
  return { source: "Internet Archive", ...partial, kind: "Movie" };
}

export function short(partial: Omit<MovieOrShort, "kind" | "source"> & { source?: MediaItem["source"] }): MovieOrShort {
  return { source: "Internet Archive", ...partial, kind: "Short" };
}

export function series(partial: Omit<Series, "kind" | "source"> & { source?: MediaItem["source"] }): Series {
  return { source: "Internet Archive", ...partial, kind: "Series" };
}

// Episode helper with optional defaults
export function ep(base: Partial<Episode> = {}) {
  return (e: Episode): Episode => ({ ...base, ...e });
}
