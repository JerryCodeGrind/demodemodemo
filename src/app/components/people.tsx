import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, staggerContainer, defaultTransition, fadeinRight } from "../lib/utils";

export default function People() {
  return (
    <motion.section
      className="bg-neutral-900 text-white px-10 py-24"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Heading */}
      <motion.h2
        className="text-5xl font-bold text-center mb-16"
        variants={fadeInUp}
        transition={defaultTransition}
      >
        Who we are
      </motion.h2>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto items-center justify-items-center">
        {/* Text */}
        <motion.div
          className="space-y-6 text-lg leading-relaxed text-gray-300 text-center"
          variants={fadeinRight}
          transition={defaultTransition}
        >
          <p>
            We're a collective of passionate developers, designers, and builders who craft elegant, scalable digital experiences.
          </p>
          <p>
            Whether it's designing seamless user interfaces or solving complex engineering challenges, our mission is to deliver thoughtful, innovative solutions that drive impact.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
