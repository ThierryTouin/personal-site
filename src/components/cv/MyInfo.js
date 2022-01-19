import React, {Component} from 'react';

import {StaticQuery, withPrefix, graphql} from 'gatsby';

import {Grid, Card, CardMedia, CardContent }from "@material-ui/core";

import posed from 'react-pose';

const styles = {
    icon: {
        width: '100%',
    }
};



const query = graphql`
query MyInfoQuery {
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

class MyInfo extends Component {

    generateSocial = (data) => {
        return (
            <div>{data.network} : {data.url}</div>
        )
    };

    render() {
        const {data} = this.props;
        return (
            <Card>
                <CardContent>
                    <Grid container spacing={0}>
                        {data.site.siteMetadata.cv.contact.email}
                    </Grid>
                </CardContent>
                <div className={'row'}>
                    {data.site.siteMetadata.cv.social.map(this.generateSocial)}
                </div>
            </Card>
        );
    }
}

export default props => (
    <StaticQuery
        query={query}
        render={(data) => (<MyInfo data={data} {...props}/>)}
    />
);
