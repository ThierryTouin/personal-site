import React, {Component} from 'react';

import {StaticQuery, graphql} from 'gatsby';

//import {Card}from "@material-ui/core";
import * as skillsStyle from "./skills.module.scss";

const query = graphql`
query SkillsQuery {
  site {
    siteMetadata {
      cv {
        skills {
          sets {
            name
            skills
          }
        }
      }
    }
  }
}`;


  class Skills extends Component {

    generateSkill = (data) => {
      return (
        <li className={skillsStyle.keyword}>{data}</li>
      )
    };

    generateSkills  = (data) => {
      return (

        <div className={skillsStyle.item}>
          <h2>{data.name}</h2>      
          <ul className={skillsStyle.keywords}>
            {data.skills.map(this.generateSkill)}
          </ul>
        </div>  
        )
      }

    render() {
        const {data} = this.props;
        return (
          <div className={skillsStyle.skills}>
            {data.site.siteMetadata.cv.skills.sets.map(this.generateSkills)}
          </div>
            
        );
    }
}

export default props => (
    <StaticQuery
        query={query}
        render={(data) => (<Skills data={data} {...props}/>)}
    />
);
