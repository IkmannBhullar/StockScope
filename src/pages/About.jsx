import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import Lottie from 'lottie-react';
import contactAnimation from '../../public/animations/contact.json'; // Make sure this file exists

const teamMembers = [
  {
    name: "Ikmann Bhullar",
    role: "Founder & Lead Developer",
    image: "../../public/ikmann.png",
    bio: "Ikmann is the visionary behind StockScope, responsible for frontend development, UI/UX, and feature planning.",
    linkedin: "https://linkedin.com/in/ikmannbhullar"
  },
  {
    name: "Emma Smith",
    role: "Market Analyst",
    image: "../../public/emma.png",
    bio: "Jane researches market trends and ensures our trending and sector data is accurate and timely.",
    linkedin: "https://linkedin.com/in/janedoe"
  },
];



const AnimatedBanner = () => (
  <section className="relative h-[50vh] flex items-center justify-center text-white text-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800">
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl md:text-6xl font-bold z-10"
    >
      About StockScope
    </motion.h1>
    <motion.div
      className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/5 blur-3xl"
      animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    />
  </section>
);

const TeamSection = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto" id="team">
    <h2 className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
      Meet the Team
    </h2>
    <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 text-center shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/20 mb-4"
          />
          <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
          <p className="text-sm text-indigo-300">{member.role}</p>
          <p className="mt-3 text-sm text-gray-300">{member.bio}</p>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-blue-400 hover:text-blue-200 transition"
          >
            LinkedIn →
          </a>
        </motion.div>
      ))}
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="relative z-10 py-24 px-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Left - Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900/80 p-10 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
      >
        <h2 className="text-4xl font-bold mb-6">Let’s Connect</h2>
        <p className="mb-8 text-zinc-400">Have a question or partnership idea? Drop us a message and we’ll respond shortly.</p>
        <form
          action="https://formsubmit.co/your-email@example.com"
          method="POST"
          className="grid gap-6"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="p-3 rounded-md bg-zinc-800 placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="p-3 rounded-md bg-zinc-800 placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="p-3 rounded-md bg-zinc-800 placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Right - Lottie Animation + Socials */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-10 text-center md:text-left"
      >
        <Lottie animationData={contactAnimation} loop autoplay className="w-full max-w-md mx-auto" />
        <div className="flex justify-center md:justify-start gap-6 text-3xl">
          <a href="mailto:contact@stockscope.app" className="text-zinc-300 hover:text-blue-500 transition">
            <FaEnvelope />
          </a>
          <a href="https://github.com/yourgithub" target="_blank" className="text-zinc-300 hover:text-white transition">
            <FaGithub />
          </a>
          <a href="https://twitter.com/yourhandle" target="_blank" className="text-zinc-300 hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/in/ikmannbhullar" target="_blank" className="text-zinc-300 hover:text-blue-600 transition">
            <FaLinkedin />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default function About() {
  return (
    <main className="relative z-10 text-white">
      <AnimatedBanner />
      <TeamSection />
      <ContactSection />
    </main>
  );
}