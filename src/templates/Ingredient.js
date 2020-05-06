import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "./Layout/"
import Article from "./Article/"
import { convertToSlug } from "../utils/slug"
import { useMediaQuery } from "../utils/mediaQuery"
import { ListGroup } from "react-bootstrap"

// export const query = graphql`
//   query($title: String!) {
//     ingredientsJson(title: { eq: $title }) {
//       title
//       description
//       rarity
//       image {
//         childImageSharp {
//           fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   }
// `

const Ingredient = ({ data, pageContext }) => {
  const ingredient = data.ingredientsJson
  const { recipes } = pageContext
  const isDesktop = useMediaQuery("(min-width: 500px)")

  return (
    <Layout>
      <Article title={ingredient.title}>
        <div style={{ height: isDesktop ? "400px" : "200px" }}>
          <Image
            fluid={ingredient.image.childImageSharp.fluid}
            alt={ingredient.title}
            style={{ maxHeight: "100%" }}
            imgStyle={{
              objectFit: "contain",
              height: "100%",
            }}
          />
        </div>
        <h4>Rarity: {ingredient.rarity}</h4>
        <div dangerouslySetInnerHTML={{ __html: ingredient.description }} />
        <div class="w-100">
          <h2>Recipes</h2>
          <hr class="border-primary"></hr>
          <ListGroup>
            {recipes &&
              recipes.map(item => (
                <Link to={`/recipes/${convertToSlug(item.title)}`}>
                  <ListGroup.Item action>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{item.title}</h5>
                      {/*<small>3 days ago</small>*/}
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                      <p>Effects: {item.effects.join(",")}</p>
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

export default Ingredient
