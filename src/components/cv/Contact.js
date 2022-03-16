import React, {Component} from 'react';

import {StaticQuery, graphql} from 'gatsby';
import * as contactStyle from "./contact.module.scss";

const query = graphql`
query MyContactQuery {
    site(siteMetadata: {}) {
      siteMetadata {
        author
        cv {
          contact {
            email
          }
          social {
            network
            url
          }
        }
      }
    }
  }`;

class Contact extends Component {

    generateSocial = (data) => {
        return (
            <div><h2>{data.network}</h2><a target="_blank" href={data.url}>{data.url}</a></div>
        )
    };

    render() {
        const {data} = this.props;
        return (
            <div className={contactStyle.contact}>
                <div className={contactStyle.text}>
                  <h2>Mail</h2>{data.site.siteMetadata.cv.contact.email}
                </div>
                <div className={contactStyle.text}>
                  {data.site.siteMetadata.cv.social.map(this.generateSocial)}
                </div>
            </div>

        );
    }
}

export default props => (
    <StaticQuery
        query={query}
        render={(data) => (<Contact data={data} {...props}/>)}
    />
);
