import { ReactNode } from "react";
import Header from "../component/Shared/Header";
import Footer from "../component/Shared/Footer";
import Container from "../component/Shared/Container";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" space-y-10">
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};


export default CommonLayout