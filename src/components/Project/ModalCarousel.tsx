import React, { useRef, useEffect } from "react";

import CarouselSlider from "./CarouselSlider";

type ModalCarouselProps = {
  images: string[];
  startIndex: number;
  onClose: () => void;
};

const ModalCarousel = ({ images, startIndex, onClose }: ModalCarouselProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (backdropRef.current && e.target === backdropRef.current) onClose();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        className={`
          relative flex flex-col items-center
          w-[92vw] max-w-[900px]  // 최대 너비
          h-[90vh] max-h-[700px]  // 최대 높이
          rounded-2xl shadow-2xl
          p-6  // 적당한 패딩으로 내부 여백 확보
          bg-white dark:bg-[#1b1b1b]
          transition-colors
          overflow-hidden
        `}
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          style={{
            zIndex: 9999,
            position: "absolute",
            right: 16,
            top: 16,
            background: "transparent",
            border: "none",
            padding: 0,
          }}
          className="text-3xl font-bold text-[#aaa] hover:text-[#444] dark:text-[#666] dark:hover:text-[#fff] cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        <CarouselSlider images={images} startIndex={startIndex} />
      </div>
    </div>
  );
};

export default ModalCarousel;