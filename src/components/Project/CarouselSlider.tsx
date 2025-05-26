import React, { useEffect, useRef, useState } from "react";

import CarouselArrow from "./CarouselArrow";

type CarouselSliderProps = {
  images: string[];
  startIndex: number;
};

const CarouselSlider = ({ images, startIndex }: CarouselSliderProps) => {
  const extendedImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];
  const [current, setCurrent] = useState(startIndex + 1);
  const [transition, setTransition] = useState(true);
  const startTouch = useRef<number | null>(null);

  const slideTo = (idx: number) => {
    setCurrent(idx);
    setTransition(true);
  };

  // 키보드 좌우 방향키 제어
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") slideTo(current - 1);
      if (e.key === "ArrowRight") slideTo(current + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current]);

  // 무한 루프 트릭 처리
  useEffect(() => {
    if (!transition) return;
    if (current === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(images.length);
      }, 500);
    }
    if (current === images.length + 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(1);
      }, 500);
    }
  }, [current, images.length, transition]);

  useEffect(() => {
    if (!transition) {
      setTimeout(() => {
        setTransition(true);
      }, 20);
    }
  }, [transition]);

  // 모바일 터치 슬라이드 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    startTouch.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startTouch.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startTouch.current - endX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) slideTo(current + 1);
      else slideTo(current - 1);
    }
    startTouch.current = null;
  };

  const realIdx = ((current - 1 + images.length) % images.length) + 1;

  return (
    <div className="flex flex-col items-center w-full max-w-full">
      <div
        className="relative w-full max-w-[800px]"
        style={{ paddingTop: "56.25%", overflow: "hidden" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`
            absolute top-0 left-0 w-full h-full flex transition-transform duration-500 ease-in-out
            ${transition ? "" : "transition-none"}
          `}
          style={{
            transform: `translateX(-${current * 100}%)`,
            display: "flex",
            flexWrap: "nowrap",
            height: "100%",
          }}
        >
          {extendedImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex-grow-0 w-full h-full flex items-center justify-center"
            >
              <img
                src={img}
                alt={`project image`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 & 인덱스 영역 (이미지 바로 아래) */}
      {images.length > 1 && (
        <div className="flex flex-row gap-6 mt-2 mb-4 items-center justify-center max-w-[800px] w-full">
          <CarouselArrow direction="left" onClick={() => slideTo(current - 1)} />
          <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm select-none">
            {realIdx} / {images.length}
          </div>
          <CarouselArrow direction="right" onClick={() => slideTo(current + 1)} />
        </div>
      )}
    </div>
  );
};

export default CarouselSlider;