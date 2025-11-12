/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["jatisejahtera.indrapuji.com", "localhost"],
  },
  env: {
    API_URL: "https://jatisejahtera.indrapuji.com",
    // API_URL: 'http://localhost:3001',
  },
};
