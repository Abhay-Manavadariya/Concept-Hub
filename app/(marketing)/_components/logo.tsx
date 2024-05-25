import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/idea-logo-dark.png"
        height={30}
        width={30}
        className="dark:hidden"
        alt="Logo"
      />
      <Image
        src="/idea-logo-white.png"
        height={30}
        width={30}
        className="hidden dark:block"
        alt="Logo"
      />
      {/* The cn function is often used in React applications to conditionally apply classNames based on certain conditions. 
      It filters out falsy values (like null, undefined, false, etc.) and concatenates the classNames with spaces in between.
      For example, if you have a component and you want to conditionally apply a className based on some condition, you can use 'cn'. */}
      <p className={cn("font-semibold", font.className, "mt-1")}>Concept Hub</p>
    </div>
  );
};

export default Logo;
