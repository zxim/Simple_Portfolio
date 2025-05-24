import React, { useEffect, useRef, useState } from "react";

import CarouselArrow from "./CarouselArrow";

type CarouselSliderProps = {
  images: string[];
  startIndex: number;
};

const CarouselSlider = ({ images, startIndex }: CarouselSliderProps) => {
  // [cloneLast, ...images, cloneFirst]
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

  // 키보드 ← →
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") slideTo(current - 1);
      if (e.key === "ArrowRight") slideTo(current + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current]);

  // 무한 루프 트릭
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

  // 모바일 스와이프
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

  // 실제 표시 인덱스(1~images.length)
  const realIdx = ((current - 1 + images.length) % images.length) + 1;

  return (
    <>
      <div
        className="flex items-center justify-center w-full h-full relative select-none overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* < 버튼 */}
        {images.length > 1 && (
          <CarouselArrow direction="left" onClick={() => slideTo(current - 1)} />
        )}
        {/* 슬라이드 이미지 영역 */}
        <div
          className={`
            flex flex-nowrap w-full h-full
            ${transition ? "transition-transform duration-500 ease-in-out" : ""}
          `}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {extendedImages.map((img, i) => (
            <div
              key={i}
              className="
                flex-shrink-0 flex-grow-0 w-full h-full flex items-center justify-center
              "
            >
              <img
                src={img}
                alt={`project image`}
                className="
                  object-contain bg-gray-100 dark:bg-[#222]
                  rounded-xl shadow
                  max-h-[68vh] sm:max-h-[75vh]
                  max-w-[94vw] sm:max-w-[800px]
                  w-auto h-auto
                  transition-all
                "
              />
            </div>
          ))}
        </div>
        {/* > 버튼 */}
        {images.length > 1 && (
          <CarouselArrow direction="right" onClick={() => slideTo(current + 1)} />
        )}
      </div>
      {/* 인덱스 & 페이지 정보 */}
      <div className="mt-2 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
        {realIdx} / {images.length}
      </div>
    </>
  );
};

export default CarouselSlider;