/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // env: {
  //   MONGO_URI:
  //     'mongodb+srv://arifkhan:fyou7346@cluster0.1zhxmbc.mongodb.net/shopping-list?retryWrites=true&w=majority',
  //   // or MONGODB_URI: 'mongodb+srv://xxxx.mongodb.net/?retryWrites=true&w=majority'
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
