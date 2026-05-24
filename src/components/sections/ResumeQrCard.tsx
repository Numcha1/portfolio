"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

import { SITE_CONFIG } from "@/data/site";

export const ResumeQrCard = () => {
  return (
    <div className="rounded-2xl border border-border/70 bg-surfaceAlt/70 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primarySoft">Resume QR</p>
      <p className="mt-2 text-sm text-muted">Scan to open downloadable resume instantly.</p>

      <div className="mt-4 inline-flex rounded-2xl bg-white p-3 shadow-soft">
        <QRCodeSVG value={SITE_CONFIG.resumeUrl} size={140} />
      </div>

      <div className="mt-4">
        <Link
          href={SITE_CONFIG.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary w-full"
        >
          Open Resume
        </Link>
      </div>
    </div>
  );
};
