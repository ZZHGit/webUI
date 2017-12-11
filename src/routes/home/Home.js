/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import newsQuery from './news.graphql';
import s from './Home.css';
import Mui from '../../components/mui';

const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
};

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      news: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          content: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  render() {
    const { data: { loading, news } } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Button raised style={style}>
            hellos
          </Button>
          <Button raised>Hello World</Button>
          <Mui />
          <h1>React.js News</h1>
          <div>
            <Icon color="primary" style={{ fontSize: 30 }}>
              add_circle
            </Icon>
          </div>
          <Typography type="display4" gutterBottom>
            Display 4
          </Typography>
          {loading
            ? 'Loading...'
            : news.map(item => (
                <article key={item.link} className={s.newsItem}>
                  <h1 className={s.newsTitle}>
                    <a href={item.link}>{item.title}</a>
                  </h1>{' '}
                  <span className={s.publishedDate}>
                    <FormattedRelative value={item.pubDate} />
                  </span>
                  <div
                    className={s.newsDesc}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </article>
              ))}
        </div>
      </div>
    );
  }
}

export default compose(withStyles(s), graphql(newsQuery))(Home);
