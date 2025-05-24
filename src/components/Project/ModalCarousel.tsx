import React, { useRef, useEffect } from "react";

import CarouselSlider from "./CarouselSlider";

type ModalCarouselProps = {
  images: string[];
  startIndex: number;
  onClose: () => void;
};

const ModalCarousel = ({ images, startIndex, onClose }: ModalCarouselProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 닫기
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (backdropRef.current && e.target === backdropRef.current) onClose();
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="
        relative flex flex-col items-center w-[92vw] max-w-[500px] sm:max-w-[900px]
        h-[94vh] sm:h-[90vh] rounded-2xl shadow-2xl p-2 sm:p-4
        bg-white dark:bg-[#1b1b1b] transition-colors
      ">
        {/* 닫기 버튼 */}
        <button
          style={{
            zIndex: 9999,
            position: 'absolute',
            right: 16,
            top: 16,
            background: "transparent",
            border: "none",
            padding: 0,
          }}
          className="text-3xl font-bold text-[#aaa] hover:text-[#444] dark:text-[#666] dark:hover:text-[#fff] cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >×</button>
        {/* 캐러셀 */}
        <CarouselSlider images={images} startIndex={startIndex} />
      </div>
    </div>
  );
};

export default ModalCarousel;