// Повторяемая анимация при каждом входе/выходе блока во вьюпорт
import { useEffect, useRef } from "react";

export default function useInViewLoop({ rootMargin = "0px", threshold = 0.2 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
        } else {
          el.classList.remove("in-view");
        }
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return ref;
}
