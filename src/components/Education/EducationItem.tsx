const EducationItem = ({
  id,
  name,
  description,
  period,
}: {
  id: number;
  name: string;
  description: string;
  period: string[];
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="md:w-72 flex flex-col gap-2">
        <div className="md:sticky md:top-8 self-start flex flex-col">
          <h3 id={`Education-${id}`}>{name}</h3>
          <span>{`${period[0]}${period[1] ? " - " + period[1] : ""}`}</span>
        </div>
      </div>
      <span className="whitespace-pre-wrap">
        {description}
      </span>
    </div>
  );
};

export default EducationItem;