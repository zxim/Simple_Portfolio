const ActivityItem = ({
  id,
  name,
  period,
  description,
}: {
  id: number;
  name: string;
  period: string[];
  description: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 id={`Activity-${id}`}>{name}</h3>
          <span>{`${period[0]}${period[1] ? " - " + period[1] : ""}`}</span>
        </div>
        <span className="whitespace-pre-wrap">{description}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
