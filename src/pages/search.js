import React, { useState } from "react"
import { graphql } from "gatsby"
import * as JsSearch from "js-search"



const Search = ({ data }) => {
  const [postList, setPostList] = useState(0)
  const [search, setSearch] = useState(1)
  const [isLoading, setIsLoading] = useState(2)
  const [searchQuery, setSearchQuery] = useState(3)
  const [searchResults, setSearchResults] = useState(4)
  setPostList(data)

  const rebuildIndex = () => {
    const dataToSearch = new JsSearch.Search("isbn")
    /**
     * defines an indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("isbn")
    dataToSearch.addIndex("title") // sets the index attribute for the data
    dataToSearch.addIndex("author") // sets the index attribute for the data
    dataToSearch.addDocuments(postList) // adds the data to be searched
    setSearch(dataToSearch)
    setIsLoading(false)
  }
  
  const searchData = e => {
    const queryResult = search.search(e.target.value)
    setSearchQuery(e.target.value)
    setSearchResults(queryResult)
  }
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "0 auto" }}>
          <label htmlFor="Search" style={{ paddingRight: "10px" }}>
            Enter your search here
          </label>
          <input
            id="Search"
            value={searchQuery}
            onChange={searchData}
            placeholder="Enter your search here"
            style={{ margin: "0 auto", width: "400px" }}
          />
        </div>
      </form>
    </div>
  )
}
export default Search



export const query = graphql`
  query sQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            author
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`
