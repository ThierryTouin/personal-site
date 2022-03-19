import React from "react"
import { Link } from "gatsby"
import * as menucvStyles from "./menucv.module.scss"

const MenuCV = () => {

  return (
      <nav className={menucvStyles.verticalmenu} >
        <ul >
            <li>
                <Link to={`/about/`}>Info</Link>
            </li>
            <li>
                <Link to={`/about/experiences/`}>Experiences</Link>
            </li>
            <li>
                <Link to={`/about/educations/`}>Educations</Link>
            </li>
            <li>
                <Link to={`/about/knowledges/`}>Knowledges</Link>
            </li>
            <li>
                <Link to={`/about/skills/`}>Skills</Link>
            </li>
        </ul>        
      </nav>
  )
}

export default MenuCV
