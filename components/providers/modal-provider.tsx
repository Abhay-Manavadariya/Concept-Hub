"use client";

import { useEffect, useState } from "react";
import SettingsModal from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  //useEffect runs after the component mounts.
  //The empty dependency array ([]) ensures this effect runs only once, when the component mounts.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};

export default ModalProvider;
