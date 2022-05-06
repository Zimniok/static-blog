module.exports = {
  siteMetadata: {
    title: "Static Blog",
    description: `This is example of static Gatsby blog`,
    author: `@pwr`,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog-posts`,
        path: `${__dirname}/src/blog-posts`,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `author`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          allMarkdownRemark: {
            edges: {
              title: node => node.frontmatter.title,
              author: node => node.frontmatter.author,
              path: node => node.fields.slug,
            },
          },
        },
      },
    },
  ],
}
