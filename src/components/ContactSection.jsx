import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const ContactSection = () => {
  return (
    <section className="w-full py-20 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Lottie Animation */}
        <div className="w-full flex justify-center">
          <Player
            autoplay
            loop
            src="/animations/contact.json"
            style={{ height: '320px', width: '320px' }}
          />
        </div>

        {/* Contact Form */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-semibold mb-6 text-center">Let's Connect</h2>
          <form action="https://formsubmit.co/your-email@example.com" method="POST" className="grid gap-4">
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="bg-zinc-800/50 border border-zinc-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="bg-zinc-800/50 border border-zinc-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="bg-zinc-800/50 border border-zinc-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;