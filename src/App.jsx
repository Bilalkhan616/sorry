import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const messages = [
  "for being a dumbass ",
  "for hurting your feefees 😭",
  "for being rude ",
];

export default function ApologyPage() {
  const [staticText] = useState("Amna i am sorry ");
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showForgiveness, setShowForgiveness] = useState(false);

  useEffect(() => {
    if (wordIndex < messages.length) {
      if (charIndex < messages[wordIndex].length) {
        const timeout = setTimeout(() => {
          setText((prev) => prev + messages[wordIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setWordIndex((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setShowForgiveness(true);
        setTimeout(() => {
          setShowForgiveness(false);
          setWordIndex(0);
          setCharIndex(0);
          setText("");
        }, 2000);
      }, 1000);
    }
  }, [charIndex, wordIndex]);

  return (
    <div
      className="relative flex items-center justify-center h-screen w-screen"
      style={{
        backgroundImage: "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0yMThiYXRjaDktbXludC0zOC1qb2I1OTguanBn.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-opacity-50"></div>
      
      {/* Centered Bunny Image */}
      <motion.img 
        src="https://i.seadn.io/gae/2r-et3usv5ZXKjb7XLrDLYYgsMDvLFf9vmqyERytBx2zs4wZXexoM0SotSzdkU-GG4lCxFAhXv43dMBYkA9eYj8OIxzZPGDIswV-eA?auto=format&dpr=1&w=1000"
        alt="Cute Bunny"
        className="relative w-48 h-48 z-10" // Increased size and added z-index
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      {/* Speech Bubble Container */}
      <div className="flex flex-col items-center absolute top-20 z-20"> {/* Positioned above bunny */}
        <div className="relative bg-white p-4 rounded-2xl shadow-lg speech-bubble">
          {!showForgiveness && (
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-800 font-cursive drop-shadow-md"
            >
              {staticText}{text} ✨
            </motion.p>
          )}
          {showForgiveness && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="text-2xl font-bold text-black font-cursive drop-shadow-lg"
            >
              pls forgib 😔
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}