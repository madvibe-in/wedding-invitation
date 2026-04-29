import { useEffect, useState } from "react";

export function useFontsReady(): boolean {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!document.fonts?.ready) {
      setFontsReady(true);
      return () => {
        mounted = false;
      };
    }

    document.fonts.ready
      .then(() => {
        if (mounted) {
          setFontsReady(true);
        }
      })
      .catch(() => {
        if (mounted) {
          setFontsReady(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return fontsReady;
}
