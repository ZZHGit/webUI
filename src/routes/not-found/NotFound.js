/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {
  injectIntl,
  intlShape,
  defineMessages,
  FormattedMessage,
  FormattedRelative,
  FormattedNumber,
  FormattedDate,
  FormattedTime,
} from 'react-intl';
import { Map } from 'immutable';
import { normalize, schema } from 'normalizr';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';
import Todos from '../../components/ToDo/App';

const messages = defineMessages({
  bannerTitle: {
    id: 'header.banner.title',
    defaultMessage: 'React',
    description: 'Title in page header',
  },
  bannerDesc: {
    id: 'header.banner.desc',
    defaultMessage: 'Complex web apps made easy',
    description: 'Description in header',
  },
});

const Greeting = ({ name, unreadCount, lastLoginTime }) => (
  <p>
    <FormattedMessage
      id="greeting.welcome_message"
      defaultMessage={`
                Welcome {name}, you have received {unreadCount, plural,
                    =0 {no new messages}
                    one {{formattedUnreadCount} new message}
                    other {{formattedUnreadCount} new messages}
                } since {formattedLastLoginTime}.
            `}
      values={{
        name: <b>{name}</b>,
        unreadCount,
        formattedUnreadCount: (
          <b>
            <FormattedNumber value={unreadCount} />
          </b>
        ),
        formattedLastLoginTime: (
          <FormattedRelative value={lastLoginTime} updateInterval={1000} />
        ),
      }}
    />
  </p>
);

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  unreadCount: PropTypes.number.isRequired,
  lastLoginTime: PropTypes.any.isRequired,
};

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line
    intl: intlShape.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: 'Eric',
      unreadCount: 1000,
    };
  }

  testnormalize() {
    const originalData = {
      id: '123',
      author: { id: '1', name: 'Paul' },
      title: 'My awesome blog post',
      comments: [{ id: '324', commenter: { id: '2', name: 'Nicole' } }],
    };

    // Define a users schema
    const user = new schema.Entity('users');

    // Define your comments schema
    const comment = new schema.Entity('comments', {
      commenter: user,
    });

    // Define your article
    const article = new schema.Entity('articles', {
      author: user,
      comments: [comment],
    });

    const normalizedData = normalize(originalData, article);
    console.info(normalizedData);
    return this;
  }

  render() {
    const { name, unreadCount } = this.state;
    const user = { name, unreadCount, lastLoginTime: new Date(1459832991883) };
    const map1 = Map({ a: 1, b: 2, c: 3 });
    const map2 = map1.set('b', 50);
    console.info(`${map1.get('b')} vs. ${map2.get('b')}`); // 2 vs. 50
    this.testnormalize();
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <Todos />
          <p>
            <b>Sorry, the page you were trying to view does not exist.</b>
            <br />
            <FormattedDate
              value={new Date(1459913574887)}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            />
            <FormattedTime value={Date.now()} />
          </p>
          <Greeting {...user} />
          <p>
            <span title={this.props.intl.formatDate(Date.now())}>
              据第一次访问<FormattedRelative value={Date.now()} />
            </span>
          </p>
        </div>
        <div className={s.container}>
          <FormattedMessage {...messages.bannerTitle} />
          <span> | </span>
          <FormattedMessage {...messages.bannerDesc} />
        </div>
      </div>
    );
  }
}
// 通过 injectIntl 注入 props.intl
export default withStyles(s)(injectIntl(NotFound));
