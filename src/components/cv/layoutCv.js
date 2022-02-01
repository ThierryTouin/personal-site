import React from "react"
//import "../../styles/style.scss"
import MenuCv from "./MenuCv"
import * as layoutcvStyles from "./layoutcv.module.scss"

const LayoutCv = props => {
  return (
    <div className={layoutcvStyles.wrapper} >
      <div className={layoutcvStyles.left} >
        <MenuCv />
      </div>
      <div className={layoutcvStyles.right} >
        {props.children}
      </div>
    </div>

  )
}


export default LayoutCv
