export function OpeningHours({ hours }: { hours: string[] }) {
  return (
    <span className="store-opening-hours">
      {hours.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  );
}
