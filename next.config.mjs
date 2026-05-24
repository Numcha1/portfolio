/** @type {import('next').NextConfig} */
const getSupabaseHostname = () => {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!rawUrl) {
    return null;
  }

  try {
    return new URL(rawUrl).hostname;
  } catch {
    return null;
  }
};

const supabaseHostname = getSupabaseHostname();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      },
      ...(supabaseHostname
        ? [
            {
              protocol: "https",
              hostname: supabaseHostname
            }
          ]
        : [])
    ]
  }
};

export default nextConfig;
