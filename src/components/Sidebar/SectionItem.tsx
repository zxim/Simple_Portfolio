import { scrollTo } from "./scrollTo";

type DataItem = {
  id: number;
  name: string;
  isTeam?: boolean;
};

type Props = {
  id: string;
  title: string;
  items: DataItem[];
  isClient: boolean;
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
};

export const SectionItem = ({
  id,
  title,
  items,
  isClient,
  isActive,
  isHovered,
  onHover,
  onLeave,
}: Props) => {
  const filteredItems =
    id === "TeamProject"
      ? items.filter((item) => item.isTeam)
      : id === "PersonalProject"
      ? items.filter((item) => item.isTeam === false)
      : items;

  const orderedItems = [...filteredItems].reverse();

  return (
    <div onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button
        onClick={() => scrollTo(id)}
        className={`block w-full text-left font-semibold ${
          isActive
            ? "text-blue-600 dark:text-yellow-300 text-base"
            : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-300"
        }`}
      >
        {title}
      </button>

      {isClient && (
        <div
          className={`ml-1 mt-1 flex flex-col gap-1 transition-all duration-700 ease-in-out transform ${
            isHovered
              ? "opacity-100 scale-100 max-h-[500px]"
              : "opacity-0 scale-95 max-h-0 overflow-hidden"
          }`}
        >
          {orderedItems.map((item) => {
            const domId = `${id}-${item.id}`;
            return (
              <button
                key={domId}
                onClick={() => scrollTo(domId)}
                className="text-xs text-gray-500 dark:text-gray-300 hover:text-blue-400 dark:hover:text-yellow-200 truncate text-left"
                title={item.name}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
