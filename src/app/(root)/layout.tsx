// import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ReactNode } from "react";

export default function BooklyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex h-screen w-full flex-col">
      <Header />
      <main className="mx-16 my-10 flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
