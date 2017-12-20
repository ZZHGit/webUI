# Change Log

## WebUI Change Log

All notable changes to this project will be documented in this file.

### [Unreleased][unreleased]

Comming...

### [v0.0.1]

摘要: 搭建基于 RSK 的项目脚手架，reselect、material-ui、immutable、
redux-orm 等库的集成测试完善。

##### _Dec 20, 2017_

#### 重要修改 (Breaking Changes)

* [选型] Choose **React Starter Kit** for new project.
* [完善] IE 调试支持，添加 event-source-polyfill
* [记录] material-next 服务端渲染，每次请求服务端需要重新创建 theme
* [标签] 简单说明(#issue).

#### 文档修改 (Docs)

* [Docs] 完善 CHANGELOG.

##### 其他

### [v0.5.1]

> 2016-03-02

* Remove `Html` React component in favor of compiled Jade templates
  (`src/views`) (BREAKING CHANGE).
  [e188388](https://github.com/kriasoft/react-starter-kit/commit/e188388f87069cdc7d501b385d6b0e46c98fed60)
* Add global error handling in Node.js/Express app.
  [e188388](https://github.com/kriasoft/react-starter-kit/commit/e188388f87069cdc7d501b385d6b0e46c98fed60)
* Add support for Markdown and HTML for static pages.
  [#469](https://github.com/kriasoft/react-starter-kit/pull/469),
  [#477](https://github.com/kriasoft/react-starter-kit/pull/477)

### [v0.5.0]

> 2016-02-27

* Replace RESTful API endpoint (`src/api`) with GraphQL (`src/data`)
* Add a sample GraphQL endpoint
  [localhost:3000/graphql](https://localhost:3000/graphql)
* Change the default Node.js server port from `5000` to `3000`
* Add a JWT-based authentication cookies (see `src/server.js`)
* Add a reference implementation of Facebook authentication strategy
  (`src/core/passport.js`)
* Add a sample database client utility for PostgreSQL (`src/core/db.js`)
* Optimize the `tools/start.js` script that launches dev server with Browsersync
  and HMR
* Replace Superagent with WHATWG Fetch library
* Rename `app.js` to `client.js` (aka client-side code)
* Integrate [CSS Modules](https://github.com/css-modules/css-modules) and
  [isomorphic-style-loader](https://github.com/kriasoft/isomorphic-style-loader)
* Move `DOMUtils.js` to `src/core` folder; remove `src/utils` folder
* Replace [cssnext](http://cssnext.io/) with
  [precss](https://github.com/jonathantneal/precss)
* Update build automation scripts to use plain functions
* Add support of `--release` and `--verbose` flags to build scripts
* Add `CHANGELOG.md` file with a list of notable changes to this project

[unreleased]: https://github.com/kriasoft/react-starter-kit/compare/v0.5.1...HEAD
[v0.5.1]: https://github.com/kriasoft/react-starter-kit/compare/v0.5.0...v0.5.1
[v0.5.0]: https://github.com/kriasoft/react-starter-kit/compare/v0.4.1...v0.5.0
[v0.4.1]: https://github.com/kriasoft/react-starter-kit/compare/v0.4.0...v0.4.1
