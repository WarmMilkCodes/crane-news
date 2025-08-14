// src/data/media.ts
export type MediaItemBase = {
  id: string;
  title: string;
  year?: number;
  source: "Internet Archive" | "Library of Congress" | "NASA" | "Other";
  poster?: string;                 // /media/*.jpg (optional)
  notes?: string;                  // licensing/source notes
  mature?: boolean;                 // Applies to full movie or entire series (default)
  tags?: string[];                 // Horror, B&W, etc
};

export type MovieOrShort = MediaItemBase & {
    kind: "Movie" | "Short" | "PSA";
    url: string;        // direct MP4 or HLS master
    captions?: string;
};

export type Episode = {
    id: string;     // unique within the series
    title: string;
    season?: number;
    episode?: number;
    year?: number;
    url: string;
    captions?: string;
    notes?: string;
    mature?: boolean;       // overrides series.mature per-episode
    source?: string;        // optional override if different IA item
};

export type Series = MediaItemBase & {
    kind: "Series";
    episodes: Episode[];    // at least one PD episode
};

export type MediaItem = MovieOrShort | Series;

export const media: MediaItem[] = [
  {
    id: "detour-1945",
    title: "Detour",
    year: 1945,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/detour.jpg",
    url: "https://archive.org/download/Detour/Detour_512kb.mp4",
    mature: false
  },
  {
    id: "plan9-1959",
    title: "Plan 9 from Outer Space",
    year: 1959,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/plan-9.jpg",
    url: "https://archive.org/download/Plan_9_from_Outer_Space_1959/Plan_9_from_Outer_Space_1959_512kb.mp4",
    mature: false
  },
  {
    id: "20000leagues-1916",
    title: "20,000 Leagues Under the Sea",
    year: 1916,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/20000-leagues.jpg",
    url: "https://archive.org/download/20000LeaguesUndertheSea/20000_Leagues_Under_the_Sea_512kb.mp4",
    mature: false
  },
  {
    id: "sahara-1943",
    title: "Sahara",
    year: 1943,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/sahara.jpg",
    url: "https://archive.org/download/sahara-colorized/Sahara%201943.mp4",
    mature: false
  },
  {
    id: "mohicans-1936",
    title: "Last of the Mohicans",
    year: 1936,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/mohicans.jpg",
    url: "https://archive.org/download/last-of-the-mohicans-1936-colorized/Last%20of%20the%20Mohicans%201936%20colorized.mp4",
    mature: false
  },
  {
    id: "night-of-the-living-dead-1968",
    title: "Night of the Living Dead",
    year: 1968,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/livingdead.jpg",
    url: "https://archive.org/download/Night.Of.The.Living.Dead_1080p/NightOfTheLivingDead_DVD9_512kb.mp4",
    mature: true
  },
  {
    id: "mclintock-1963",
    title: "McLintock",
    year: 1963,
    kind: "Movie",
    source: "Other",
    poster: "/mclintock.jpg",
    url: "https://publicdomainmovie.net/movie.php?id=Mclintock.avi&type=.mp4",
    mature: false
  },
  {
    id: "the-beverly-hillbillies-1962",
    title: "The Beverly Hillbillies (TV, 1962)",
    year: 1962,
    kind: "Series",
    source: "Internet Archive",
    poster: "/the-beverly-hillbillies.jpg",
    notes: "Only certain episodes are public domain. We list verified items.",
    episodes: [
        {
            id: "s01e01",
            title: "The Clampetts Strike Oil",
            season: 1, episode: 1, year: 1962,
            url: "https://archive.org/download/Beverly_Hillbillies_Ep01_The_Clampetts_Strike_Oil/BH01_The_Clampetts_Strike_Oil_512kb.mp4",
            notes: "Jed Clampett's cousin Pearl convinces him to move his entire family and her son Jethro to Beverly Hills after he strikes oil and hits it rich. But when they get to Beverly Hills, big city life proves to be more than they ever expected."
        },
        {
            id: "s01e02",
            title: "Getting Settled",
            season: 1, episode: 2, year: 1962,
            url: "https://archive.org/download/Beverly_Hillbillies_Ep02_Getting_Settled/BH02_Getting_Settled_512kb.mp4",
            notes: "Miss Hathaway accidentally believes that the Clampetts are a group of incompetent backwoods hillbillies instead of the millionaires that they really are."
        },
        {
            id: "s01e03",
            title: "Meanwhile, Back at the Cabin",
            season: 1, episode: 3, year: 1962,
            url: "https://archive.org/download/Beverly_Hillbillies_Ep03_Meanwhile_Back_At_The_Cabin/BH03_Meanwhile_Back_At_The_Cabin_512kb.mp4",
            notes: "While at their brand new mansion, the Clampetts start to notice that all of the fancy amenities just can't match up to life in the country."
        },
        {
            id: "s01e04",
            title: "The Clampetts Meet Mrs. Drysdale",
            season: 1, episode: 4, year: 1962,
            url: "https://archive.org/download/Beverly_Hillbillies_Ep04_The_Clampetts_Meet_Mrs_Drysdale/BH04_The_Clampetts_Meet_Mrs_Drysdale_512kb.mp4",
            notes: "The Clampetts believe that Mrs. Drysdale has a serious drinking problem after the way that Mr. Drysdale describes her to them and they try to help her."
        },
        {
            id: "s01e05",
            title: "Jed Buys Stock",
            season: 1, episode: 5, year: 1962,
            url: "https://archive.org/download/TheBeverlyHillbillies-JedBuysStock-Ep.1x05/TheBeverlyHillbillies105-JedBuysStock_512kb.mp4",
            notes: "Jed invests in some cows, pigs, chickens, and other animals after Mr. Drysdale suggests that they invest some of their money in stock."
        },
        {
            id: "s01e06",
            title: "Trick or Treat",
            season: 1, episode: 6, year: 1962,
            url: "https://archive.org/download/Beverly_Hillbillies_Ep06_Trick_Or_Treat/BH06_Trick_Or_Treat_512kb.mp4",
            notes: "The Clampetts get a big surprise when they go out to meet their new neighbors in Beverly Hills, not realizing that it's Halloween."
        }
    ]
  },
  {
    id: "dragnet-1951",
    title: "Dragnet (TV, 1951)",
    year: 1951,
    kind: "Series",
    source: "Internet Archive",
    poster: "/dragnet.jpg",
    notes: "Only certain episodes are public domain. We list verified items.",
    episodes: [
        {
            id: "s01e01",
            title: "The Human Bomb",
            season: 1, episode: 1, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%201/Dragnet%20%281951%29%20-%20S01E01%20-%20The%20Human%20Bomb.mp4"
        },
        {
            id: "s01e02",
            title: "The Big Actor",
            season: 1, episode: 2, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%201/Dragnet%20%281951%29%20-%20S01E02%20-%20The%20Big%20Actor.mp4"
        },
        {
            id: "s01e05",
            title: "The Big Cast",
            season: 1, episode: 5, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%201/Dragnet%20%281951%29%20-%20S01E05%20-%20The%20Big%20Cast.mp4"
        },
        {
            id: "s01e11",
            title: "The Big September Man",
            season: 1, episode: 11, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%201/Dragnet%20%281951%29%20-%20S01E11%20-%20The%20Big%20September%20Man.mp4"
        },
        {
            id: "s01e12",
            title: "The Big Phone Call",
            season: 1, episode: 12, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%201/Dragnet%20%281951%29%20-%20S01E12%20-%20The%20Big%20Phone%20Call.mp4"
        },
        {
            id: "s01e13",
            title: "The Big Chasing",
            season: 1, episode: 13, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%201/Dragnet%20%281951%29%20-%20S01E13%20-%20The%20Big%20Chasing.mp4"
        },
        {
            id: "s01e14",
            title: "The Big Lamp",
            season: 1, episode: 14, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%201/Dragnet%20%281951%29%20-%20S01E14%20-%20The%20Big%20Lamp.mp4"
        },
        {
            id: "s02e01",
            title: "The Big Jump",
            season: 2, episode: 1, year: 1951,
            url: "https://archive.org/download/Dragnet1951/Dragnet/Season%202/Dragnet%20%281951%29%20-%20S02E01%20-%20The%20Big%20Jump.mp4"
        }
    ]
  },
  {
        id: "farscape-1999",
        title: "Farscape (TV, 1999)",
        year: 1999,
        kind: "Series",
        source: "Internet Archive",
        poster: "/farscape.jpg",
        notes: "Only certain episodes are public domain. We list verified items.",
        episodes: [
            {
                id: "s01e01",
                title: "Premiere",
                season: 1, episode: 1, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E01%20Premiere.mp4"
            },
            {
                id: "s01e02",
                title: "Exodus from Genesis",
                season: 1, episode: 2, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E02%20Exodus%20from%20Genesis.mp4"
            },
            {
                id: "s01e03",
                title: "Back and Back and Back to the Future",
                season: 1, episode: 3, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E03%20Back%20and%20Back%20and%20Back%20to%20the%20Future.mp4"
            },
            {
                id: "s01e04",
                title: "Throne for a Loss",
                season: 1, episode: 4, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E04%20Throne%20for%20a%20Loss.mp4"
            },
            {
                id: "s01e05",
                title: "PK Tech Girl",
                season: 1, episode: 5, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E05%20PK%20Tech%20Girl.mp4"
            },
            {
                id: "s01e06",
                title: "Thank God It's Friday, Again",
                season: 1, episode: 6, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E06%20Thank%20God%20it%27s%20Friday%2C%20Again..mp4"
            },
            {
                id: "s01e07",
                title: "I, E.T.",
                season: 1, episode: 7, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E07%20I%2C%20E.T..mp4"
            },
            {
                id: "s01e08",
                title: "That Old Black Magic",
                season: 1, episode: 8, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E08%20That%20Old%20Black%20Magic.mp4"
            },
            {
                id: "s01e09",
                title: "DNA Mad Scientist",
                season: 1, episode: 9, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E09%20DNA%20Mad%20Scientist.mp4"
            },
            {
                id: "s01e10",
                title: "They've Got a Secret",
                season: 1, episode: 10, year: 1999,
                url: "https://archive.org/download/farscape-s-01/Farscape%20S01E10%20They%27ve%20Got%20a%20Secret.mp4"
            }
        ]
    }
];
