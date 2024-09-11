import { useEffect } from 'react';
import gsap from 'gsap';

export const useFadeInEffect = (ref, delay = 0) => {
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 1, delay });
  }, [ref, delay]);
};
