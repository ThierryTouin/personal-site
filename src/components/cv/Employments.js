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

const monthNames = ["Janvier", "Févier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"
];

function displayDateFormated(data) {

  if (data==null) {
    return "A nos jours"
  }

  const date = new Date(data);

  var month = monthNames[date.getMonth()];
  var year = date.getFullYear();

  return month + " " + year;
  //return data;
};



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
        <li className={employmentsStyle.keyword}>{data}</li>
      )
    };



    generateEmployment = (data) => {
        return (

          <div className={employmentsStyle.item}>

            <div className={employmentsStyle.wrapper}>
              <div className={employmentsStyle.box1}>
                <h2>{data.projet} </h2>
                <div className={employmentsStyle.position}>{data.position} - {data.societe} - {data.employer}</div>
              </div>
              <div className={employmentsStyle.box2}>
                <div className={employmentsStyle.date}>
                  <span className="text-primary">{displayDateFormated(data.start)} - {displayDateFormated(data.end)}</span>
                </div>
              </div>
              <div className={employmentsStyle.box3}>
                <p>
                  <div dangerouslySetInnerHTML={{ __html: data.summary }}></div>
                </p>
                <ul>
                  {data.highlights.map(this.displayHighlights)} 
                </ul>
              
                <ul className={employmentsStyle.keywords}>
                  {data.keywords.map(this.displayKeyword)}
                </ul>
              </div>
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
