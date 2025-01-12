import { SiGithub, SiDiscord, SiLastdotfm } from "@icons-pack/react-simple-icons";

export default function SocialLinks({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={ref} className="grid grid-cols-4 gap-4 w-full">
      <a
        className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition"
        href="https://github.com/letruxux"
        target="_blank"
      >
        <SiGithub className="mx-auto" />
      </a>
      <a
        className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition"
        href="https://discord.com/users/1057373214596157502"
        target="_blank"
      >
        <SiDiscord className="mx-auto" />
      </a>
      <a
        className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition"
        href="https://last.fm/user/letruxux"
        target="_blank"
      >
        <SiLastdotfm className="mx-auto" />
      </a>
      <a
        className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition text-center hover:-rotate-3"
        href="https://youtu.be/3lWMdJx-zzI"
        target="_blank"
      >
        ❔
      </a>
    </div>
  );
}
