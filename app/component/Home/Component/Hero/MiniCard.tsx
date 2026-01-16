import { ReactNode } from "react";

const MiniCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="group rounded-2xl bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      {children}
    </div>
  );
}


export default MiniCard