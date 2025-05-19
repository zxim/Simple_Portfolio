import data from "@/../data.json";

export type SectionStructure = {
  id: string;
  title: string;
  children: string[];
};

type NamedItem = { name?: unknown };

const toTitle = (id: string) =>
  id
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

export const getSectionStructure = (): SectionStructure[] => {
  return Object.entries(data)
    .filter(([, value]) => Array.isArray(value))
    .map(([id, value]) => {
      const items = value as NamedItem[];

      const names = items
        .map((item) => item.name)
        .filter((name): name is string => typeof name === "string");

      return {
        id,
        title: toTitle(id),
        children: names,
      };
    });
};
