import { useEffect, useState } from "react";

import data from "@/../data.json";
import { sections } from "@/components/Sidebar/sections";

type DataItem = {
  id?: number;
  name?: string;
  isTeam?: boolean;
};

const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, "");

const Sidebar = () => {
  const [active, setActive] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idPrefix = el.id?.split("-")[0]; // ex: "TeamProject-1" → "TeamProject"
            const match = sections.find((s) => s.id === idPrefix);
            if (match) setActive(match.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -50% 0px" }
    );

    const targets = Array.from(document.querySelectorAll("h2, h3"));
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (text: string) => {
    if (text === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // h2 이동 로직: 기존 텍스트 기반 방식 유지
    const matchTarget = sections.find((s) => s.id === text);
    if (matchTarget) {
      const targetMatch = normalize(matchTarget.match);
      const el = Array.from(document.querySelectorAll("h2")).find((h2) =>
        normalize(h2.textContent || "").includes(targetMatch)
      );
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // h3 이동 로직: ID 기준 이동 (위치 보정)
    const el = document.getElementById(text);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden md:flex fixed top-1/4 right-4 z-50 flex-col gap-1 text-sm bg-white dark:bg-[#121212] p-2 rounded shadow w-52">
      {sections.map(({ id, title, dataKey }) => {
        const raw = (data as Record<string, unknown>)[dataKey ?? ""];
        const items: DataItem[] = Array.isArray(raw) ? (raw as DataItem[]) : [];

        const filteredItems =
          id === "TeamProject"
            ? items.filter((item) => item.isTeam === true)
            : id === "PersonalProject"
            ? items.filter((item) => item.isTeam === false)
            : items;

        const orderedItems = [...filteredItems].reverse();
        const show = hoveredId === id;

        return (
          <div
            key={id}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* h2 버튼 */}
            <button
              onClick={() => scrollTo(id)}
              className={`block w-full text-left font-semibold ${
                active === id
                  ? "text-blue-600 dark:text-yellow-300 text-base"
                  : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-300"
              }`}
            >
              {title}
            </button>

            {/* h3 버튼 리스트 */}
            {isClient && (
              <div
                className={`ml-1 mt-1 flex flex-col gap-1 transition-all duration-700 ease-in-out transform ${
                  show
                    ? "opacity-100 scale-100 max-h-[500px]"
                    : "opacity-0 scale-95 max-h-0 overflow-hidden"
                }`}
              >
                {orderedItems
                  .filter(
                    (item): item is { id: number; name: string } =>
                      typeof item.name === "string" &&
                      typeof item.id === "number"
                  )
                  .map((item) => {
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
      })}
    </aside>
  );
};

export default Sidebar;
