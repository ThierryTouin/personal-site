import React from "react"
import Layout from "../components/layout"
import Metadata from "../components/metadata"
import * as indexStyles from "./index.module.scss"

const Index = () => {
  return (
    <Layout>
      <div className={indexStyles.content} >
      <Metadata title="Home" description="This is my home page" />
      <h1>Home page</h1>
      <h2>I'm Ibas, a teacher and a Gatsby.js developer</h2>
      </div>
    </Layout>
  )
}

export default Index
