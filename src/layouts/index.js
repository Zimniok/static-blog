import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Header from "../components/Header/index"
// import "./index.css"
const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Static Blog"
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" },
      ]}
    />
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  </div>
)
TemplateWrapper.propTypes = {
  children: PropTypes.func,
}
export default TemplateWrapper
