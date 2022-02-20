import React, {Component} from 'react';

import {StaticQuery, graphql} from 'gatsby';

//import {Card}from "@material-ui/core";
import * as educationsStyle from "./educations.module.scss";

const query = graphql`
query EducationsQuery {
  site {
    siteMetadata {
      cv {
        education {
          history {
            end
            institution
            start
          }
        }
      }
    }
  }
}`;


  class Educations extends Component {

    generateEducations  = (data) => {
      return (

        <div className={educationsStyle.item}>
          <div className={educationsStyle.wrapper}>
              <div className={educationsStyle.box1}>
                <div className={educationsStyle.date}>{data.start}</div>
              </div>
              <div className={educationsStyle.box2}>
                <div className={educationsStyle.institution}> - {data.institution}</div>
              </div>
          </div>
        </div>  
        )
      }

    render() {
        const {data} = this.props;
        return (
            
          <div className={educationsStyle.educations}>
            {data.site.siteMetadata.cv.education.history.map(this.generateEducations)}
          </div>
            
        );
    }
}

export default props => (
    <StaticQuery
        query={query}
        render={(data) => (<Educations data={data} {...props}/>)}
    />
);
