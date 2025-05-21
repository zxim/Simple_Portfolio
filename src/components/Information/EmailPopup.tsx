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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        id="email-popup"
        className="relative bg-white dark:bg-zinc-800 text-black dark:text-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4"
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold hover:text-PRIMARY_HEAVY"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-lg font-semibold break-words text-center">{email}</p>

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