/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          {
            hostname: 'picsum.photos',
            protocol: "https"
          },
          {
            protocol: 'https',
            hostname: 'hmtqfp97kqkqrylf.public.blob.vercel-storage.com',
            
          },
        ],
      },
};

export default config;
