/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/dqcr2lwws/image/upload/**',
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          port: '',
          pathname: '/media/**',
        },
      ],
    },
    async redirects() {
        return [
          {
            source: '/articles',
            destination: '/the-archives',
            permanent: true,
          },
          {
            source: '/authors',
            destination: '/about-us',
            permanent: true,
          },
        ]
    },
}

module.exports = nextConfig
