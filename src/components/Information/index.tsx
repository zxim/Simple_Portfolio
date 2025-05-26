import { useState } from "react";

import ContactItem from "../ContactItem";
import Introduce from "./Introduce";
import FlipImage from "./FlipImage";
import EmailPopup from "./EmailPopup";
import SkillsList from "./SkillsList";

import { DataProps } from "@/types";

const Information = ({ information }: Pick<DataProps, "information">) => {
  const [flipped, setFlipped] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => setFlipped((prev) => !prev);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <div className="w-36 h-36 shrink-0" onClick={handleClick}>
            <FlipImage
              frontSrc="/images/profile/profile1.jpg"
              backSrc="/images/profile/profile2.jpg"
              flipped={flipped}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="leading-[1.15]">
              안녕하세요,
              <br />
              꾸준히 성장하는 인재{" "}
              <span className="text-PRIMARY font-semibold">
                {information.name}
              </span>
              입니다.
            </h1>
            <div className="flex gap-2 text-sm font-normal tracking-tight leading-tight font-sans">
              {information.contact.map((contact) =>
                contact.isEmail ? (
                  <span
                    key={contact.id}
                    onClick={handleEmailClick}
                    className="cursor-pointer text-BLACK hover:text-PRIMARY_HEAVY dark:text-neutral-200 dark:hover:text-PRIMARY_HEAVY"
                  >
                    {contact.name}
                  </span>
                ) : (
                  <ContactItem
                    key={contact.id}
                    className="text-BLACK hover:text-PRIMARY_HEAVY dark:text-neutral-200 dark:hover:text-PRIMARY_HEAVY"
                    {...contact}
                  >
                    {contact.name}
                  </ContactItem>
                )
              )}
            </div>
          </div>
        </div>
        <Introduce markdown={information.markdown} />
        <div>
          <SkillsList />
        </div>
      </div>
      {showPopup && (
        <EmailPopup
          email={
            information.contact.find((c) => c.isEmail)?.href ||
            "tlaals44@naver.com"
          }
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default Information;