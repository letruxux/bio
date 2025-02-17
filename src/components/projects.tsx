import { JSX } from "react";

interface Project {
  bannerImage: string;
  title: string;
  description: JSX.Element | string;
  techStack: string[];
  icon: JSX.Element | string;
  url?: string;
  git?: string;
  time: {
    start: Date;
    release: Date;
  };
  wip?: boolean;
}

export const projects: { [key: string]: Project } = {
  asdfgh: {
    bannerImage: "",
    title: "asdfgh",
    description: (
      <span>
        The easiest way to generate <code>winget</code> commands.
      </span>
    ),
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "DaisyUI", "zod"],
    icon: <span className="rotate-12 text-7xl">☆</span>,
    url: "https://asdfgh-apps.vercel.app",
    git: "https://github.com/letruxux/asdfgh",
    time: {
      start: new Date("2024-11-30"),
      release: new Date("2024-12-01"),
    },
  },
  "tou-install": {
    bannerImage: "",
    title: "Among Us Mods Tool",
    description: (
      <span>
        Install your favorite Among Us mods with a single click.
        <small className="mt-1 text-gray-400 block">
          This is not a serious project as it was made to help my friends and will
          probably not be updated further.
        </small>
      </span>
    ),
    techStack: ["Python", "Tkinter", "GitHub API", "PyInstaller"],
    icon: <span className="text-7xl">✌</span>,
    url: "https://github.com/letruxux/tou-crewlink-install/releases/latest",
    git: "https://github.com/letruxux/tou-crewlink-install",
    time: {
      start: new Date("2025-01-01"),
      release: new Date("2025-01-03"),
    },
  },
  "translate-bot-djs": {
    bannerImage: "",
    title: "Translate Bot",
    description: <span>The simplest bot to translate messages in Discord.</span>,
    techStack: ["Typescript", "Bun", "discord.js"],
    icon: <span className="text-7xl -rotate-2">🗣️</span>,
    git: "https://github.com/letruxux/translate-bot-djs",
    time: {
      start: new Date("2024-11-24"),
      release: new Date("2024-11-24"),
    },
  },
  mcdisc: {
    bannerImage: "",
    title: "MCDisc",
    description: (
      <span>
        Easy custom discs.
        <small className="mt-1 text-gray-400 block">My first ever React.js website</small>
      </span>
    ),
    techStack: ["Next.js", "SCSS", "TypeScript", "React", "ZIP Archive Manipulation"],
    icon: <span className="text-7xl -rotate-2">💿</span>,
    url: "https://mcdisc.vercel.app",
    /* git: "https://github.com/letruxux/mcdisc", */
    time: {
      start: new Date("2024-06-21"),
      release: new Date("2024-06-28"),
    },
  },
  sassobot: {
    bannerImage: "",
    title: "sassoBOT",
    description: (
      <span>
        Discord music player, supports YouTube, Deezer and SoundCloud
        <small className="mt-1 text-gray-400 block">
          My first public discord bot (not updated anymore)
        </small>
      </span>
    ),
    techStack: ["Python", "discord.py", "yt-dlp", "ffmpeg"],
    icon: <span className="text-7xl -rotate-2">🎶</span>,
    git: "https://github.com/letruxux/sassobot",
    time: {
      start: new Date("2023-06-24"),
      release: new Date("2023-07-21"),
      /*  last_update: new Date("2023-07-08"), */
    },
  },

  "sanremo-plugin": {
    wip: true,
    bannerImage: "",
    title: "Music Festival (Sanremo) Plugin",
    description: (
      <span>
        A voting system for a recreation of the italian music festival Sanremo.
        <small className="mt-1 text-gray-400 block">
          Features sounds, voting GUI, bossbar, timer and votes book.
        </small>
      </span>
    ),
    techStack: ["Java", "Gradle", "Bukkit", "LuckPerms", "PlaceholderAPI"],
    icon: <span className="text-7xl -rotate-2">🎶</span>,
    /* url: "", */
    /* git: "https://github.com/letruxux/sassobot", */
    time: {
      start: new Date("2025-02-14"),
      release: new Date("2025-02-22"),
      /*  last_update: new Date("2023-07-08"), */
    },
  },
};
