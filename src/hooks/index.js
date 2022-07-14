import { useEffect } from "react";

const useDisableBodyScroll = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);
};

const useKeypress = (key, show, action) => {
  useEffect(() => {
    const onKeyDown = (e) => e.key === key && show && action();
    document.body.addEventListener("keydown", onKeyDown);
    return () => document.body.removeEventListener("keydown", onKeyDown);
  });
};

export { useDisableBodyScroll, useKeypress };
