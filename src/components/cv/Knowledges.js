import React, {Component} from 'react';

import {StaticQuery, graphql} from 'gatsby';

//import {Card}from "@material-ui/core";
import * as knowledgesStyle from "./knowledges.module.scss";

const query = graphql`
query KnowledgesQuery {
  site {
    siteMetadata {
      cv {
        knowledges {
          sets {
            name
            skills
          }
        }
      }
    }
  }
}`;


  class Knowledges extends Component {

    generateSkill = (data) => {
      return (
        <li>{data}</li>
      )
    };

    generateKnowledges  = (data) => {
      return (

        <div className={knowledgesStyle.item}>
          <h2>{data.name}</h2>
          <ul>{data.skills.map(this.generateSkill)}</ul>
        </div>  
        )
      }

    render() {
        const {data} = this.props;
        return (
            
          <div className={knowledgesStyle.knowledges}>
            {data.site.siteMetadata.cv.knowledges.sets.map(this.generateKnowledges)}
          </div>
            
        );
    }
}

export default props => (
    <StaticQuery
        query={query}
        render={(data) => (<Knowledges data={data} {...props}/>)}
    />
);
