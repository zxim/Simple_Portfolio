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
  FaServer,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiUbuntu,
  SiDocker,
  SiNginx,
  SiApache,
} from "react-icons/si";
import { IconType } from "react-icons";

type Skill = {
  name: string;
  level: "상" | "중" | "하";
  icon: IconType;
};

const SKILLS = {
  Language: [
    { name: "HTML", level: "상", icon: FaHtml5 },
    { name: "CSS", level: "상", icon: FaCss3Alt },
    { name: "JavaScript", level: "중", icon: FaJs },
    { name: "TypeScript", level: "중", icon: SiTypescript },
    { name: "PHP", level: "중", icon: FaPhp },
    { name: "Python", level: "하", icon: FaPython },
  ],
  Framework: [
    { name: "React", level: "중", icon: FaReact },
    { name: "Next.js", level: "하", icon: SiNextdotjs },
    { name: "Tailwind CSS", level: "하", icon: SiTailwindcss },
  ],
  WebServer: [
    { name: "Apache", level: "중", icon: SiApache },
    { name: "Nginx", level: "하", icon: SiNginx },
  ],
  DevSecOps: [
    { name: "AWS EC2", level: "상", icon: FaAws },
    { name: "AWS S3", level: "상", icon: FaAws },
    { name: "AWS ALB", level: "상", icon: FaAws },
    { name: "AWS ACM", level: "상", icon: FaAws },
    { name: "Git", level: "중", icon: FaGitAlt },
    { name: "Vercel", level: "하", icon: SiVercel },
    { name: "Docker", level: "하", icon: SiDocker },
  ],
  OS: [
    { name: "Ubuntu", level: "중", icon: SiUbuntu },
    { name: "Kali Linux", level: "하", icon: FaLinux },
  ],
  Security: [
    { name: "Suricata", level: "중", icon: FaShieldAlt },
    { name: "Wireshark", level: "중", icon: FaEye },
    { name: "Burp Suite", level: "하", icon: FaNetworkWired },
  ],
} as const;

const LEVEL_BADGE = {
  상: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200",
  중: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200",
  하: "bg-gray-200 text-gray-500 dark:bg-gray-700/60 dark:text-gray-200",
};

const CATEGORY_LIST: { name: keyof typeof SKILLS; icon: IconType }[] = [
  { name: "Language", icon: FaKeyboard },
  { name: "Framework", icon: FaReact },
  { name: "WebServer", icon: FaServer },
  { name: "DevSecOps", icon: FaAws },
  { name: "OS", icon: FaLinux },
  { name: "Security", icon: FaShieldAlt },
];

type Category = keyof typeof SKILLS;

export default function SkillsTabs() {
  const [selected, setSelected] = useState<Category>("Language");

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row bg-white/90 dark:bg-neutral-900/80 rounded-3xl shadow-2xl overflow-hidden mt-8 border border-gray-200 dark:border-gray-800 relative">
      <div className="flex md:flex-col bg-gradient-to-b from-gray-100 to-white dark:from-neutral-800 dark:to-neutral-900 md:w-44 w-full">
        {CATEGORY_LIST.map((field) => {
          const Icon = field.icon as React.FC<any>;
          return (
            <button
              key={field.name}
              className={`
                flex items-center gap-2 w-full text-sm sm:text-base md:text-lg px-4 py-3 sm:py-4 transition font-semibold border-b md:border-b-0 md:border-l-4 border-transparent
                ${selected === field.name
                  ? "bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 border-l-blue-500 md:border-l-8 shadow-sm"
                  : "hover:bg-blue-50 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-200"}
                focus:outline-none
              `}
              onClick={() => setSelected(field.name)}
            >
              <Icon className="inline-block mr-2" />
              {field.name}
            </button>
          );
        })}
      </div>
      <div className="flex-1 p-5 sm:p-8 bg-white/80 dark:bg-neutral-900/90">
        <AnimatePresence mode="wait">
          <motion.ul
            key={selected}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", duration: 0.38 }}
            className="space-y-3 sm:space-y-5"
          >
            {SKILLS[selected].map((skill: Skill) => {
              const SkillIcon = skill.icon as React.FC<any>;
              return (
                <li
                  key={skill.name}
                  className="flex justify-between items-center bg-gradient-to-r from-white to-blue-50/30 dark:from-neutral-800 dark:to-blue-900/10 rounded-2xl shadow-md px-3 py-3 sm:px-5 sm:py-4 hover:scale-[1.025] hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <SkillIcon className="text-xl sm:text-2xl" />
                    <span className="text-base sm:text-lg font-medium">{skill.name}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-bold ${LEVEL_BADGE[skill.level]}`}>
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