import { motion } from "motion/react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-lavender-500/10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-lavender-400 bg-clip-text text-transparent mb-2">
              Shahd
            </h3>
            <p className="text-gray-400 text-sm">UI/UX Designer & Developer</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-purple-400 transition">Home</a></li>
              <li><a href="#projects" className="hover:text-purple-400 transition">Projects</a></li>
              <li><a href="#about" className="hover:text-purple-400 transition">About</a></li>
              <li><a href="#contact" className="hover:text-purple-400 transition">Contact</a></li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-400 mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com/Shahd1982001" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/10 hover:bg-purple-600 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/shahd-albasha-6141b9397/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/10 hover:bg-purple-600 transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/shahed_al19/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/10 hover:bg-purple-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:shahedal691@gmail.com" className="p-2 rounded-lg bg-white/10 hover:bg-purple-600 transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500"
        >
          <p>&copy; {currentYear} Shahd Al-Basha. All rights reserved.</p>
          <p>Designed & Built with <span className="text-purple-400">💜</span> by Shahd</p>
        </motion.div>
      </div>
    </footer>
  );
}
