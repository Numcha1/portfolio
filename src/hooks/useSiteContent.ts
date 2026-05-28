"use client";

import { useCallback, useEffect, useState } from "react";

import { DEFAULT_SITE_CONTENT } from "@/data/site";
import { normalizeSiteContent } from "@/lib/siteContent";
import type { SiteContent } from "@/types/siteContent";
import { supabase } from "../../lib/supabase";

const SITE_CONTENT_CACHE_KEY = "portfolio.site.content.cache.v1";
const QUERY_TIMEOUT_MS = 6000;

const readSiteContentCache = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawCache = window.localStorage.getItem(SITE_CONTENT_CACHE_KEY);

    if (!rawCache) {
      return null;
    }

    return normalizeSiteContent(JSON.parse(rawCache));
  } catch {
    return null;
  }
};

const writeSiteContentCache = (content: SiteContent) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(SITE_CONTENT_CACHE_KEY, JSON.stringify(content));
  } catch {
    // Ignore storage errors to keep UI resilient.
  }
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(
    () => readSiteContentCache() ?? DEFAULT_SITE_CONTENT
  );
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!supabase) {
      return;
    }

    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => {
      abortController.abort();
    }, QUERY_TIMEOUT_MS);

    setIsLoading(true);

    try {
      const query = supabase
        .from("site_content")
        .select("content")
        .eq("id", true)
        .limit(1)
        .abortSignal(abortController.signal);
      const { data, error } = await query.maybeSingle();

      if (error) {
        console.error("Supabase site_content query error:", error);
        return;
      }

      if (!data?.content) {
        return;
      }

      const normalized = normalizeSiteContent(data.content);
      setContent(normalized);
      writeSiteContentCache(normalized);
    } catch (err) {
      const isAbortError = err instanceof Error && err.name === "AbortError";

      if (!isAbortError) {
        console.error("Unexpected site content loader error:", err);
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { content, isLoading, refresh };
};
