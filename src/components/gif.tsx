export default function GifBox({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={ref} className="mb-4 w-full">
      <h3 className="text-2xl font-bold mb-4 text-text-primary">hello</h3>
      <div className="bg-surface-light border border-border-subtle p-4 rounded-2xl">
        <img
          src="https://media1.tenor.com/m/cDJj3LEw0UIAAAAd/gmail-dog.gif"
          alt="aaaaaaaaaaaaaaaaaaaaaaaa"
          className="rounded-2xl w-full h-auto"
          width={399}
          height={498}
        />
      </div>
    </div>
  );
}
