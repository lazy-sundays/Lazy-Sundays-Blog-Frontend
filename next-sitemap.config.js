/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL_ROOT || 'https://alazysunday.com',
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