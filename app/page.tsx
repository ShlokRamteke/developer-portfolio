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
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationControls,
} from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, skills, socialLinks } from "@/lib/constats";
import ToggleMenu from "@/components/ToggleMenu";

import { useTheme } from "next-themes";

import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/ThemeToggle";

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
      staggerChildren: 0.1,
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

// Text reveal animation
const textReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
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

// Magnetic effect hook
function useMagneticEffect(strength = 30) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouse = (e: any) => {
    const { clientX, clientY } = e;
    const element = ref.current;
    if (!element) return;

    const rect = element?.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX / strength);
    y.set(distanceY / strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, xSpring, ySpring, handleMouse, handleMouseLeave };
}

// Text reveal component
function TextReveal({ text, className }: { text: string; className: string }) {
  return (
    <motion.div
      variants={textReveal}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Particle background component
function ParticleBackground() {
  const { theme } = useTheme();

  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
  }

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = Math.min(window.innerWidth / 10, 100);

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 2, // Size between 2-5px
          speed: Math.random() * 5 + 0.3, // Increased speed range from 0.3-1.8
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);

    return () => window.removeEventListener("resize", generateParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            //backgroundColor: `rgba(67, 97, 238, 0.4)`,
            //boxShadow: "0 0 8px 4px rgba(67, 97, 238, 0.4)",
            borderRadius: "50%",
            backgroundColor:
              theme === "dark"
                ? `rgba(255, 255, 255, 0.15)`
                : `rgba(67, 97, 238, 0.4)`,
          }}
          animate={{
            // y: ["0%", "100%"],
            // opacity: [0.4, 0.8, 0.4],
            y: ["-10%", "110%"],
            opacity: [0, 0.8, 0],
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
          }}
          transition={{
            duration: 10 / particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// Geometric shapes component
function GeometricShapes() {
  const shapes = [
    { type: "circle", size: 100, x: "10%", y: "20%", color: "var(--primary)" },
    { type: "square", size: 80, x: "80%", y: "15%", color: "var(--secondary)" },
    { type: "triangle", size: 120, x: "70%", y: "60%", color: "var(--accent)" },
    { type: "circle", size: 150, x: "20%", y: "70%", color: "var(--primary)" },
    { type: "square", size: 60, x: "40%", y: "30%", color: "var(--secondary)" },
    { type: "circle", size: 90, x: "85%", y: "85%", color: "var(--accent)" },
    {
      type: "triangle",
      size: 70,
      x: "15%",
      y: "40%",
      color: "var(--secondary)",
    },
    { type: "square", size: 110, x: "60%", y: "80%", color: "var(--primary)" },
    { type: "circle", size: 130, x: "30%", y: "10%", color: "var(--accent)" },
    { type: "triangle", size: 95, x: "50%", y: "50%", color: "var(--primary)" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`geometric-shape ${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: `hsl(${shape.color})`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Scroll progress indicator
function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return <motion.div className="scroll-indicator" style={{ scaleX }} />;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Function to assign different color classes to skills
  const getSkillTagClass = (index: number) => {
    const classes = [
      "skill-tag-primary",
      "skill-tag-secondary",
      "skill-tag-accent",
    ];
    return classes[index % 3];
  };

  // Magnetic effect for buttons
  const primaryBtn = useMagneticEffect(15);
  const secondaryBtn = useMagneticEffect(15);

  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Hi I am Shlok Ramteke,<br />a Full Stack Developer";

  useEffect(() => {
    setMounted(true);

    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypewriterText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);

    return () => clearInterval(typing);
  }, []);

  // Animated skill tags
  const skillControls = useAnimationControls();

  useEffect(() => {
    const animateSkills = async () => {
      await skillControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 2, ease: "easeInOut" },
      });
      setTimeout(animateSkills, Math.random() * 5000 + 2000);
    };

    animateSkills();
  }, [skillControls]);

  const [result, setResult] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY_FORM;
    if (!accessKey) {
      console.error("Access key is not defined");
      setResult("Error: Form configuration is missing");
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("from_name", name as string);
    formData.append("reply_to", email as string);
    formData.append("message", message as string);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! I'll get back to you soon.");
        event.target.reset();
      } else {
        console.error("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Failed to send message. Please try again later.");
    }
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 theme-transition">
      <ScrollProgressIndicator />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b theme-transition"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="text-xl font-bold gradient-text">
            Portfolio
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {["About", "Skills", "Projects", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
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
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 hero-gradient overflow-hidden theme-transition">
        <ParticleBackground />
        <GeometricShapes />
        <motion.div
          className="container px-4 md:px-6 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
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
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span
                  className="typewriter gradient-text"
                  dangerouslySetInnerHTML={{ __html: typewriterText }}
                />
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
                  ref={primaryBtn.ref}
                  style={{
                    transform: `translate(${primaryBtn.xSpring}px, ${primaryBtn.ySpring}px)`,
                  }}
                  onMouseMove={primaryBtn.handleMouse}
                  onMouseLeave={primaryBtn.handleMouseLeave}
                  className="primary-glow"
                >
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white shine text-primary-foreground"
                  >
                    <Link href="#contact">Get in touch</Link>
                  </Button>
                </motion.div>
                <motion.div
                  ref={secondaryBtn.ref}
                  style={{
                    transform: `translate(${secondaryBtn.xSpring}px, ${secondaryBtn.ySpring}px)`,
                  }}
                  onMouseMove={secondaryBtn.handleMouse}
                  onMouseLeave={secondaryBtn.handleMouseLeave}
                  className="secondary-glow"
                >
                  <Button
                    variant="outline"
                    asChild
                    className="border-secondary text-secondary hover:bg-secondary/10 shine"
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
                {/* <motion.div
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
                </motion.div> */}
                <motion.div
                  className="flex items-center gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  {socialLinks.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.1 + index * 0.1,
                        duration: 0.3,
                        type: "spring",
                      }}
                    >
                      <Link
                        href={item.href || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={
                            item?.href?.split("://")[1]?.split(".")[0] ||
                            "Email"
                          }
                          className={`text-${item.color} hover:bg-${item.color}/10`}
                        >
                          {item.icon}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                  {/* <motion.div
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
                </motion.div> */}
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
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 md:py-24 bg-muted/50 relative theme-transition"
      >
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
            {" "}
            {[
              {
                icon: <Code className="h-8 w-8 text-primary" />,
                title: "Developer",
                description:
                  "I enjoy bringing ideas to life in the browser, creating applications that are both functional and beautiful.",
                color: "primary",
                glowClass: "primary-glow",
              },
              {
                icon: <Palette className="h-8 w-8 text-secondary" />,
                title: "Designer",
                description:
                  "I value simple, clean design patterns and thoughtful interactions that enhance user experience.",
                color: "secondary",
                glowClass: "secondary-glow",
              },
              {
                icon: <Zap className="h-8 w-8 text-accent" />,
                title: "Problem Solver",
                description:
                  "I enjoy tackling complex problems and finding elegant solutions that meet business needs.",
                color: "accent",
                glowClass: "accent-glow",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariant}
                whileHover={{ y: -10 }}
                className={`flex flex-col items-center space-y-2 rounded-lg p-6 glass-card ${item.glowClass} modern-shadow tilt theme-transition`}
              >
                <motion.div
                  className={`p-3 bg-${item.color}/20 rounded-full`}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: `rgba(var(--${item.color}), 0.3)`,
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className={`text-xl font-bold text-${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-center text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
            {/* <motion.div
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
            </motion.div> */}
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-16 md:py-24 hero-gradient relative theme-transition"
      >
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
                animate={skillControls}
                custom={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${getSkillTagClass(
                  index
                )} theme-transition`}
              >
                {skill}
              </motion.div>
            ))}
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-16 md:py-24 bg-muted/50 relative theme-transition"
      >
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
                className={`group relative overflow-hidden rounded-lg glass-card ${project.glowClass} modern-shadow theme-transition`}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="p-4 text-white">
                        <p className="font-medium">View Project</p>
                      </div>
                    </motion.div>
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
                          className={`gap-1 bg-${project.color} hover:bg-${project.color}/90 text-${project.color}-foreground`}
                        >
                          {/* {project.icon} */}
                          <ExternalLink className="h-4 w-4" />
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
      <section
        id="contact"
        className="py-16 md:py-24 hero-gradient relative theme-transition"
      >
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
              className="grid gap-6 glass-card p-8 rounded-xl modern-shadow theme-transition"
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
                  name="name"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 theme-transition"
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
                  name="email"
                  type="email"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 theme-transition"
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
                  name="message"
                  required
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your message"
                />
              </motion.div>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm font-medium ${
                    result.includes("success") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {result}
                </motion.div>
              )}
              <motion.div
                variants={itemVariant}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="primary-glow"
              >
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 shine text-primary-foreground"
                >
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </AnimateWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 theme-transition">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={item.href || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={
                      item?.href?.split("://")[1]?.split(".")[0] || "Email"
                    }
                    className={`text-${item.color} hover:bg-${item.color}/10`}
                  >
                    {item.icon}
                  </Button>
                </Link>
              </motion.div>
            ))}
            {/* <motion.div
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
            </motion.div> */}
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
