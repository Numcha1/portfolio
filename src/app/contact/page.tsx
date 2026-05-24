import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details, social links, and QR code resume access."
};

export default function ContactPage() {
  return <ContactSection />;
}
