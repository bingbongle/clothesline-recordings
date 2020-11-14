import React from "react"

import { graphql } from "gatsby"

import DisplayCell from "../components/displayCell"
import DisplayGridList from "../components/displayGridList"
import Layout from "../components/layout"
import LogoMenu from "../components/logoMenu"

import GridListTile from "@material-ui/core/GridListTile"

const Artists = ({ data, location }) => {
  // TODO(teddywilson) This sort should not be necessary but Gatsby sort it broken
  // https://github.com/gatsbyjs/gatsby/issues/28047
  const artists = data.allMarkdownRemark.nodes.sort((artistA, artistB) => {
    if (
      artistA.frontmatter.name.toLowerCase() ===
      artistB.frontmatter.name.toLowerCase()
    ) {
      return 0
    }
    return artistA.frontmatter.name.toLowerCase() <
      artistB.frontmatter.name.toLowerCase()
      ? -1
      : 1
  })
  return (
    <Layout>
      <LogoMenu location={location} />
      <DisplayGridList>
        {artists.map((item, index) => {
          const artist = item.frontmatter
          return (
            <GridListTile key={index}>
              <DisplayCell
                item={item}
                key={index}
                image={artist.image}
                title={artist.name}
                onClickListener={() => {
                  window.open(artist.artistUrl, "_blank")
                }}
              />
            </GridListTile>
          )
        })}
      </DisplayGridList>
    </Layout>
  )
}

export default Artists

// TODO(teddywilson) See todo above; add sort to GraphQL query once bug is fixed
export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/artists/" } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          artistUrl
          image
          name
        }
      }
    }
  }
`
