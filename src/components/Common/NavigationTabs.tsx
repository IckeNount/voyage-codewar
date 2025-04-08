"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const tabs = [
  { name: "Dashboard", path: "/", icon: "/assets/icons/Home.png" },
  { name: "Missions", path: "/missions", icon: "/assets/icons/Target.png" },
  { name: "PvP", path: "/pvp", icon: "/assets/icons/Swords.png" },
  { name: "Inventory", path: "/inventory", icon: "/assets/icons/Package.png" },
  { name: "Profile", path: "/profile", icon: "/assets/icons/User.png" },
];

export default function NavigationTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className='fixed bottom-0 inset-x-0 z-50 bg-gray-900 text-white flex justify-around py-2 shadow-lg rounded-t-2xl'>
      {tabs.map(({ name, path, icon }) => {
        const isActive = pathname === path;

        return (
          <button
            key={name}
            onClick={() => router.push(path)}
            className='flex flex-col items-center space-y-1'
          >
            <motion.div
              animate={{ scale: isActive ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={icon}
                alt={`${name} icon`}
                width={24}
                height={24}
                className={`transition-opacity ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              />
            </motion.div>
            <span
              className={`text-xs ${
                isActive ? "text-teal-400" : "text-gray-400"
              }`}
            >
              {name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
