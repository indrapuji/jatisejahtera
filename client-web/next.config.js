/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

module.exports = {
  images: {
    domains: ['jati.pasangbajaringan.id', 'localhost'],
  },
  env: {
    API_URL: 'https://jati.pasangbajaringan.id',
    // API_URL: 'http://localhost:3001',
  },
};
