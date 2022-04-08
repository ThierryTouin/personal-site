const React = require('react');


const headComponents = [
    <script 
        data-goatcounter="https://aaaaffzecffrkejncnjin.goatcounter.com/count"
        async src="//gc.zgo.at/count.js">
    </script>,
  ]
  
  export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents(headComponents)
  }