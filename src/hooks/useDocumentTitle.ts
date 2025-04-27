import { useEffect } from "react";

const useDocumentTitle = (title: string | undefined | null) => {
  useEffect(() => {
    document.title = `VK Маруся | ${title}`;
  }, [title]);
};

export default useDocumentTitle;