"use client";

import { useEffect, useState } from "react";

type Props = {
  email: string;
  onClose: () => void;
};

const EmailPopup = ({ email, onClose }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("#email-popup") === null) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 후 원복
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        id="email-popup"
        className="relative bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4"
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <p className="text-lg font-semibold">{email}</p>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-PRIMARY text-white rounded hover:bg-PRIMARY_HEAVY transition-all duration-300"
        >
          {copied ? "✔ 복사됨" : "복사하기"}
        </button>
      </div>
    </div>
  );
};

export default EmailPopup;