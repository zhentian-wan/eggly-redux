import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import template from './app.html';
import './app.css';

import {categories, initialCategories, CategoriesActions} from './components/categories/category.state';
// import Store from './app.store';
import ngRedux from 'ng-redux';
//const store = new Store(categories, initialCategories);
const config = $ngReduxProvider => {
  'ngInject';
  // createStoreWith(1p, 2p, 3p, 4p)
  //1p: reducer
  //2P: middleware
  //3p: enhancer
  //4p: initial state
  $ngReduxProvider.createStoreWith(categories, [], [], initialCategories);
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
  .component('app', AppComponent);

export default appModule;
