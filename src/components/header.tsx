import CustomEmoji from "./emoji";

export default function Header({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={ref} className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="relative scale-100 hover:scale-110 transition-transform duration-200 group">
          <div className="w-12 h-12 bg-surface-light rounded-full overflow-hidden scale-100">
            <img
              src="https://github.com/letruxux.png?size=128"
              alt="Profile"
              className="w-full h-full object-cover group-hover:animate-[spin_2s_ease-out]"
            />
          </div>
          <div className="absolute -inset-1 border-2 border-dashed border-border-subtle rounded-full animate-[spin_10s_linear_infinite]" />
        </div>
        <div>
          <h2 className="text-2xl font-medium">
            letruxux <CustomEmoji name="wawa.png" />
          </h2>
        </div>
      </div>
    </div>
  );
}
