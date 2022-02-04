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

    displayHighlights = (data) => {
      return (
        <li className={employmentsStyle.highlights}>
          <div dangerouslySetInnerHTML={{ __html: data }}></div>
        </li>
      )
    };


    displayKeyword = (data) => {
      return (
        <span className={employmentsStyle.keyword}>{data}</span>
      )
    };

    generateEmployment = (data) => {
        return (

          <div className={employmentsStyle.item}>
            <div className="resume-content">
              <div>
                <h2 className="mb-0">{data.projet} </h2>
                <div className={employmentsStyle.date}>
                  <span className="text-primary">{data.start} - {data.end}</span>
                </div>
              </div>
              <div className="subheading mb-3">{data.position}  </div>
              <p>
              {data.societe} - {data.employer} 
              </p>
              <p>
              <div dangerouslySetInnerHTML={{ __html: data.summary }}></div>
              </p>
              <ul>
                {data.highlights.map(this.displayHighlights)} 
              </ul>
              
              <p>
               Environnement Technique : {data.keywords.map(this.displayKeyword)}
              </p>
              

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
