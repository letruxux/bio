import { JSX } from "react";

interface Project {
  bannerImage: string;
  title: string;
  description: JSX.Element | string;
  techStack: string[];
  icon: JSX.Element | string;
  url?: string;
  git?: string;
  timeline: { label: string; date: Date }[];
  wip?: boolean;
  archived?: boolean;
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
    techStack: ["TypeScript", "Next.js", "React", "Tailwind CSS", "DaisyUI", "zod"],
    icon: <span className="rotate-12 text-7xl">☆</span>,
    url: "https://asdfgh-apps.vercel.app",
    git: "https://github.com/letruxux/asdfgh",
    timeline: [
      { label: "PROJECT START", date: new Date("2024-11-30") },
      { label: "INITIAL RELEASE", date: new Date("2024-12-01") },
    ],
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
    timeline: [
      { label: "PROJECT START", date: new Date("2025-01-01") },
      { label: "INITIAL RELEASE", date: new Date("2025-01-03") },
    ],
  },
  "translate-bot-djs": {
    bannerImage: "",
    title: "Translate Bot",
    description: <span>The simplest bot to translate messages in Discord.</span>,
    techStack: ["TypeScript", "Bun", "discord.js"],
    icon: <span className="text-7xl -rotate-2">🗣️</span>,
    git: "https://github.com/letruxux/translate-bot-djs",
    timeline: [
      { label: "PROJECT START", date: new Date("2024-11-24") },
      { label: "INITIAL RELEASE", date: new Date("2024-11-24") },
    ],
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
    techStack: ["TypeScript", "Next.js", "SCSS", "React", "ZIP Archive Manipulation"],
    icon: <span className="text-7xl -rotate-2">💿</span>,
    url: "https://mcdisc.vercel.app",
    timeline: [
      { label: "PROJECT START", date: new Date("2024-06-21") },
      { label: "INITIAL RELEASE", date: new Date("2024-06-23") },
      { label: "LAST UPDATE", date: new Date("2024-06-28") },
    ],
    archived: true,
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
    timeline: [
      { label: "PROJECT START", date: new Date("2023-06-24") },
      { label: "INITIAL RELEASE", date: new Date("2023-07-21") },
      { label: "LAST UPDATE", date: new Date("2024-08-22") },
    ],
    archived: true,
  },
  "sanremo-plugin": {
    bannerImage: "",
    title: "Televoting Plugin",
    description: (
      <span>
        A voting system for a Minecraft recreation of the Italian music festival{" "}
        <i>Sanremo</i>.
        <small className="mt-1 text-gray-400 block">
          Features sounds, voting GUI, bossbar, timer and votes book.
        </small>
      </span>
    ),
    techStack: ["Java", "Gradle", "Bukkit", "LuckPerms", "PlaceholderAPI"],
    icon: <span className="text-7xl -rotate-2">🎶</span>,
    timeline: [
      { label: "PROJECT START", date: new Date("2025-02-14") },
      { label: "PLANNED RELEASE", date: new Date("2025-02-22") },
    ],
  },
};
