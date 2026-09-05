import { useState } from "react";
import Reveal from "./Reveal";

const interests = [
  {
    number: "01",
    title: "Cinema",
    description:
      "I enjoy films for both the stories they tell and the way they are made — direction, editing, visuals and sound.",
    type: "image",
    media:
      "https://media.tenor.com/SeLBRCUiQaoAAAAe/absolute-cinema-cinema.png",
    link:
      "https://media.tenor.com/SeLBRCUiQaoAAAAe/absolute-cinema-cinema.png",
    label: "ABSOLUTE CINEMA",
    aspect: "landscape",
  },
  {
    number: "02",
    title: "Games",
    description:
      "From playing games to understanding how they work, game development is one of the areas I enjoy exploring most.",
    type: "youtube",
    videoId: "eknKT80ToXA",
    link: "https://www.youtube.com/shorts/eknKT80ToXA",
    label: "GAMES",
    aspect: "portrait",
  },
  {
    number: "03",
    title: "Technology",
    description:
      "I'm curious about how technology works and enjoy experimenting with different tools, languages and ideas.",
    type: "youtube",
    videoId: "NjXweFUgY78",
    link: "https://www.youtube.com/watch?v=NjXweFUgY78",
    label: "TECHNOLOGY",
    aspect: "landscape",
  },
  {
    number: "04",
    title: "Sports",
    description:
      "Cricket, football and other sports are some of my favourite ways to switch off and have fun.",
    type: "youtube",
    videoId: "ZC0P_g66OJc",
    link: "https://www.youtube.com/shorts/ZC0P_g66OJc",
    label: "SPORTS",
    aspect: "portrait",
  },
  {
    number: "05",
    title: "Formula 1",
    description:
      "The combination of engineering, strategy, competition and storytelling makes F1 especially interesting to me.",
    type: "youtube",
    videoId: "lkaxo7XMDZY",
    link: "https://www.youtube.com/shorts/lkaxo7XMDZY",
    label: "FORMULA 1",
    aspect: "portrait",
  },
  {
    number: "06",
    title: "TV & Stories",
    description:
      "I enjoy shows and stories with strong characters, interesting worlds and ideas that stay with you.",
    type: "youtube",
    videoId: "V73TJuEirLU",
    link: "https://www.youtube.com/watch?v=V73TJuEirLU",
    label: "TV / STORIES",
    aspect: "landscape",
  },
  {
    number: "07",
    title: "Cooking",
    description:
      "Cooking is one of my hobbies and another way I like experimenting and creating something from scratch.",
    type: "youtube",
    videoId: "k-0XgnFtoiU",
    link: "https://www.youtube.com/shorts/k-0XgnFtoiU",
    label: "COOKING",
    aspect: "portrait",
  },
  {
    number: "08",
    title: "Music",
    description:
      "I enjoy music and playing a few instruments when I want a break from screens and code.",
    type: "youtube",
    videoId: "1-jr6WlSFxk",
    link: "https://www.youtube.com/shorts/1-jr6WlSFxk",
    label: "MUSIC",
    aspect: "portrait",
  },
];

function MediaPreview({ interest, isPlaying, onPlay }) {
  if (interest.type === "image") {
    return (
      <a
        href={interest.link}
        target="_blank"
        rel="noreferrer"
        className="block h-full w-full"
      >
        <img
          src={interest.media}
          alt={interest.label}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />
      </a>
    );
  }

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${interest.videoId}?autoplay=1&rel=0`}
        title={interest.label}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      className="absolute inset-0 h-full w-full"
      aria-label={`Play ${interest.title} video`}
    >
      <img
        src={`https://i.ytimg.com/vi/${interest.videoId}/hqdefault.jpg`}
        alt={interest.label}
        loading="lazy"
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />

      {/* Dark overlay */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
        "
      />

      {/* Play button */}
      <span
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-14
          w-14
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/30
          bg-black/40
          text-white
          backdrop-blur-md
          transition-all
          duration-500
          group-hover:scale-110
          group-hover:border-orange-500
          group-hover:bg-orange-500
        "
      >
        <span className="ml-1 text-base">
          ▶
        </span>
      </span>

      {/* Media label */}
      <span
        className="
          pointer-events-none
          absolute
          bottom-4
          left-4
          right-4
          flex
          items-end
          justify-between
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-white/75
            sm:text-[9px]
          "
        >
          {interest.label}
        </span>

        <span className="text-sm text-white/50">
          ▶
        </span>
      </span>
    </button>
  );
}

function Interests() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handlePlay = (number) => {
    setPlayingVideo(number);
  };

  return (
    <section
      id="interests"
      className="
        relative overflow-hidden
        bg-white
        py-24
        text-black
        transition-colors duration-500
        dark:bg-[#080808]
        dark:text-white
        sm:py-28
        md:py-40
      "
    >
      {/* Background number */}
      <div
        className="
          pointer-events-none
          absolute
          -right-4
          top-8
          select-none
          text-[30vw]
          font-semibold
          leading-none
          tracking-[-0.08em]
          text-black/[0.025]
          dark:text-white/[0.025]
          sm:text-[25vw]
        "
      >
        03
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          md:px-8
        "
      >
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[10px] tracking-[0.2em] text-orange-500">
              03
            </span>

            <span className="h-px w-7 bg-black/15 dark:bg-white/15 sm:w-10" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-black/40 dark:text-white/35 sm:text-[10px]">
              Interests & Hobbies
            </span>
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={100}>
          <div className="mt-12 max-w-3xl sm:mt-16">
            <h2
              className="
                text-[13vw]
                font-medium
                leading-[0.88]
                tracking-[-0.07em]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              Things I
              <br />
              <span className="text-orange-500">
                care about.
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-xl
                text-sm
                leading-7
                text-black/50
                dark:text-white/45
                sm:mt-8
                sm:text-base
              "
            >
              Beyond programming, I'm interested in a mix of
              creative work, entertainment, technology, sports
              and the things that keep me curious.
            </p>
          </div>
        </Reveal>

        {/* Media wall */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-4
            sm:mt-16
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {interests.map((interest, index) => (
            <Reveal
              key={interest.number}
              delay={Math.min(index * 70, 420)}
            >
              <article
                className="
                  group
                  overflow-hidden
                  border
                  border-black/10
                  bg-[#f7f7f5]
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-orange-500/40
                  hover:shadow-xl
                  dark:border-white/10
                  dark:bg-[#0d0d0d]
                  dark:hover:bg-[#111]
                "
              >
                {/* Media */}
                <div
                  className={`
                    relative
                    overflow-hidden
                    bg-black
                    ${
                      interest.aspect === "portrait"
                        ? "aspect-[9/12]"
                        : "aspect-video"
                    }
                  `}
                >
                  <MediaPreview
                    interest={interest}
                    isPlaying={
                      playingVideo === interest.number
                    }
                    onPlay={() =>
                      handlePlay(interest.number)
                    }
                  />
                </div>

                {/* Card content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-black/30
                        dark:text-white/25
                      "
                    >
                      {interest.number}
                    </span>

                    <span className="text-[8px] uppercase tracking-[0.18em] text-orange-500">
                      {interest.type === "youtube"
                        ? playingVideo === interest.number
                          ? "Playing"
                          : "Play"
                        : "Explore"}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-7
                      text-2xl
                      font-medium
                      tracking-[-0.04em]
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                      sm:text-3xl
                    "
                  >
                    {interest.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-6
                      text-black/45
                      dark:text-white/40
                      sm:text-sm
                    "
                  >
                    {interest.description}
                  </p>

                  {/* Stop button */}
                  {playingVideo === interest.number && (
                    <button
                      type="button"
                      onClick={() => setPlayingVideo(null)}
                      className="
                        mt-5
                        rounded-full
                        border
                        border-black/10
                        px-4
                        py-2
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                        text-black/50
                        transition-all
                        hover:border-orange-500
                        hover:text-orange-500
                        dark:border-white/10
                        dark:text-white/45
                        dark:hover:border-orange-500
                        dark:hover:text-orange-400
                      "
                    >
                      Stop video
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Footer line */}
        <Reveal delay={250}>
          <div
            className="
              mt-16
              border-t
              border-black/10
              pt-5
              dark:border-white/10
              sm:mt-20
              sm:pt-6
            "
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[8px] uppercase tracking-[0.25em] text-black/30 dark:text-white/25 sm:text-[9px]">
                Outside the screen
              </span>

              <span className="text-xs text-black/50 dark:text-white/40 sm:text-sm">
                Watch • Play • Create • Explore
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Interests;