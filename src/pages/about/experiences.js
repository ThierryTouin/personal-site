import React from "react"
import Layout from "../../components/layout"
import Employments from "../../components/cv/Employments"
import MenuCv from "../../components/cv/MenuCv"


const Experiences = () => {
  return (
    <Layout>
    <MenuCv/>    
    <div>
    Experiences
    <Employments/>
    </div>
    </Layout>
  )
}

export default Experiences
