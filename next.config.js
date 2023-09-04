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
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      )
  
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: /url/ }, // exclude if *.svg?url
          use: [{loader: '@svgr/webpack', options: { icon: true }}],
        },
      )
  
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i
  
      return config
    },
}

module.exports = nextConfig
