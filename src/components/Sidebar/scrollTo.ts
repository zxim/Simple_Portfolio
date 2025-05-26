import { sections } from "./sections";

const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, "");

export const scrollTo = (text: string) => {
  if (text === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

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

  const el = document.getElementById(text);
  if (el) {
    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};