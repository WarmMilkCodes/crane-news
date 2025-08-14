export type MediaItemBase = {
  id: string;
  title: string;
  year?: number;
  source: "Internet Archive" | "Library of Congress" | "NASA" | "Other";
  poster?: string;
  notes?: string;
  mature?: boolean;
  tags?: string[];
};

export type MovieOrShort = MediaItemBase & {
  kind: "Movie" | "Short" | "PSA";
  url: string;
  captions?: string;
};

export type Episode = {
  id: string;
  title: string;
  season?: number;
  episode?: number;
  year?: number;
  url: string;
  captions?: string;
  notes?: string;
  mature?: boolean;
  source?: string;
};

export type Series = MediaItemBase & {
  kind: "Series";
  episodes: Episode[];
};

export type MediaItem = MovieOrShort | Series;
