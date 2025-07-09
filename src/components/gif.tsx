import Card from "./card";

export default function GifBox({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={ref} className="w-full">
      <h3 className="text-2xl font-bold mb-4 text-text-primary">hello</h3>
      <Card className="p-4">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWp4OHA4YzMwZ2xuOWczYXQ2NnJneDhxb24xdWdydW01eHJpZmQ5dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VbnUQpnihPSIgIXuZv/giphy.gif"
          alt="woo ..."
          className="rounded-2xl w-full h-auto"
        />
      </Card>
    </div>
  );
}
