const nextConfig = {
  domains: ["s4.anilist.co", "img1.ak.crunchyroll.com"],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],
};

export default nextConfig;
