
import type { NextConfig } from "next";

const config: NextConfig = {
  // Generate a static website in the "out" directory
  output: "export",

  // Disable the Next.js image optimization server,
  // which is unavailable with static export
  images: {
    unoptimized: true,
  },

  // Disable the X-Powered-By header where applicable
  poweredByHeader: false,
};

export default config;
