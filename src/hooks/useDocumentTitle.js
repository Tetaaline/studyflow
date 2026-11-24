import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | StudyFlow`;
  }, [title]);
}
