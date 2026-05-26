import type { Metadata } from "next";

import { AdminPageClient } from "@/components/admin/AdminPageClient";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage projects data with authenticated admin access."
};

export default function AdminPage() {
  return <AdminPageClient />;
}
