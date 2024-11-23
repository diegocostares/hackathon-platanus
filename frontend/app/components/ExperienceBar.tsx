interface ExperienceBarProps {
  current: number;
  max: number;
}

export default function ExperienceBar({ current, max }: ExperienceBarProps) {
  const percentage = (current / max) * 100;

  return (
    <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="text-center text-sm mt-1">
        {current} / {max} XP
      </div>
    </div>
  );
}
