import type { ComponentType, SVGProps } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

type SocialLink = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  color: string;
};

export function Contact() {
  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/Shahd1982001",
      color: "from-gray-700 to-gray-900"
    },
    {
      name: "WhatsApp",
      icon: ({ className }: SVGProps<SVGSVGElement>) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: "https://wa.me/218918701397",
      color: "from-green-500 to-green-700"
    },
    {
      name: "Call Me",
      icon: Phone,
      href: "tel:+218918701397",
      color: "from-blue-500 to-blue-700"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shahd-albasha-6141b9397/",
      color: "from-blue-600 to-blue-800"
    },
    {
      name: "Gmail",
      icon: Mail,
      href: "mailto:shahedal691@gmail.com",
      color: "from-red-500 to-red-700"
    },
    {
      name: "Behance",
      icon: ({ className }: SVGProps<SVGSVGElement>) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      ),
      href: "https://www.behance.net/shoshohes",
      color: "from-blue-500 to-blue-700"
    }
  ];

  return (
    <section id="contact" className="py-24 px-8 bg-gradient-to-b from-lavender-50/50 to-purple-100/30 relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-lavender-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-block px-5 py-2 bg-purple-50 rounded-full border border-purple-100">
            <span className="text-sm tracking-wide text-purple-600 uppercase">Get In Touch</span>
          </div>

          <h2 className="text-5xl font-light">
            <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">Contact</span> Me
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's collaborate and create something amazing together. Feel free to reach out through any of these platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100/50 shadow-lg shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg`}>
                  {(() => {
                    const Icon = social.icon;
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </div>

                <h3 className="text-xl font-medium text-gray-800">
                  {social.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}




// import type { ComponentType, SVGProps } from "react";
// import { motion } from "motion/react";
// import { Github, Instagram, Linkedin, Mail } from "lucide-react";

// type SocialLink = {
//   name: string;
//   icon: ComponentType<SVGProps<SVGSVGElement>>;
//   href: string;
//   color: string;
// };

// export function Contact() {
//   const socialLinks: SocialLink[] = [
//     {
//       name: "GitHub",
//       icon: Github,
//       href: "https://github.com/Shahd1982001",
//       color: "from-gray-700 to-gray-900"
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       href: "https://www.instagram.com/shahed_al19/",
//       color: "from-pink-500 to-purple-600"
//     },
//     {
//       name: "LinkedIn",
//       icon: Linkedin,
//       href: "https://www.linkedin.com/in/shahd-albasha-6141b9397/",
//       color: "from-blue-600 to-blue-800"
//     },
//     {
//       name: "Gmail",
//       icon: Mail,
//       href: "mailto:shahedal691@gmail.com",
//       color: "from-red-500 to-red-700"
//     },
//     {
//       name: "Behance",
//       icon: ({ className }: SVGProps<SVGSVGElement>) => (
//         <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//           <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
//         </svg>
//       ),
//       href: "https://www.behance.net/shoshohesَ",
//       color: "from-blue-500 to-blue-700"
//     }
//   ];

//   return (
//     <section id="contact" className="py-24 px-8 bg-gradient-to-b from-lavender-50/50 to-purple-100/30 relative overflow-hidden">
//       {/* Background decorative shapes */}
//       <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-20 right-20 w-72 h-72 bg-lavender-200/20 rounded-full blur-3xl"></div>

//       <div className="max-w-5xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center space-y-6 mb-16"
//         >
//           <div className="inline-block px-5 py-2 bg-purple-50 rounded-full border border-purple-100">
//             <span className="text-sm tracking-wide text-purple-600 uppercase">Get In Touch</span>
//           </div>

//           <h2 className="text-5xl font-light">
//             <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">Contact</span> Me
//           </h2>

//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Let's collaborate and create something amazing together. Feel free to reach out through any of these platforms.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
//           {socialLinks.map((social, index) => (
//             <motion.a
//               key={social.name}
//               href={social.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ scale: 1.05, y: -8 }}
//               className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100/50 shadow-lg shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 cursor-pointer overflow-hidden"
//             >
//               {/* Gradient overlay */}
//               <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

//               <div className="relative z-10 flex flex-col items-center text-center space-y-4">
//                 <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg`}>
//                   {(() => {
//                     const Icon = social.icon;
//                     return <Icon className="w-8 h-8 text-white" />;
//                   })()}
//                 </div>

//                 <h3 className="text-xl font-medium text-gray-800">
//                   {social.name}
//                 </h3>
//               </div>
//             </motion.a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
