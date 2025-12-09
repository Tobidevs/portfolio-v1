"use client";

import { useEffect, useState, useRef } from "react";
import MinecraftAvatar from "./components/MinecraftAvatar";

const splashTexts = [
  "Probably Debugging!",
  "Dabbling in AI!",
  "Probably Reading!",
  "Code like a pro!",
  "Building the future!",
  "Pixel perfect!",
  "Git commit master!",
  "404 sleep not found!",
];

export default function Home() {
  const [splashText, setSplashText] = useState("Building cool stuff!");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Random splash text on mount
    const randomSplash =
      splashTexts[Math.floor(Math.random() * splashTexts.length)];
    setSplashText(randomSplash);

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      if (section.id) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const projects = [
    {
      title: "MavResume: AI-Powered Resume Builder",
      description:
        "An AI guided resume builder for undergraduate engineering students. It combines interactive, course-aware skill recommendations with live previews and instant PDF export, enabling students to create polished, professional resumes effortlessly.",
      tech: ["Next.js", "TypeScript", "Supabase", "Stripe"],
      github: "https://github.com/acmuta/mavresume",
      demo: "",
    },
    {
      title: "Serenity",
      description:
        "Serenity is a modern, comprehensive web application for Bible study, reading, and interactive learning. It offers multi-translation Bible access, interactive quizzes, personalized study plans, and progress tracking to enhance users' spiritual growth and understanding.",
      tech: ["Next.js", "Typescript", "Supabase", "MongoDB"],
      github: "https://github.com/tobidevs/serenity",
      demo: "serenity-kohl-tau.vercel.app",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media management with data visualization, scheduling capabilities, and multi-platform integration. Features real-time metrics and insights.",
      tech: ["Next.js", "Firebase", "Chart.js", "Tailwind CSS"],
      github: "",
      demo: "",
    },
    {
      title: "Woven E-commerce Platform",
      description:
        "Woven E-Commerce is a modern full-stack online store for Christian apparel, built with Next.js, TypeScript, and Tailwind CSS. It features secure authentication with Clerk, seamless Stripe payments, and a responsive, user-friendly interface.",
      tech: ["React", "Stripe", "Clerk", "Node.js", "Express"],
      github: "https://github.com/tobidevs/woven-ecom",
      demo: "https://woven-ecom.vercel.app",
    },
    {
      title: "Recipe Sharing Platform",
      description:
        "Community-driven recipe platform with user authentication, recipe ratings, meal planning features, and grocery list generation. Includes search and filtering capabilities.",
      tech: ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
      github: "https://github.com/example/recipes",
      demo: "https://recipes-demo.example.com",
    },
    {
      title: "Fitness Tracker",
      description:
        "Comprehensive fitness tracking application with workout logging, progress visualization, and goal setting. Features exercise database and workout templates.",
      tech: ["React Native", "Firebase", "Recharts", "Expo"],
      github: "https://github.com/",
      demo: "",
    },
  ];

  const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Python",
    "Supabase",
    "Firebase",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "Git",
    "Docker",
    "AWS",
    "GraphQL",
    "REST APIs",
    "Prisma",
    "Express.js",
    "React Native",
    "Web3.js",
  ];

  const experience = [
    {
      company: "Clozure Inc.",
      role: "Software Engineer Intern",
      period: "June 2025 - November 2025",
      bulletPoints: [
        "Developed and reviewed production-level code using Flutter, Firebase, Python, and Dart, contributing to features deployed to end users on a weekly release cycle.",
        "Collaborated with senior engineers to debug, test, and optimize application functionality, achieving a less than 5% bug rate for new feature releases.",
        "Leveraged Jira, Figma, and GitHub to coordinate sprints, track development progress, and facilitate cross-functional collaboration between engineering and design teams.",
      ],
    },
    {
      company: "ACM Create at UTA",
      role: "Technical Director - Software Engineering Committee",
      period: "August 2025 - Present",
      bulletPoints: [
        "Directed 4 Project Managers and 30+ Student Engineers in delivering 4 Production-Quality aplications with a combined user base of 1,000+ students and campus organizations.",
        "Mentored 4 Project Managers in Scoping, Leadership, and Technical Execution, resulting in 100% of teams delivering production-ready projects each semester.",
        "Oversaw delivery of 4 Full-Stack, Mobile, Backend, and API Projects, creating real-world engineering opportunities for 30+ Students across multiple majors.",
      ],
    },
    {
      company: "Pioneer Investing Inc.",
      role: "Software Engineer Intern",
      period: "May 2025 - July 2025",
      bulletPoints: [
        "Built and optimized Full Stack web applications using Next.js, TypeScript, and Node.js, delivering features from concept to production within weekly sprint cycles.",
        "Integrated AWS services (Lambda, S3, DynamoDB) to implement scalable backend APIs, improve load times by 30%, and enhance application reliability.",
        "Applied best practices in CI/CD and cloud deployment, streamlining the release process and ensuring high availability for production applications.",
      ],
    },
    {
      company: "Zexu Studio (Freelance business)",
      role: "Freelance Full Stack Developer",
      period: "January 2025 - June 2025",
      bulletPoints: [
        "Designed, developed, and maintained Full Stack websites for local churches and small businesses, improving their online visibility and increasing user engagement by 40% on average.",
        "Integrated third-party tools like Google/Vercel Analytics, Stripe, and Mailchimp while developing Mobile-First UIs using Next Js, React Native, achieving 100% responsiveness across devices.",
        "Optimized websites for local SEO, increasing organic traffic by 25%+ and improving search visibility on Google Maps and local directories. streamlining online engagement and increasing conversions by 45%.",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
<video
  ref={videoRef}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
  onError={(e) => {
    console.error("Video failed to load:", e);
  }}
  onLoadedData={() => {
    console.log("Video loaded successfully");
  }}
>
  <source src="/MinecraftBackground.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

      {/* Hero Section */}
      <section
        id="hero"
        className="section min-h-screen flex items-center justify-center"
      >
        <div className="text-center relative inline-block px-8 md:px-12 lg:px-16">
          <h1 className="minecraft-title text-6xl md:text-7xl lg:text-8xl mb-4 relative">
            TOBI&apos;S PORTFOLIO
          </h1>
          <p
            className="splash-text text-base md:text-lg lg:text-xl xl:text-2xl absolute whitespace-nowrap pointer-events-none"
            style={{
              transform: "rotate(-18deg)",
              transformOrigin: "left center",
              top: "90%",
              right: "-5%",
              zIndex: 10,
            }}
          >
            {splashText}
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-4 w-full max-w-xs">
          <button
            className="mc-button"
            onClick={() => scrollToSection("experience")}
          >
            Experience
          </button>
          <button
            className="mc-button"
            onClick={() => scrollToSection("projects")}
          >
            View Projects
          </button>
          <button
            className="mc-button"
            onClick={() => scrollToSection("tech-stack")}
          >
            Tech Stack
          </button>
          <button
            className="mc-button"
            onClick={() => scrollToSection("about")}
          >
            About Me
          </button>
          <button onClick={toggleMute} className="mc-button">
            {isMuted ? "Click for Nostalgia!" : "Mute"}
          </button>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center gap-3 w-full max-w-xs">
          <a
            href="https://linkedin.com/in/tobiakere"
            target="_blank"
            rel="noopener noreferrer"
            className="mc-button-small"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/tobidevs"
            target="_blank"
            rel="noopener noreferrer"
            className="mc-button-small"
          >
            GitHub
          </a>
          <a
            href="/TobiResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mc-button-small"
          >
            Resume
          </a>
          <a href="mailto:tobiakere50@gmail.com" className="mc-button-small">
            Email
          </a>
        </div>

        <div className="absolute right-5 top-50 flex flex-col h-fit lg:flex lg:flex-1 lg:items-center lg:justify-center lg:pr-8 xl:pr-16 mt-8 lg:mt-0">
          <h1 className="bg-black/50 text-center absolute right-55 top-34 text-3xl">Oluwatobi Akere <span className="block text-xl text-gray-400">Software Engineer</span></h1>
          <MinecraftAvatar
            skinUrl="/minecraft-skin.png"
            bodyUrl="/minecraft-body.png"
            size={600}
          />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="section-title">Experience</h2>
          <div
            className={`space-y-6 fade-in ${
              visibleSections.has("experience") ? "visible" : ""
            }`}
          >
            {experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3
                    className="text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-minecraft-title)" }}
                  >
                    {exp.role}
                  </h3>
                  <span className="text-yellow-300 font-bold text-lg">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-xl text-green-300 mb-2 font-semibold">
                  {exp.company}
                </h4>
                {exp.bulletPoints.map((point, pointIndex) => (
                  <p
                    key={pointIndex}
                    className="text-gray-300 mb-2 leading-relaxed"
                  >
                    • {point}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="section-title">View Projects</h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in ${
              visibleSections.has("projects") ? "visible" : ""
            }`}
          >
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3
                  className="text-2xl font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-minecraft-title)" }}
                >
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="tech-badge text-sm text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mc-button text-sm py-2 px-4 flex-1 text-center"
                    style={{ maxWidth: "none" }}
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mc-button text-sm py-2 px-4 flex-1 text-center"
                    style={{ maxWidth: "none" }}
                  >
                    Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="section bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="section-title">Tech Stack</h2>
          <div
            className={`flex flex-wrap justify-center gap-3 fade-in ${
              visibleSections.has("tech-stack") ? "visible" : ""
            }`}
          >
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="tech-badge text-white text-lg px-6 py-3"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="section bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="section-title">About Me</h2>
          <div
            className={`bg-black/60 backdrop-blur-sm border-4 border-green-600 p-8 md:p-12 fade-in ${
              visibleSections.has("about") ? "visible" : ""
            }`}
            style={{
              borderImage:
                "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.6) 100%) 1",
            }}
          >
            <div className="space-y-4 text-lg text-gray-200 leading-relaxed">
              <p>
                Hello! I&apos;m Tobi, a passionate full-stack developer with a
                love for crafting beautiful and functional web applications. My
                journey in software development started with curiosity and has
                evolved into a career focused on building innovative solutions
                that make a difference.
              </p>
              <p>
                I specialize in modern web technologies, particularly the React
                ecosystem and serverless architectures. I enjoy the challenge of
                turning complex problems into elegant, maintainable code.
                Whether it&apos;s building responsive user interfaces, designing
                scalable backend systems, or optimizing application performance,
                I bring attention to detail and a commitment to quality to every
                project.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community. I believe in continuous
                learning and staying up-to-date with industry best practices and
                emerging trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="section-title">Contact</h2>
          <div
            className={`bg-black/60 backdrop-blur-sm border-4 border-green-600 p-8 md:p-12 fade-in ${
              visibleSections.has("contact") ? "visible" : ""
            }`}
            style={{
              borderImage:
                "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.6) 100%) 1",
            }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-white mb-2 text-lg font-semibold"
                  style={{ fontFamily: "var(--font-minecraft-regular)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mc-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-white mb-2 text-lg font-semibold"
                  style={{ fontFamily: "var(--font-minecraft-regular)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mc-input"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-white mb-2 text-lg font-semibold"
                  style={{ fontFamily: "var(--font-minecraft-regular)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mc-textarea"
                  placeholder="Your message here..."
                />
              </div>
              <button type="submit" className="mc-button w-full max-w-none">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
