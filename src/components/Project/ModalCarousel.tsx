import { useEffect, useRef, useState } from "react";

type ModalCarouselProps = {
  images: string[];
  startIndex: number;
  onClose: () => void;
};

const arrowStyle =
  "text-[2.4rem] sm:text-[3rem] font-bold select-none cursor-pointer transition hover:text-[#444] dark:hover:text-[#fff] px-2 rounded-lg";

const ModalCarousel = ({ images, startIndex, onClose }: ModalCarouselProps) => {
  const [current, setCurrent] = useState(startIndex);
  const backdropRef = useRef<HTMLDivElement>(null);
  const startTouch = useRef<number | null>(null);

  // ESC 닫기, 좌우키 이동
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images.length, onClose]);

  // 바깥 클릭 닫기
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (backdropRef.current && e.target === backdropRef.current) {
        onClose();
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [onClose]);

  // 모바일: 스와이프 좌우
  const handleTouchStart = (e: React.TouchEvent) => {
    startTouch.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startTouch.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startTouch.current - endX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) setCurrent((c) => (c + 1) % images.length);
      else setCurrent((c) => (c - 1 + images.length) % images.length);
    }
    startTouch.current = null;
  };

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

        {/* 이미지 + 좌우 버튼 */}
        <div
          className="flex items-center justify-center w-full h-full relative select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* < 버튼 */}
          {images.length > 1 && (
            <span
              className={`${arrowStyle} absolute left-1 top-1/2 -translate-y-1/2 text-[#aaa] dark:text-[#666]`}
              onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
              aria-label="이전 이미지"
              tabIndex={0}
              role="button"
            >&#60;</span>
          )}
          <img
            src={images[current]}
            alt={`project image ${current + 1}`}
            className="
              mx-auto object-contain bg-gray-100 dark:bg-[#222]
              rounded-xl shadow
              max-h-[68vh] sm:max-h-[75vh]
              max-w-[94vw] sm:max-w-[800px]
              w-auto h-auto
              transition-all
            "
          />
          {/* > 버튼 */}
          {images.length > 1 && (
            <span
              className={`${arrowStyle} absolute right-1 top-1/2 -translate-y-1/2 text-[#aaa] dark:text-[#666]`}
              onClick={() => setCurrent((c) => (c + 1) % images.length)}
              aria-label="다음 이미지"
              tabIndex={0}
              role="button"
            >&#62;</span>
          )}
        </div>
        {/* 인덱스 & 페이지 정보 */}
        <div className="mt-2 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          {current + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ModalCarousel;