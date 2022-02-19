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
          <h2>{data.start}</h2>
          <div>{data.institution}</div>

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
