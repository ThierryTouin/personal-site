import React, {Component} from 'react';

import {StaticQuery, graphql} from 'gatsby';

//import {Card}from "@material-ui/core";
//import * as employmentsStyle from "./Employments.module.scss"

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

    generateEmployment = (data) => {
        return (

          <div className="${employmentsStyle.resume-item}">
            <div className="resume-content">
              <h3 className="mb-0">{data.projet} </h3>
              <div className="subheading mb-3">{data.position}  </div>
              <p>
              {data.summary} 
            
              </p>
              <p>
               Environnement Technique : {data.keywords}
              </p>
              

            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">{data.start} - {data.end}</span>
            </div>
          </div>
            
        )
    };

    render() {
        const {data} = this.props;
        return (
            
          <div className="w-100">
            <h2 className="mb-5">Experience Professionnelle</h2>
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
