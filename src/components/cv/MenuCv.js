import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"


const MenuCV = () => {

  return (
      <nav >
        <ul >
                <li>
                <Link to={`/about/experiences/`}>experiences</Link> | 
                </li>
                <li>
                <Link to={`/about/educations/`}>educations</Link>
                </li>
        </ul>        
      </nav>
  )
}

export default MenuCV
