"use client";
import dynamic from "next/dynamic";

const Helply = dynamic(() => import("./Helply"), { ssr: false });

export default function HelplyWrapper() {
  return <Helply />;
}
