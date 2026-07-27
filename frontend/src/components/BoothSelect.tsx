import React from "react";

interface Props {
  setBooth: (b: string) => void;
  next: () => void;
}

const BoothSelect: React.FC<Props> = ({ setBooth, next }) => {
  const booths = [
    { name: "Bangalore Booth", emoji: "🏙️", city: "Karnataka", queue: 5 },
    { name: "Delhi Booth", emoji: "🏛️", city: "New Delhi", queue: 2 },
    { name: "Mumbai Booth", emoji: "🌊", city: "Maharashtra", queue: 7 },
  ];

  const getQueueBadge = (queue: number) => {
    if (queue <= 3) return "bg-emerald-100 text-emerald-700";
    if (queue <= 5) return "bg-amber-100 text-amber-700";
    return "bg-rose-100 text-rose-700";
  };

  const getQueueLabel = (queue: number) => {
    if (queue <= 3) return "Low";
    if (queue <= 5) return "Medium";
    return "High";
  };

  const handleSelect = (booth: string) => {
    setBooth(booth);
    next();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow">
            📍
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Select Voting Booth</h2>
            <p className="mt-2 text-slate-600">Choose any available booth — vote from anywhere.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3" id="booth-grid">
        {booths.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelect(b.name)}
            role="button"
            tabIndex={0}
            aria-label={`Select ${b.name}`}
            id={`booth-${i}`}
            className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(b.name);
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-2xl">
                {b.emoji}
              </div>
              <div className="space-y-1 text-left">
                <p className="text-lg font-semibold text-slate-900">{b.name}</p>
                <p className="text-sm text-slate-500">{b.city}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${getQueueBadge(b.queue)}`}>
                <span className="text-[0.6rem]">●</span>
                {getQueueLabel(b.queue)}
              </span>
              <span className="text-sm text-slate-500">{b.queue} in queue</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoothSelect;
