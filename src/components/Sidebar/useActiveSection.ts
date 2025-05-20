import { useEffect, useState } from "react";

import { sections } from "./sections";

export const useActiveSection = () => {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idPrefix = el.id?.split("-")[0];
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

  return active;
};
