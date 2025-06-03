import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMagneticEffect(strength: number = 30) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouse = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
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
