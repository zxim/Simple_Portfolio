import Image from "next/image";

import ContactItem from "../ContactItem";
import Introduce from "./Introduce";

import { DataProps } from "@/types";

const Information = ({ information }: Pick<DataProps, "information">) => {
  return (
    <div className="flex flex-col gap-8">
      {/* 이미지 추가 */}
      <div className="flex items-center gap-6">
       <div className="w-36 h-36 rounded-full overflow-hidden shrink-0">
        <Image
          src="/images/profile/profile.jpg"
          alt="profile"
          width={180}
          height={180}
          className="object-cover"
        />
      </div>
        <div className="flex flex-col gap-2">
          <h1 className="leading-[1.15]">
            안녕하세요,
            <br /> 프론트엔드 엔지니어{" "}
            <span className="text-PRIMARY font-semibold">{information.name}</span>
            입니다.
          </h1>
          <div className="flex gap-1">
            {information.contact.map((contact) => (
              <ContactItem
                key={contact.id}
                className="text-BLACK hover:text-PRIMARY_HEAVY dark:hover:text-PRIMARY_HEAVY"
                {...contact}
              >
                {contact.name}
              </ContactItem>
            ))}
          </div>
        </div>
      </div>
      <Introduce markdown={information.markdown} />
    </div>
  );
};

export default Information;
