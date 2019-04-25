import React, { Component } from 'react'
import { graphql } from 'gatsby'
import UniqueSlugContext from 'contexts/unique_slug_context'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Row, Col } from 'react-bootstrap'
import GithubSlugger from 'github-slugger'

import Layout from 'components/layout'

import postStyles from 'styles/blog_post.module.css'

export default class BlogPost extends Component {
  render() {
    let { mdx: post } = this.props.data
    let { fields: metadata } = post

    return (
      <Layout>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <h1 className={ postStyles.postTitle }>{ metadata.title }</h1>
            <h6>{ metadata.date }</h6>
            <UniqueSlugContext.Provider value={ new GithubSlugger() }>
              <MDXRenderer>
                { post.code.body }
              </MDXRenderer>
            </UniqueSlugContext.Provider>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
      }
      fields {
        date
        slug
        title
      }
      code {
        body
      }
    }
  }
`
