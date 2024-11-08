/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Frontend Developer seunghee 개발 블로그`,
    description: `Frontend Developer blog`,
    siteUrl: `https://sa02045.github.io/`,
    author: {
      name: `seunghee`,
      summary: `Frontend Developer blog`,
    },
  },
  plugins: [
    'gatsby-plugin-advanced-sitemap',
    'gatsby-plugin-postcss',
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    'gatsby-plugin-dark-mode',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-source-filesystem-markdown-name',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: 'carbon',
              theme: 'one-light',
              lineNumbers: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `favicon`,
        short_name: `favicon`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`limelight`, `source sans pro\:300,400,400i,700`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: 'G-Z16KCJFFT5',
        head: true,
      },
    },
  ],
};
