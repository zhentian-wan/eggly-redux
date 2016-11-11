import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import template from './app.html';
import './app.css';

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
const config = $ngReduxProvider => {
  'ngInject';
  $ngReduxProvider.createStoreWith(rootReducers, []);
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
  //.value('store', store)
  .factory('CategoriesActions', CategoriesActions)
  .factory('BookmarksActions', BookmarksActions)
  .component('app', AppComponent);

export default appModule;
