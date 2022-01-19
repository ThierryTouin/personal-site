import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import * as headerStyles from "./header.module.scss"

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            menuLinks {
              name
              link
              subMenu {
                link
                name
              }
            }
          }
        }
      }
    `
  )
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.overlay}></div>
      <div className={headerStyles.heroContent}>
        <p className={headerStyles.brand}>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </p>
        <p className={headerStyles.description}>
          {data.site.siteMetadata.description}
        </p>
      </div>
      <nav className={headerStyles.navContainer}>
        <ul className={headerStyles.navList}>
              {data.site.siteMetadata.menuLinks.map(link => (
                <li key={link.name} >
                  <Link to={link.link} activeClassName={headerStyles.activeMenuItem} >
                    {link.name}
                  </Link>
                  
                  {/* {link.subMenu && link.subMenu.length > 0 ? (
                    <ul>
                      {link.subMenu.map((subLink) => (
                       <li key={subLink.name}>
                          <Link to={subLink.link} activeClassName={headerStyles.activeMenuItem} >
                            {subLink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}                   */}
                </li>
              ))}
        </ul>        
      </nav>
    </header>
  )
}

export default Header
