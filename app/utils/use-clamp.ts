import { ElementRef, useState, useEffect } from "react";

/**
 * Hook to check if an element is clamped
 * @param ref React ref of the element to check
 * @returns isClamped boolean
 */
export function useClamp(ref: React.RefObject<ElementRef<"p">>) {
  const [isClamped, setIsClamped] = useState(false);

  const checkForClamp = () => {
    const element = ref.current;
    if (element) {
      setIsClamped(element.scrollHeight > element.clientHeight);
    }
  };

  useEffect(() => {
    checkForClamp();
    window.addEventListener("resize", checkForClamp);

    return () => window.removeEventListener("resize", checkForClamp);
  }, []);

  return { isClamped };
}
