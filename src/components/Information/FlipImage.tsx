"use client";

import Image from "next/image";

import styles from "./FlipImage.module.css";

type Props = {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  flipped: boolean;
};

const FlipImage = ({ frontSrc, backSrc, alt = "profile", flipped }: Props) => {
  return (
    <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
      <div className={styles.face}>
        <Image src={frontSrc} alt={alt} fill className="object-cover rounded-full" />
      </div>
      <div className={`${styles.face} ${styles.back}`}>
        <Image src={backSrc} alt={alt} fill className="object-cover rounded-full" />
      </div>
    </div>
  );
};

export default FlipImage;
