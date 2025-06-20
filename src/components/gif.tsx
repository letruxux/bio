import Card from "./card";

export default function GifBox({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={ref} className="w-full">
      <h3 className="text-2xl font-bold mb-4 text-text-primary">hello</h3>
      <Card className="p-4">
        <img
          src="https://media1.tenor.com/m/cDJj3LEw0UIAAAAd/gmail-dog.gif"
          alt="aaaaaaaaaaaaaaaaaaaaaaaa"
          className="rounded-2xl w-full h-auto"
          width={399}
          height={498}
        />
      </Card>
    </div>
  );
}
