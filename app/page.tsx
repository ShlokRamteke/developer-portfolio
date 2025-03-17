"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Code,
  Palette,
  Zap,
  Star,
  Compass,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects, skills } from "@/lib/constats";
import ToggleMenu from "@/components/ToggleMenu";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Custom hook for animations when element is in view
function AnimateWhenVisible({
  children,
  variants,
  className,
}: {
  children: React.ReactNode;
  variants: any;
  className: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  // Function to assign different color classes to skills
  const getSkillTagClass = (index: number) => {
    const classes = [
      "skill-tag-primary",
      "skill-tag-secondary",
      "skill-tag-accent",
    ];
    return classes[index % 3];
  };
  console.log(process.env.NEXT_PUBLIC_RESUME_URL);
  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY_FORM;
    if (accessKey) {
      formData.append("access_key", accessKey);
    } else {
      console.error("Access key is not defined");
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="text-xl font-bold gradient-text">
            Portfolio
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#skills"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Skills
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#projects"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Projects
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </motion.div>
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-primary text-primary hover:bg-primary/10"
              onClick={() =>
                window.open(`${process.env.NEXT_PUBLIC_RESUME_URL}`, "_blank")
              }
            >
              Resume
            </Button>
          </motion.div>
          <div className="md:hidden">
            <ToggleMenu />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 hero-gradient">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Hello, I'm
              </motion.div>
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Shlok Ramteke <br />A Full Stack Developer
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                I specialize in building scalable, responsive, and user-friendly
                web applications using modern technologies like Next.js, React,
                Node.js, and Tailwind CSS.
              </motion.p>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="primary-glow"
                >
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Link href="#contact">Get in touch</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="secondary-glow"
                >
                  <Button
                    variant="outline"
                    asChild
                    className="border-secondary text-secondary hover:bg-secondary/10"
                  >
                    <Link href="#projects">View my work</Link>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="GitHub"
                      className="text-primary hover:bg-primary/10"
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="LinkedIn"
                      className="text-secondary hover:bg-secondary/10"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ID}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Email"
                      className="text-accent hover:bg-accent/10"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden blue-glow-border floating"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="photo.jpeg" // Replace with your profile image URL
                  alt="Shlok Ramteke"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Link href="#about" aria-label="Scroll down">
              <ChevronDown className="h-8 w-8 text-primary" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <AnimateWhenVisible
            variants={fadeIn}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                About Me
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Who I Am
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I'm a full-stack developer with expertise in building scalable
                and efficient web applications. With hands-on experience in
                Next.js, Node.js, and cloud technologies like AWS and Docker, I
                specialize in creating high-performance, user-centric solutions.
                From architecting backend systems with PostgreSQL and MongoDB to
                developing interactive frontends with React and Material-UI, I
                enjoy solving complex problems and optimizing workflows.
                Passionate about clean code and modern development practices, I
                strive to deliver seamless digital experiences.
              </p>
            </div>
          </AnimateWhenVisible>
          <AnimateWhenVisible
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3 mt-12"
          >
            <motion.div
              variants={itemVariant}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center space-y-2 rounded-lg p-6 glass-card primary-glow modern-shadow"
            >
              <motion.div
                className="p-3 bg-primary/20 rounded-full"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(var(--primary), 0.3)",
                }}
              >
                <Code className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold text-primary">Developer</h3>
              <p className="text-center text-muted-foreground">
                I enjoy bringing ideas to life in the browser, creating
                applications that are both functional and beautiful.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariant}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center space-y-2 rounded-lg p-6 glass-card secondary-glow modern-shadow"
            >
              <motion.div
                className="p-3 bg-secondary/20 rounded-full"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(var(--secondary), 0.3)",
                }}
              >
                <Palette className="h-8 w-8 text-secondary" />
              </motion.div>
              <h3 className="text-xl font-bold text-secondary">Designer</h3>
              <p className="text-center text-muted-foreground">
                I value simple, clean design patterns and thoughtful
                interactions that enhance user experience.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariant}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center space-y-2 rounded-lg p-6 glass-card accent-glow modern-shadow"
            >
              <motion.div
                className="p-3 bg-accent/20 rounded-full"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(var(--accent), 0.3)",
                }}
              >
                <Zap className="h-8 w-8 text-accent" />
              </motion.div>
              <h3 className="text-xl font-bold text-accent">Problem Solver</h3>
              <p className="text-center text-muted-foreground">
                I enjoy tackling complex problems and finding elegant solutions
                that meet business needs.
              </p>
            </motion.div>
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 hero-gradient">
        <div className="container px-4 md:px-6">
          <AnimateWhenVisible
            variants={fadeIn}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                My Skills
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Technical Expertise
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I've worked with a variety of technologies and frameworks to
                build modern web applications.
              </p>
            </div>
          </AnimateWhenVisible>
          <AnimateWhenVisible
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariant}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`px-4 py-2 rounded-full text-sm font-medium ${getSkillTagClass(
                  index
                )}`}
              >
                {skill}
              </motion.div>
            ))}
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <AnimateWhenVisible
            variants={fadeIn}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                My Work
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text-alt">
                Featured Projects
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here are some of the projects I've worked on recently.
              </p>
            </div>
          </AnimateWhenVisible>
          <AnimateWhenVisible
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariant}
                whileHover={{
                  y: -10,
                }}
                className={`group relative overflow-hidden rounded-lg glass-card ${project.glowClass} modern-shadow`}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold text-${project.color}`}>
                    {project.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.1 }}
                        className={`inline-flex items-center rounded-full bg-${project.color}/20 border-${project.color}/30 border px-2.5 py-0.5 text-xs font-semibold text-${project.color}`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={project.github} target="_blank">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`gap-1 border-${project.color} text-${project.color} hover:bg-${project.color}/10`}
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={project.live} target="_blank">
                        <Button
                          size="sm"
                          className={`gap-1 bg-${project.color} hover:bg-${project.color}/90`}
                        >
                          {project.icon}
                          Demo
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 hero-gradient">
        <div className="container px-4 md:px-6">
          <AnimateWhenVisible
            variants={fadeIn}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary font-medium">
                Get In Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Contact Me
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or want to discuss potential
                opportunities? Feel free to reach out!
              </p>
            </div>
          </AnimateWhenVisible>
          <AnimateWhenVisible
            variants={scaleUp}
            className="mx-auto max-w-lg mt-12"
          >
            <motion.form
              className="grid gap-6 glass-card p-8 rounded-xl modern-shadow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              onSubmit={onSubmit}
            >
              <motion.div className="grid gap-3" variants={itemVariant}>
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Name
                </label>
                <motion.input
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(var(--primary), 0.3)",
                  }}
                  id="name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your name"
                />
              </motion.div>
              <motion.div className="grid gap-3" variants={itemVariant}>
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <motion.input
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(var(--primary), 0.3)",
                  }}
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                />
              </motion.div>
              <motion.div className="grid gap-3" variants={itemVariant}>
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Message
                </label>
                <motion.textarea
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 2px rgba(var(--primary), 0.3)",
                  }}
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your message"
                />
              </motion.div>
              <motion.div
                variants={itemVariant}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="primary-glow"
              >
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href={process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="GitHub"
                  className="text-primary hover:bg-primary/10"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href={process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="LinkedIn"
                  className="text-secondary hover:bg-secondary/10"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ID}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Email"
                  className="text-accent hover:bg-accent/10"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
