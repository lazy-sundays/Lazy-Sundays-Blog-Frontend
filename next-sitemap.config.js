/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL_ROOT || 'https://alazysunday.com',
    additionalPaths: async () => {
        const staticPaths = ['/', '/about-us', '/the-archives', '/random-article']
        const result = staticPaths.map((path) => {
            return ({
            loc: path,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date().toISOString(),
            })
        });
        return result;
    },
    exclude: [
        `/secret`,
        `/server-sitemap.xml`,
    ],
    generateRobotsTxt: true, 
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.SITE_URL_ROOT || 'https://alazysunday.com'}/server-sitemap.xml`,
        ],
        policies: [
            {userAgent: "*", disallow: "/secret"},
            {userAgent: "*", allow: "/"},
        ],
    },
    generateIndexSitemap: false,
  }