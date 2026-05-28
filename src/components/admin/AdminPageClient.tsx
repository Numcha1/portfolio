"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { ContentAdminPanel } from "@/components/admin/ContentAdminPanel";
import { isSupabaseConfigured, supabase } from "../../../lib/supabase";

type ProjectForm = {
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  imageUrl: string;
};

type ProjectRow = {
  id?: string | number | null;
  title?: string | null;
  description?: string | null;
  techStack?: string[] | string | null;
  tech_stack?: string[] | string | null;
  githubUrl?: string | null;
  github_url?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  createdAt?: string | null;
  created_at?: string | null;
};

type AdminProject = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  imageUrl: string;
  createdAt: number;
};

type MutationResult = {
  error: { message: string } | null;
};

const EMPTY_FORM: ProjectForm = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  imageUrl: ""
};

const toTechString = (value: string[] | string | null | undefined) => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").join(", ");
  }

  if (typeof value === "string") {
    return value;
  }

  return "";
};

const parseTechItems = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const toProjectPayload = (form: ProjectForm, useArrayTechStack: boolean) => {
  const techItems = parseTechItems(form.techStack);

  return {
    title: form.title.trim(),
    description: form.description.trim(),
    tech_stack: useArrayTechStack ? techItems : techItems.join(", "),
    github_url: form.githubUrl.trim(),
    image_url: form.imageUrl.trim()
  };
};

const isTechStackTypeError = (errorMessage: string) => {
  const message = errorMessage.toLowerCase();

  return (
    message.includes("tech_stack") &&
    (message.includes("type") || message.includes("array") || message.includes("text[]"))
  );
};

export const AdminPageClient = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [busyDeleteId, setBusyDeleteId] = useState<string | null>(null);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.createdAt - a.createdAt),
    [projects]
  );

  const loadProjects = useCallback(async () => {
    const client = supabase;

    if (!client) {
      return;
    }

    setIsLoadingProjects(true);
    setErrorText("");

    const { data, error } = await client
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });

    if (error) {
      setErrorText(`Failed to load projects: ${error.message}`);
      setIsLoadingProjects(false);
      return;
    }

    const mapped = ((data ?? []) as ProjectRow[])
      .map((row) => {
        const title = String(row.title ?? "").trim();

        if (!title) {
          return null;
        }

        const createdAtRaw = row.createdAt ?? row.created_at;
        const parsedCreatedAt = createdAtRaw ? Date.parse(createdAtRaw) : NaN;

        return {
          id: String(row.id ?? title),
          title,
          description: String(row.description ?? ""),
          techStack: toTechString(row.techStack ?? row.tech_stack),
          githubUrl: String(row.githubUrl ?? row.github_url ?? ""),
          imageUrl: String(row.imageUrl ?? row.image_url ?? ""),
          createdAt: Number.isNaN(parsedCreatedAt) ? 0 : parsedCreatedAt
        };
      })
      .filter((project): project is AdminProject => project !== null);

    setProjects(mapped);
    setIsLoadingProjects(false);
  }, []);

  useEffect(() => {
    const client = supabase;

    if (!client) {
      setIsBootstrapping(false);
      return;
    }

    let mounted = true;

    const setupSession = async () => {
      const { data, error } = await client.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error) {
        setErrorText(`Failed to read session: ${error.message}`);
      }

      setSession(data.session ?? null);
      setIsBootstrapping(false);
    };

    void setupSession();

    const { data: authListener } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const client = supabase;

    if (!client || !session?.user?.id) {
      setIsAdmin(false);
      setProjects([]);
      setEditingId(null);
      setForm(EMPTY_FORM);
      return;
    }

    let mounted = true;

    const checkAdminAccess = async () => {
      setIsCheckingAdmin(true);
      setErrorText("");

      const { data, error } = await client
        .from("admin_users")
        .select("user_id")
        .eq("user_id", session.user.id)
        .limit(1);

      if (!mounted) {
        return;
      }

      if (error) {
        setIsAdmin(false);
        setIsCheckingAdmin(false);
        setErrorText(
          `Failed to check admin access: ${error.message} (check admin_users table and policies)`
        );
        return;
      }

      const allowed = Array.isArray(data) && data.length > 0;
      setIsAdmin(allowed);
      setIsCheckingAdmin(false);

      if (!allowed) {
        setErrorText("This account does not have admin access");
        return;
      }

      await loadProjects();
    };

    void checkAdminAccess();

    return () => {
      mounted = false;
    };
  }, [loadProjects, session?.user?.id]);

  const signInWithPassword = async () => {
    const client = supabase;

    if (!client) {
      return;
    }

    if (!loginId.trim() || !password.trim()) {
      setErrorText("Please enter ID and password");
      return;
    }

    setErrorText("");
    setNotice("");

    const { error } = await client.auth.signInWithPassword({
      email: loginId.trim(),
      password
    });

    if (error) {
      setErrorText(`Sign in failed: ${error.message}`);
      return;
    }

    setNotice("Signed in");
  };

  const signOut = async () => {
    const client = supabase;

    if (!client) {
      return;
    }

    await client.auth.signOut();
    setNotice("Signed out");
  };

  const runMutationWithTechFallback = async (
    runner: (payload: ReturnType<typeof toProjectPayload>) => PromiseLike<MutationResult>
  ) => {
    let lastError: { message: string } | null = null;

    for (const useArrayTechStack of [false, true]) {
      const payload = toProjectPayload(form, useArrayTechStack);
      const { error } = await runner(payload);

      if (!error) {
        return null;
      }

      lastError = error;

      if (!isTechStackTypeError(error.message)) {
        break;
      }
    }

    return lastError;
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const client = supabase;

    if (!client) {
      return;
    }

    if (!form.title.trim()) {
      setErrorText("Project title is required");
      return;
    }

    setIsSaving(true);
    setErrorText("");
    setNotice("");

    const mutationError = editingId
      ? await runMutationWithTechFallback((payload) =>
          client.from("projects").update(payload).eq("id", editingId)
        )
      : await runMutationWithTechFallback((payload) =>
          client.from("projects").insert(payload)
        );

    if (mutationError) {
      setErrorText(`Save failed: ${mutationError.message}`);
      setIsSaving(false);
      return;
    }

    setNotice(editingId ? "Project updated" : "Project created");
    setIsSaving(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    await loadProjects();
  };

  const startEdit = (project: AdminProject) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubUrl: project.githubUrl,
      imageUrl: project.imageUrl
    });
    setNotice("");
    setErrorText("");
  };

  const removeProject = async (project: AdminProject) => {
    const client = supabase;

    if (!client) {
      return;
    }

    const confirmed = window.confirm(`Delete "${project.title}"?`);

    if (!confirmed) {
      return;
    }

    setBusyDeleteId(project.id);
    setErrorText("");
    setNotice("");

    const { error } = await client.from("projects").delete().eq("id", project.id);

    if (error) {
      setErrorText(`Delete failed: ${error.message}`);
      setBusyDeleteId(null);
      return;
    }

    setNotice("Project deleted");
    setBusyDeleteId(null);

    if (editingId === project.id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
    }

    await loadProjects();
  };

  if (!isSupabaseConfigured || !supabase) {
    return (
      <section className="section-shell">
        <div className="panel space-y-3">
          <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Admin</h1>
          <p className="text-sm text-muted">
            Supabase is not configured (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell">
      <div className="panel space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Projects Admin</h1>
            <p className="mt-1 text-sm text-muted">
              Manage portfolio projects. Only admin accounts can write data.
            </p>
          </div>

          {session ? (
            <button type="button" onClick={signOut} className="btn-secondary">
              Sign Out
            </button>
          ) : null}
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

        {isBootstrapping ? <p className="text-sm text-muted">Loading session...</p> : null}

        {!isBootstrapping && !session ? (
          <div className="max-w-xl space-y-4 rounded-2xl border border-border/70 bg-surfaceAlt/50 p-5">
            <div className="space-y-1">
              <h2 className="font-heading text-lg font-semibold text-white">Sign In</h2>
              <p className="text-sm text-muted">
                Sign in with your admin ID (Supabase email) and password.
              </p>
            </div>

            <form
              className="grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                void signInWithPassword();
              }}
            >
              <input
                className="input"
                type="text"
                placeholder="ID (email)"
                value={loginId}
                onChange={(event) => setLoginId(event.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit" className="btn-primary">
                Sign In
              </button>
            </form>
          </div>
        ) : null}

        {session && isCheckingAdmin ? (
          <p className="text-sm text-muted">Checking admin access...</p>
        ) : null}

        {session && !isCheckingAdmin && !isAdmin ? (
          <div className="rounded-2xl border border-border/70 bg-surfaceAlt/50 p-5 text-sm text-muted">
            Account <span className="text-white">{session.user.email}</span> does not have admin access.
          </div>
        ) : null}

        {session && isAdmin ? (
          <div className="space-y-5">
            <ContentAdminPanel />

            <div className="grid gap-5 lg:grid-cols-[1.05fr,1.4fr]">
              <form
                onSubmit={submitForm}
                className="space-y-3 rounded-2xl border border-border/70 bg-surfaceAlt/50 p-5"
              >
                <h2 className="font-heading text-lg font-semibold text-white">
                  {editingId ? "Edit Project" : "Add Project"}
                </h2>

                <input
                  className="input"
                  placeholder="Project title"
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />

                <textarea
                  className="textarea"
                  placeholder="Description"
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                />

                <input
                  className="input"
                  placeholder="Tech stack (comma separated)"
                  value={form.techStack}
                  onChange={(event) => setForm((prev) => ({ ...prev, techStack: event.target.value }))}
                />

                <input
                  className="input"
                  placeholder="GitHub URL"
                  value={form.githubUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, githubUrl: event.target.value }))}
                />

                <input
                  className="input"
                  placeholder="Image URL or /image.png"
                  value={form.imageUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
                />

                <div className="flex flex-wrap gap-2 pt-1">
                  <button type="submit" className="btn-primary" disabled={isSaving}>
                    {isSaving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                  </button>

                  {editingId ? (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setEditingId(null);
                        setForm(EMPTY_FORM);
                      }}
                    >
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="space-y-3 rounded-2xl border border-border/70 bg-surfaceAlt/50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-heading text-lg font-semibold text-white">Project List</h2>
                  <button type="button" className="btn-secondary" onClick={() => void loadProjects()}>
                    Refresh
                  </button>
                </div>

                {isLoadingProjects ? <p className="text-sm text-muted">Loading projects...</p> : null}

                {!isLoadingProjects && sortedProjects.length === 0 ? (
                  <p className="text-sm text-muted">No projects found in the table.</p>
                ) : null}

                <div className="space-y-3">
                  {sortedProjects.map((project) => (
                    <article key={project.id} className="rounded-xl border border-border/70 bg-surface/60 p-4">
                      <h3 className="font-heading text-base font-semibold text-white">{project.title}</h3>
                      <p className="mt-1 text-sm text-muted">{project.description || "-"}</p>
                      <p className="mt-2 text-xs text-primarySoft">{project.techStack || "-"}</p>
                      <p className="mt-2 truncate text-xs text-muted">{project.githubUrl || "-"}</p>
                      <p className="mt-1 truncate text-xs text-muted">{project.imageUrl || "-"}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" className="btn-secondary" onClick={() => startEdit(project)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => void removeProject(project)}
                          disabled={busyDeleteId === project.id}
                        >
                          {busyDeleteId === project.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
