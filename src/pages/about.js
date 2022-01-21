import React from "react"
import Layout from "../components/layout"
import MyInfo from "../components/cv/MyInfo"
import { Link } from "gatsby"
import MenuCv from "../components/cv/MenuCv"

const About = () => {
  return (
    <Layout>
    <MenuCv/>  
    <div>
      <MyInfo/>
    </div>
    </Layout>
  )
}

export default About
