import React from "react";

type CarouselArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
};

const CarouselArrow = ({ direction, onClick }: CarouselArrowProps) => (
  <span
    className={`
      text-[2.4rem] sm:text-[3rem] font-bold select-none cursor-pointer
      transition
      px-4 py-2 rounded-lg
      bg-transparent
      text-black
      hover:text-blue-500
      dark:text-white dark:hover:text-blue-300
      outline-none
    `}
    onClick={onClick}
    aria-label={direction === "left" ? "이전 이미지" : "다음 이미지"}
    tabIndex={0}
    role="button"
  >
    {direction === "left" ? "<" : ">"}
  </span>
);

export default CarouselArrow;