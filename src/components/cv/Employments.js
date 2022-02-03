import React, {Component} from 'react';

import {StaticQuery, graphql} from 'gatsby';

//import {Card}from "@material-ui/core";
import * as employmentsStyle from "./employments.module.scss";

const query = graphql`
query EmploymentsQuery {
  site {
    siteMetadata {
      cv {
        employment {
          history {
            url
            summary
            societe
            projet
            start
            position
            place
            period
            keywords
            highlights
            end
            employer
          }
        }
      }
    }
  }
}`;


  class Employments extends Component {

    displayKeyword = (data) => {
      return (
        <div className={employmentsStyle.keyword}>{data} , </div>
      )
    };

    generateEmployment = (data) => {
        return (

          <div className={employmentsStyle.item}>
            <div className="resume-content">
              <h2 className="mb-0">{data.projet} </h2>
              <div className="subheading mb-3">{data.position}  </div>
              <p>
              {data.employer} 
              </p>
              <p>
              {data.societe} 
              </p>
              <p>
              {data.summary} 
              </p>
              <p>
              {data.highlights} 
              </p>
              
              <p>
               Environnement Technique : {data.keywords.map(this.displayKeyword)}
              </p>
              

            </div>
            <div className={employmentsStyle.date}>
              <span className="text-primary">{data.start} - {data.end}</span>
            </div>
          </div>
            
        )
    };

    render() {
        const {data} = this.props;
        return (
            
          <div className={employmentsStyle.employments}>
            {data.site.siteMetadata.cv.employment.history.map(this.generateEmployment)}
          </div>
            
        );
    }
}

export default props => (
    <StaticQuery
        query={query}
        render={(data) => (<Employments data={data} {...props}/>)}
    />
);
