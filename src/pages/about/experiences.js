import React from "react"
import Layout from "../../components/layout"
import Employments from "../../components/cv/Employments"
import LayoutCv from "../../components/cv/layoutCv"


const Experiences = () => {
  return (
    <Layout>
    <LayoutCv>    
    <div>
    Experiences
    <Employments/>
    </div>
    </LayoutCv>
    </Layout>
  )
}

export default Experiences
