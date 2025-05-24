import React from "react";

type CarouselArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
};

const CarouselArrow = ({ direction, onClick }: CarouselArrowProps) => (
  <span
    className={`text-[2.4rem] sm:text-[3rem] font-bold select-none cursor-pointer transition hover:text-[#444] dark:hover:text-[#fff] px-2 rounded-lg absolute ${direction === "left" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-[#aaa] dark:text-[#666]`}
    onClick={onClick}
    aria-label={direction === "left" ? "이전 이미지" : "다음 이미지"}
    tabIndex={0}
    role="button"
  >
    {direction === "left" ? "‹" : "›"}
  </span>
);

export default CarouselArrow;