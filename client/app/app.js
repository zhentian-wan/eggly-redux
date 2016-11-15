import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';
import thunk from 'redux-thunk';
import template from './app.html';
import './app.css';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { categories, CategoriesActions, category } from './components/categories/category.state';
import { bookmarks, BookmarksActions, bookmark } from './components/bookmarks/bookmarks.state';
import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';
const rootReducers = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});



const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
changePositionKey='ctrl-q'
defaultIsVisible={false}>
  <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

const run = ($ngRedux, $rootScope) => {
  'ngInject';

  const componentDidUpdate = DockMonitor.prototype.componentDidUpdate;
  DockMonitor.prototype.componentDidUpdate = function() {
    $rootScope.$evalAsync();
    if (componentDidUpdate) {
      return componentDidUpdate.apply(this, arguments);
    }
  };

  ReactDom.render(
  <DevTools store={$ngRedux}/>,
    document.getElementById('devTools')
  );
};

const config = $ngReduxProvider => {
  'ngInject';
  $ngReduxProvider.createStoreWith(rootReducers, [thunk], [DevTools.instrument()]);
};

const AppComponent = {
  template
};

let appModule = angular.module('app', [
  CommonModule.name,
  ComponentsModule.name,
  ngRedux
])
  .config(config)
  .run(run)
  //.value('store', store)
  .factory('CategoriesActions', CategoriesActions)
  .factory('BookmarksActions', BookmarksActions)
  .component('app', AppComponent);

export default appModule;
