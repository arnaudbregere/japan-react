/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s4.anilist.co" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/lieux",
        destination: "/locations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;