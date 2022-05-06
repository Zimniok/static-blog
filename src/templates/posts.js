import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { DiscussionEmbed } from "disqus-react"
import TemplateWrapper from "../layouts/index"

export default ({ data }) => {
  const post = data.markdownRemark
  const img = getImage(post.frontmatter.img)
  const title = post.frontmatter.title

  const disqusConfig = {
    shortname: 'ztw-gatsby-blog',
    config: { identifier: post.fields.slug, title },
  }

  return (
    <TemplateWrapper>
      <h1>{post.frontmatter.title}</h1>
      <GatsbyImage image={img} alt={post.frontmatter.author} />
      <h4 style={{ color: "rgb(165, 164, 164)" }}>
        {post.frontmatter.author}{" "}
        <span s tyle={{ fontSize: "0.8em" }}>
          {" "}
          -{post.frontmatter.date}
        </span>
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <DiscussionEmbed {...disqusConfig} />
    </TemplateWrapper>
  )
}
export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      fields {
        slug
      }
      frontmatter {
        title
        author
        date
        img {
          childImageSharp {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  }
`
