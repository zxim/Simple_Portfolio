import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaReact,
  FaGitAlt,
  FaAws,
  FaKeyboard,
  FaLinux,
  FaShieldAlt,
  FaEye,
  FaNetworkWired,
  FaBug,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiUbuntu,
  SiDocker,
} from "react-icons/si";
import { IconType } from "react-icons";

type Skill = {
  name: string;
  level: "상" | "중" | "하";
  icon: IconType;
};

const SKILLS = {
  언어: [
    { name: "HTML", level: "상", icon: FaHtml5 },
    { name: "CSS", level: "상", icon: FaCss3Alt },
    { name: "JavaScript", level: "중", icon: FaJs },
    { name: "TypeScript", level: "중", icon: SiTypescript },
    { name: "PHP", level: "중", icon: FaPhp },
        { name: "Python", level: "하", icon: FaPython },
  ],
  프레임워크: [
    { name: "React", level: "중", icon: FaReact },
    { name: "Next.js", level: "하", icon: SiNextdotjs },
    { name: "Tailwind CSS", level: "하", icon: SiTailwindcss },
  ],
  데브섹옵스: [
    { name: "AWS EC2", level: "상", icon: FaAws },
    { name: "AWS S3", level: "상", icon: FaAws },
    { name: "AWS ALB", level: "상", icon: FaAws },
    { name: "Git", level: "중", icon: FaGitAlt },
    { name: "Vercel", level: "하", icon: SiVercel },
    { name: "Docker", level: "하", icon: SiDocker },
  ],
  운영체제: [
    { name: "Ubuntu", level: "중", icon: SiUbuntu },
    { name: "Kali Linux", level: "하", icon: FaLinux },
  ],
  보안: [
    { name: "Suricata", level: "중", icon: FaShieldAlt },
    { name: "Wireshark", level: "중", icon: FaEye },
    { name: "Burp Suite", level: "하", icon: FaNetworkWired },
    { name: "Metasploit", level: "하", icon: FaBug },
  ],
} as const;

const LEVEL_BADGE = {
  "상": "bg-blue-100 text-blue-600",
  "중": "bg-yellow-100 text-yellow-600",
  "하": "bg-gray-200 text-gray-500",
};

const 분야_목록: { name: string; icon: IconType }[] = [
  { name: "언어", icon: FaKeyboard },
  { name: "프레임워크", icon: FaReact },
  { name: "데브섹옵스", icon: FaAws },
  { name: "운영체제", icon: FaLinux },
  { name: "보안", icon: FaShieldAlt },
];

type 분야 = keyof typeof SKILLS;

export default function SkillsTabs() {
  const [selected, setSelected] = useState<분야>("언어");

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row bg-white/90 rounded-3xl shadow-2xl overflow-hidden mt-10 border border-gray-200">
      <div className="flex md:flex-col bg-gradient-to-b from-gray-100 to-white md:w-40 w-full">
        {분야_목록.map((field) => {
          const Icon = field.icon;
          return (
            <button
              key={field.name}
              className={`
                flex items-center gap-2 w-full text-base md:text-lg px-4 py-4 transition font-semibold border-b md:border-b-0 md:border-l-4 border-transparent
                ${selected === field.name ? "bg-white text-blue-600 border-l-blue-500 md:border-l-8 shadow-sm" : "hover:bg-blue-50 text-gray-600"}
                focus:outline-none
              `}
              onClick={() => setSelected(field.name as 분야)}
            >
              <Icon className="inline-block mr-2" />
              {field.name}
            </button>
          );
        })}
      </div>
      <div className="flex-1 p-8 bg-white/80">
        <AnimatePresence mode="wait">
          <motion.ul
            key={selected}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", duration: 0.38 }}
            className="space-y-5"
          >
            {SKILLS[selected].map((skill: Skill) => {
              const SkillIcon = skill.icon;
              return (
                <li
                  key={skill.name}
                  className="flex justify-between items-center bg-gradient-to-r from-white to-blue-50/30 rounded-2xl shadow-md px-5 py-4 hover:scale-[1.025] hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <SkillIcon className="text-xl" />
                    <span className="text-lg font-medium">{skill.name}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-sm font-bold ${LEVEL_BADGE[skill.level]}`}>
                    {skill.level}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}