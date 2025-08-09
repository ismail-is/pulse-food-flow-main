import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData(initialFormState);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center">
      <section className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#01461F] dark:text-white mb-4">
          Get in touch
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          We'd love to hear from you. Fill out the form below and we'll respond within 24&nbsp;hours.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-[#01461F]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 4.5l1.818 1.819a2.25 2.25 0 01.603 2.134 18.094 18.094 0 007.371 7.371 2.25 2.25 0 012.134.603l1.819 1.818a1.125 1.125 0 01-.317 1.799 8.438 8.438 0 01-2.592.86C6.118 21 3 13.5 3 9.937c0-.907.31-1.79.86-2.591a1.125 1.125 0 011.39-.346z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-[#01461F] dark:text-white">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+91&nbsp;98765&nbsp;43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-[#01461F]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 7.5v9a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-9m0-1.125A1.125 1.125 0 016.375 5.25h11.25A1.125 1.125 0 0118.75 6.375v.51l-6.75 4.5-6.75-4.5v-.51z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-[#01461F] dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">contact@pulsefoodflow.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-[#01461F]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75c-2.485 0-4.5 2.014-4.5 4.5a4.497 4.497 0 002.293 3.934C10.682 18.176 12 21.75 12 21.75s1.318-3.574 2.207-6.566A4.5 4.5 0 0016.5 11.25c0-2.486-2.015-4.5-4.5-4.5z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v.008h.008V11.25H12z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-[#01461F] dark:text-white">Address</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  123, Pulse Street, Mangalore, Karnataka&nbsp;–&nbsp;575001
                </p>
              </div>
            </div>

            <iframe
              title="Pulse Food Flow Location"
              src="https://maps.google.com/maps?q=12.9204,74.8560&z=14&amp;output=embed"
              className="rounded-2xl h-64 w-full border-none shadow-lg dark:shadow-[#01461F]/40"
              loading="lazy"
            ></iframe>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#01461F] dark:text-gray-200 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/40 text-[#01461F] dark:text-white focus:ring-[#01461F] focus:border-[#01461F]"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#01461F] dark:text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/40 text-[#01461F] dark:text-white focus:ring-[#01461F] focus:border-[#01461F]"
                  placeholder="you@example.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-[#01461F] dark:text-gray-200 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/40 text-[#01461F] dark:text-white focus:ring-[#01461F] focus:border-[#01461F]"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-[#01461F] dark:text-gray-200 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/40 text-[#01461F] dark:text-white focus:ring-[#01461F] focus:border-[#01461F] resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 w-full inline-flex justify-center items-center rounded-lg border border-transparent py-3 px-6 text-base font-medium text-white bg-[#01461F] hover:bg-[#013b19] active:scale-[.98] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01461F] disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-center text-green-600 dark:text-green-400">
                Thanks for reaching out! We'll be in touch shortly.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-red-600 dark:text-red-400">
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
