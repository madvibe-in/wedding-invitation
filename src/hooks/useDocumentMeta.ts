import { useEffect } from "react";
import { wedding } from "../data/weddingData";

const metaContent = {
  title: `${wedding.couple} - ${wedding.date}`,
  description: `Join us to celebrate ${wedding.couple} at ${wedding.venue}, ${wedding.city}.`,
  image: wedding.heroImage
};

function ensureMeta(selector: string, createElement: () => HTMLMetaElement): HTMLMetaElement {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = createElement();
    document.head.appendChild(element);
  }

  return element;
}

export function useDocumentMeta(): void {
  useEffect(() => {
    document.title = metaContent.title;

    const description = ensureMeta('meta[name="description"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      return tag;
    });
    description.setAttribute("content", metaContent.description);

    const ogTitle = ensureMeta('meta[property="og:title"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:title");
      return tag;
    });
    ogTitle.setAttribute("content", metaContent.title);

    const ogDescription = ensureMeta('meta[property="og:description"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:description");
      return tag;
    });
    ogDescription.setAttribute("content", metaContent.description);

    const ogImage = ensureMeta('meta[property="og:image"]', () => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", "og:image");
      return tag;
    });
    ogImage.setAttribute("content", metaContent.image);
  }, []);
}
