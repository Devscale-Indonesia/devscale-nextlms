/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-960d224b3bb24e1fae7a5dceed1a05ee.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
