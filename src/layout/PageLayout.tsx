import { type ReactNode } from "react";
import Navbar from "../components/Navbar";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="mt-20">{children}</div>
    </>
  );
};

export default PageLayout;
