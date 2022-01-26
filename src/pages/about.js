import React from "react"
import Layout from "../components/layout"
import MyInfo from "../components/cv/MyInfo"
//import { Link } from "gatsby"
import LayoutCv from "../components/cv/layoutCv"

const About = () => {
  return (
    <Layout>
    <LayoutCv>  
    <div>
      <MyInfo/>
    </div>
    </LayoutCv>
    </Layout>
  )
}

export default About
