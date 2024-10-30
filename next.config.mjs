/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "gxeletnimcclddohqbdt.supabase.co",
        port: "",
        pathname: "//storage/v1/object/public/restaurantLogo/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
