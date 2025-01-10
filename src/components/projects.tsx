export const projects = {
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
    url: "https://github.com/letruxux/tou-crewlink-install/releases",
    git: "https://github.com/letruxux/tou-crewlink-install",
    time: {
      start: new Date("2025-01-01"),
      release: new Date("2025-01-03"),
    },
  },
};
