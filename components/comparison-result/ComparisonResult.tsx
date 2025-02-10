interface ComparisonResultProps {
  winner: { name: string; ratio: string } | null;
}

const ComparisonResult = ({ winner }: ComparisonResultProps) => {
  return (
    <h1>
      {winner
        ? `Winner: ${winner.name} (${winner.ratio}x better)`
        : "No winner"}
    </h1>
  );
};

export default ComparisonResult;
