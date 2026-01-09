import { ReactNode } from "react";

const Container = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`max-w-[1420px] px-2 mx-auto ${className || ""} `}>
      {children}
    </div>
  );
};

export default Container;
