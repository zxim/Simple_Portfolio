import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Links from "./Links";
import ModalCarousel from "./ModalCarousel";

import { ProjectProps } from "@/types";

const ProjectItem = ({
  id,
  sectionId,
  name,
  description,
  repoUrl,
  webUrl,
  period,
  stack,
  markdown,
  imageCount = 0,
  imgSrc,
}: ProjectProps & { id: number; sectionId: string; imageCount?: number }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);

  const images = Array.from({ length: imageCount }, (_, i) =>
    `/images/project/${id}/${i + 1}.png`
  );

  // 모바일은 툴팁 숨김
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0">
        {/* 왼쪽 sticky */}
        <div className="md:w-72 flex flex-col gap-2">
          <div className="md:sticky md:top-8 self-start flex md:flex-col items-center md:items-start gap-6">
            {imgSrc && (
              <Image
                src={imgSrc}
                width={200}
                height={200}
                alt={name}
                className="object-cover rounded-lg border-[1px] border-GRAY_LIGHT dark:border-white border-solid w-24 h-24"
              />
            )}
            <div className="flex flex-col gap-2">
              <div className="w-48">
                <h3 id={`${sectionId}-${id}`}>{name}</h3>
                <div className="flex flex-col">
                  <span>{`${period[0]} - ${period[1]}`}</span>
                </div>
              </div>
              <Links repoUrl={repoUrl} webUrl={webUrl} />
            </div>
          </div>
        </div>

        {/* 오른쪽: 본문 */}
        <div
          className="md:border-GRAY_LIGHT md:border-solid md:border-l-[1px] md:pl-4 markdown flex flex-col w-full gap-2 cursor-pointer relative"
          onClick={() => images.length > 0 && setModalOpen(true)}
          onMouseMove={e => {
            if (isTouch) return;
            setTooltip({ x: e.clientX, y: e.clientY });
          }}
          onMouseLeave={() => setTooltip(null)}
          title="이미지 모아보기"
        >
          <div>
            <blockquote className="whitespace-pre-wrap">{description}</blockquote>
            <div className="flex gap-1 flex-wrap">
              {stack.map((stack) => (
                <span
                  key={stack}
                  className="bg-BLACK dark:bg-white py-[2px] px-1.5 rounded-md text-xs font-medium font-mono whitespace-nowrap text-white dark:text-BLACK"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdown ?? ""}
          </ReactMarkdown>
          {/* 툴팁 – hover 시 마우스 옆에 뜸 */}
          {tooltip && (
            <div
              className={`
                fixed z-50 pointer-events-none
                bg-black/90 text-white
                dark:bg-white dark:text-black
                text-xs rounded px-3 py-2 shadow-lg
                font-medium
              `}
              style={{
                left: tooltip.x + 16,
                top: tooltip.y + 10,
                whiteSpace: "nowrap",
                opacity: 0.95,
                transition: "opacity .12s",
              }}
            >
              <span className="mr-1">🖼️</span>
              클릭해서 프로젝트 사진 보기
            </div>
          )}
        </div>
      </div>
      {/* 캐러셀 모달 */}
      {modalOpen && (
        <ModalCarousel
          images={images}
          startIndex={0}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectItem;