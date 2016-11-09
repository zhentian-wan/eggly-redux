import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import template from './app.html';
import './app.css';

import {categories, initialCategories, CategoriesActions} from './components/categories/category.state';
import Store from './app.store';
const store = new Store(categories, initialCategories);

const AppComponent = {
  template
};

let appModule = angular.module('app', [
    CommonModule.name,
    ComponentsModule.name
  ])
    .value('store', store)
    .factory('CategoriesActions', CategoriesActions)
  .component('app', AppComponent)
;

export default appModule;
