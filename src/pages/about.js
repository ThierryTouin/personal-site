import React from "react"
import Layout from "../components/layout"
import MyInfo from "../components/cv/MyInfo"
import { Link } from "gatsby"

const About = () => {
  return (
    <Layout>
    <div>
    <Link to={`/about/experiences/`}>experiences</Link>
    </div>  
    <div>
      <MyInfo/>
    </div>
    </Layout>
  )
}

export default About
