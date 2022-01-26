import React from "react"
import { Link } from "gatsby"
import * as menucvStyles from "./menucv.module.scss"

const MenuCV = () => {

  return (
      <nav className={menucvStyles.wrapper} >
        <ul >
            <li>
                <Link to={`/about/`}>Info</Link>
            </li>
            <li>
                <Link to={`/about/experiences/`}>experiences</Link>
            </li>
            <li>
                <Link to={`/about/educations/`}>educations</Link>
            </li>
        </ul>        
      </nav>
  )
}

export default MenuCV
