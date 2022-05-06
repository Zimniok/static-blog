import React from "react"
import Link from "gatsby-link"
import { StaticQuery, graphql } from "gatsby"
import Search from "../Search/index"
const Header = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <div
        style={{
          background: "blue",
          marginBottom: "1.45rem",
          marginTop: "0px",
          display: "block",
          boxShadow: "0px 0px 7px black",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: 960,
            padding: "1.45rem 1.0875rem",
          }}
        >
          <h1 style={{ margin: 0, textAlign: "center" }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Static Blog by Gatsby JS
            </Link>
          </h1>
          <Search searchIndex={data.siteSearchIndex.index} />
        </div>
      </div>
    )}
  />
)
export default Header
