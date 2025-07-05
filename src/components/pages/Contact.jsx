import React, { useRef, useState } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_pjwd02b",
        "template_oa8jicg",
        form.current,
        "NCqGshcROOu6Dg7TR"
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
        }
      );
  };

  return (
    <section className="py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#8b3dff] to-[#e84aff] bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-gray-400 text-lg mt-2">
          Have a project in mind or want to collaborate? Let’s connect!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Form */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Send a message</h3>
          <p className="text-gray-400 mb-6">
            Fill out the form and I’ll reply shortly.
          </p>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full bg-[#0e101c] text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:border-[#8b3dff]"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              required
              className="w-full bg-[#0e101c] text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:border-[#8b3dff]"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full bg-[#0e101c] text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:border-[#8b3dff]"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your message..."
              required
              className="w-full bg-[#0e101c] text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:border-[#8b3dff]"
            ></textarea>

            <input
              type="hidden"
              name="to_email"
              value="saurabhkhare893@gmail.com"
            />

            <button
              type="submit"
              className="w-full bg-[#8b3dff] hover:bg-[#a54dff] text-white p-3 rounded-md font-semibold shadow-md transition"
            >
              Send Message ✉️
            </button>

            {success && (
              <p className="text-green-400 pt-2">Message sent successfully!</p>
            )}
          </form>
        </div>

        {/* Socials */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Connect with me</h3>
          <p className="text-gray-400 mb-6">
            Reach out through these platforms:
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 bg-[#0e101c] p-4 rounded-lg border border-gray-700">
              <Github className="text-purple-400" />
              <a
                href="https://github.com/saurabh-develop"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                github.com/saurabh-develop
              </a>
            </li>
            <li className="flex items-center gap-4 bg-[#0e101c] p-4 rounded-lg border border-gray-700">
              <Linkedin className="text-purple-400" />
              <a
                href="https://www.linkedin.com/in/saurabhkhare/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/saurabhkhare/
              </a>
            </li>
            <li className="flex items-center gap-4 bg-[#0e101c] p-4 rounded-lg border border-gray-700">
              <Mail className="text-purple-400" />
              <a
                href="mailto:saurabhkhare893@gmail.com"
                className="hover:underline"
              >
                saurabhkhare893@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
