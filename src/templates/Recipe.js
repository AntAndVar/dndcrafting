import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "./Layout/"
import Article from "./Article/"
import { convertToSlug } from "../utils/slug"
import { ListGroup } from "react-bootstrap"

export const query = graphql`
  query($title: String!) {
    recipesJson(title: { eq: $title }) {
      title
      description
      effects
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

const Recipe = ({ data, pageContext }) => {
  const recipe = data.recipesJson
  const { ingredients } = pageContext

  return (
    <Layout>
      <Article title={recipe.title}>
        <div style={{ height: "400px" }}>
          <Image
            fluid={recipe.image.childImageSharp.fluid}
            alt={recipe.title}
            style={{ maxHeight: "100%" }}
            imgStyle={{
              objectFit: "contain",
              height: "100%",
            }}
          />
        </div>
        <h4>Effects</h4>
        <ul>
          {recipe.effects.map(e => (
            <li>{e}</li>
          ))}
        </ul>
        <div dangerouslySetInnerHTML={{ __html: recipe.description }} />
        <div class="w-100">
          <h2>Ingredients</h2>
          <ListGroup>
            {ingredients &&
              ingredients.map(ing => (
                <Link to={`/ingredients/${convertToSlug(ing.title)}`}>
                  <ListGroup.Item action>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{ing.title}</h5>
                      {/*<small>3 days ago</small>*/}
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                      <p>Rarity: {ing.rarity}</p>
                    </div>
                  </ListGroup.Item>
                </Link>
              ))}
          </ListGroup>
        </div>
      </Article>
    </Layout>
  )
}

export default Recipe
