// components/sidebar-home.tsx

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SidebarHomeProps {
  activeSection: string;
}

const navItems = [
  { id: 'who', label: 'Who' },
  { id: 'what', label: 'What' },
  { id: 'why', label: 'Why' },
  { id: 'how', label: 'How' },
  { id: 'features', label: 'Features' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'privacy', label: 'Privacy & Security' },
];

const SidebarHome: React.FC<SidebarHomeProps> = ({ activeSection }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col p-4">
      {/* Logo */}
      <div className="mb-8">
        <img src="/path-to-logo.png" alt="Help for Trauma" className="w-32 mx-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-4">
              <Link href={`#${item.id}`}>
                <motion.a
                  className={`block p-2 rounded transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-xl bg-gray-700'
                      : 'text-base hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="mt-auto">
        <a href="#" className="block mb-2 hover:underline">
          Get Started
        </a>
        <a href="#" className="block mb-2 hover:underline">
          Resources
        </a>
        <a href="#" className="block hover:underline">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default SidebarHome;
