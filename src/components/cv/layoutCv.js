import React from "react"
//import "../../styles/style.scss"
import MenuCv from "./MenuCv"
import * as layoutcvStyles from "./layoutcv.module.scss"

const LayoutCv = props => {
  return (
    <div className={layoutcvStyles.wrapper} >
      <div className={layoutcvStyles.header} >
        <div className={layoutcvStyles.inner} ><MenuCv /></div>
      </div>
      <div className={layoutcvStyles.content} >
        <div className={layoutcvStyles.inner} >
          <div  >
          {props.children}
          </div>
        </div>
      </div>
    </div>

  )
}


export default LayoutCv
