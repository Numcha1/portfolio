"use client";

import { useEffect, useMemo, useState } from "react";

import { normalizeSiteContent } from "@/lib/siteContent";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { SiteContent } from "@/types/siteContent";
import { supabase } from "../../../lib/supabase";

type ContentForm = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  navLinksText: string;
  socialLinksText: string;
  aboutIntro: string;
  aboutPointsText: string;
  skillGroupsText: string;
  experienceItemsText: string;
  highlightsText: string;
};

const toLines = (items: string[]) => items.join("\n");

const contentToForm = (content: SiteContent): ContentForm => ({
  name: content.siteConfig.name,
  role: content.siteConfig.role,
  tagline: content.siteConfig.tagline,
  description: content.siteConfig.description,
  email: content.siteConfig.email,
  phone: content.siteConfig.phone,
  location: content.siteConfig.location,
  resumeUrl: content.siteConfig.resumeUrl,
  navLinksText: content.navLinks.map((item) => `${item.label}|${item.href}`).join("\n"),
  socialLinksText: content.socialLinks.map((item) => `${item.label}|${item.href}`).join("\n"),
  aboutIntro: content.aboutIntro,
  aboutPointsText: toLines(content.aboutPoints),
  skillGroupsText: content.skillGroups
    .map((group) => `${group.title}|${group.skills.join(", ")}`)
    .join("\n"),
  experienceItemsText: toLines(content.experienceItems),
  highlightsText: content.highlights.map((item) => `${item.label}|${item.value}`).join("\n")
});

const parseListLines = (text: string) =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const parsePairLines = (text: string) =>
  parseListLines(text)
    .map((line) => {
      const [left, ...rest] = line.split("|");
      const right = rest.join("|");

      return {
        left: left?.trim() ?? "",
        right: right.trim()
      };
    })
    .filter((item) => item.left && item.right);

const formToContent = (form: ContentForm): SiteContent => {
  const raw = {
    siteConfig: {
      name: form.name,
      role: form.role,
      tagline: form.tagline,
      description: form.description,
      email: form.email,
      phone: form.phone,
      location: form.location,
      resumeUrl: form.resumeUrl
    },
    navLinks: parsePairLines(form.navLinksText).map((item) => ({
      label: item.left,
      href: item.right
    })),
    socialLinks: parsePairLines(form.socialLinksText).map((item) => ({
      label: item.left,
      href: item.right
    })),
    aboutIntro: form.aboutIntro,
    aboutPoints: parseListLines(form.aboutPointsText),
    skillGroups: parsePairLines(form.skillGroupsText).map((item) => ({
      title: item.left,
      skills: item.right
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    })),
    experienceItems: parseListLines(form.experienceItemsText),
    highlights: parsePairLines(form.highlightsText).map((item) => ({
      label: item.left,
      value: item.right
    }))
  };

  return normalizeSiteContent(raw);
};

export const ContentAdminPanel = () => {
  const { content, refresh } = useSiteContent();
  const [form, setForm] = useState<ContentForm>(() => contentToForm(content));
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorText, setErrorText] = useState("");

  const contentFingerprint = useMemo(() => JSON.stringify(content), [content]);

  useEffect(() => {
    if (isDirty) {
      return;
    }

    setForm(contentToForm(content));
  }, [contentFingerprint, content, isDirty]);

  const onFieldChange = (key: keyof ContentForm, value: string) => {
    setIsDirty(true);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveContent = async () => {
    if (!supabase) {
      return;
    }

    setIsSaving(true);
    setErrorText("");
    setNotice("");

    const nextContent = formToContent(form);
    const { error } = await supabase.from("site_content").upsert(
      {
        id: true,
        content: nextContent,
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );

    if (error) {
      setErrorText(`Save content failed: ${error.message}`);
      setIsSaving(false);
      return;
    }

    setNotice("Site content updated");
    setIsSaving(false);
    setIsDirty(false);
    await refresh();
  };

  return (
    <section className="space-y-3 rounded-2xl border border-border/70 bg-surfaceAlt/50 p-5">
      <div className="space-y-1">
        <h2 className="font-heading text-lg font-semibold text-white">Site Content</h2>
        <p className="text-sm text-muted">Edit all core website text and links from here.</p>
      </div>

      {notice ? (
        <div className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primarySoft">
          {notice}
        </div>
      ) : null}

      {errorText ? (
        <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorText}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(event) => onFieldChange("name", event.target.value)}
        />
        <input
          className="input"
          placeholder="Role"
          value={form.role}
          onChange={(event) => onFieldChange("role", event.target.value)}
        />
      </div>

      <input
        className="input"
        placeholder="Tagline"
        value={form.tagline}
        onChange={(event) => onFieldChange("tagline", event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="Site description"
        value={form.description}
        onChange={(event) => onFieldChange("description", event.target.value)}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(event) => onFieldChange("email", event.target.value)}
        />
        <input
          className="input"
          placeholder="Phone"
          value={form.phone}
          onChange={(event) => onFieldChange("phone", event.target.value)}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input"
          placeholder="Location"
          value={form.location}
          onChange={(event) => onFieldChange("location", event.target.value)}
        />
        <input
          className="input"
          placeholder="Resume URL"
          value={form.resumeUrl}
          onChange={(event) => onFieldChange("resumeUrl", event.target.value)}
        />
      </div>

      <textarea
        className="textarea"
        placeholder={"Nav links: one per line, format Label|Href\nExample: Home|/#home"}
        value={form.navLinksText}
        onChange={(event) => onFieldChange("navLinksText", event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder={"Social links: one per line, format Label|URL\nExample: GitHub|https://github.com/you"}
        value={form.socialLinksText}
        onChange={(event) => onFieldChange("socialLinksText", event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="About intro"
        value={form.aboutIntro}
        onChange={(event) => onFieldChange("aboutIntro", event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder={"About points: one point per line"}
        value={form.aboutPointsText}
        onChange={(event) => onFieldChange("aboutPointsText", event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder={"Skill groups: one line per group, format Group|skill1, skill2, skill3"}
        value={form.skillGroupsText}
        onChange={(event) => onFieldChange("skillGroupsText", event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="Experience items: one line per item"
        value={form.experienceItemsText}
        onChange={(event) => onFieldChange("experienceItemsText", event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder={"Highlights: one per line, format Label|Value\nExample: Projects Built|12+"}
        value={form.highlightsText}
        onChange={(event) => onFieldChange("highlightsText", event.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" disabled={isSaving} onClick={() => void saveContent()}>
          {isSaving ? "Saving..." : "Save Site Content"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setForm(contentToForm(content));
            setIsDirty(false);
            setNotice("");
            setErrorText("");
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
};
