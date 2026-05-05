import React from "react";

interface Props {
  setBooth: (b: string) => void;
  next: () => void;
}

const BoothSelect: React.FC<Props> = ({ setBooth, next }) => {
  const booths = [
    { name: "Bangalore Booth", queue: 5 },
    { name: "Delhi Booth", queue: 2 },
    { name: "Mumbai Booth", queue: 7 },
  ];

  const handleSelect = (booth: string) => {
    setBooth(booth);
    next();
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Select Voting Booth</h2>

      {booths.map((b, i) => (
        <div
          key={i}
          className="p-4 border mb-3 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSelect(b.name)}
        >
          <p className="font-semibold">{b.name}</p>
          <p>Queue: {b.queue} people</p>
        </div>
      ))}
    </div>
  );
};

export default BoothSelect;