import { useState, useEffect } from "react";

import { sections } from "./sections";
import { useActiveSection } from "./useActiveSection";
import { SectionItem } from "./SectionItem";

import data from "@/../data.json";

type DataItem = {
  id: number;
  name: string;
  isTeam?: boolean;
};

const Sidebar = () => {
  const active = useActiveSection();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <aside className="hidden md:flex fixed top-1/4 right-4 z-50 flex-col gap-1 text-sm bg-white dark:bg-[#121212] p-2 rounded shadow w-52">
      {sections.map(({ id, title, dataKey }) => {
        const raw = (data as Record<string, unknown>)[dataKey ?? ""];
        const items = Array.isArray(raw) ? (raw as DataItem[]) : [];

        return (
          <SectionItem
            key={id}
            id={id}
            title={title}
            items={items}
            isClient={isClient}
            isActive={active === id}
            isHovered={hoveredId === id}
            onHover={() => setHoveredId(id)}
            onLeave={() => setHoveredId(null)}
          />
        );
      })}
    </aside>
  );
};

export default Sidebar;