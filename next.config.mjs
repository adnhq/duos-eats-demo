/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["images.unsplash.com", "img.freepik.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "gxeletnimcclddohqbdt.supabase.co",
        port: "",
        pathname: "//storage/v1/object/public/restaurantLogo/**",
      },
      {
        protocol: "https",
        hostname: "gxeletnimcclddohqbdt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/restaurantLogo/**",
      },
      {
        protocol: "https",
        hostname: "gxeletnimcclddohqbdt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/menuItemImage/**",
      },
      {
        protocol: "https",
        hostname: "gxeletnimcclddohqbdt.supabase.co",
        port: "",
        pathname: "//storage/v1/object/public/menuItemImage/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
