import React from "react"
import Layout from "../components/layout"
import Metadata from "../components/metadata"
import MyContact from "../components/cv/Contact"
import * as contactStyles from "./contact.module.scss"

const Contact = () => {
  return (
    <Layout>
      <div className={contactStyles.content} >
      <Metadata title="Contact" description="Contact" />
      <MyContact/>
      </div>
    </Layout>
  )
}

export default Contact
