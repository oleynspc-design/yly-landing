import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Offer from "./components/Offer";
import Community from "./components/Community";
import About from "./components/About";
import ChatBotSection from "./components/ChatBotSection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import { redirect } from "next/navigation";
import { getCurrentUser, isAuthConfigured } from "@/lib/auth";

export default async function Home() {
  if (isAuthConfigured()) {
    const user = await getCurrentUser();

    if (user) {
      redirect(
        user.trainingAccessStatus === "granted" && user.trainingAccessScope === "all"
          ? "/szkolenie"
          : "/ograniczony-dostep"
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#080808]">
      <Navbar />
      <Hero />
      <Mission />
      <Offer />
      <Community />
      <About />
      <ChatBotSection />
      <CTA />
      <Footer />
    </main>
  );
}
