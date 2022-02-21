import React, {Component} from 'react';

import {StaticQuery, graphql} from 'gatsby';

import * as myInfoStyle from "./myinfo.module.scss";

const query = graphql`
query MyInfoQuery {
    site(siteMetadata: {}) {
      siteMetadata {
        author
        cv {
            info {
                label
                summary
            }
        }
      }
    }
  }`;

class MyInfo extends Component {


    render() {
        const {data} = this.props;
        return (
            <div className={myInfoStyle.myinfo}>
                <h2>{data.site.siteMetadata.cv.info.label}</h2>
                <div className={myInfoStyle.summary} dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.cv.info.summary }}></div>
            </div>
        );
    }
}

export default props => (
    <StaticQuery
        query={query}
        render={(data) => (<MyInfo data={data} {...props}/>)}
    />
);
