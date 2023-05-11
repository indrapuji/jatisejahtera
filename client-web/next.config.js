/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

module.exports = {
  images: {
    domains: ['localhost'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};
