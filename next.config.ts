// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",           // Jab koi localhost:3000 par aaye
        destination: "/dashboard", // Toh use yahan bhej do
        permanent: true,       // Isse SEO aur browser caching behtar hoti hai
      },
    ];
  },
};

export default nextConfig;