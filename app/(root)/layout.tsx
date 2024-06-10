import { Metadata } from "next";
import { Urbanist } from "next/font/google"

import Footer from "@/components/footer";
import Navbar from "@/components/user/navbar";
import { ModalProvider } from "@/providers/user/modal-provider";

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Store",
    description: "For store",
  };

export default function HomepageLayout({
    children
} : {
    children: React.ReactNode
}) {

    return (
        <>
            <ModalProvider />
            <div className={font.className}>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer></Footer>
            </div>
        </>
    )
}