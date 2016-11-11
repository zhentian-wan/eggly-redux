import angular from 'angular';
import CategoryItemModule from './category-item/category-item';

import template from './categories.html';
import './categories.css';

import {categories, CategoriesActions, category} from './category.state';

class CategoriesController {
  constructor($timeout, CategoriesActions, $ngRedux) {
    'ngInject';

    angular.extend(this, {
      $timeout,
      CategoriesActions
    });

    this.store = $ngRedux;
  }

  $onInit() {
    this.unsubscribe = this.store.subscribe(() => {
       this.categories = this.store.getState().categories;
       this.currentCategory = this.store.getState().category;
    });

    this.store.dispatch(this.CategoriesActions.getCategoreis());
  }

  $onDestory() {
    this.unsubscribe();
  }

  onCategorySelected(currentCategory) {
    //this.currentCategory = category(this.currentCategory, this.CategoriesActions.getCurrentCategory(currentCategory));
    this.store.dispatch(this.CategoriesActions.getCurrentCategory(currentCategory));
  }

  isCurrentCategory(category) {
    return this.currentCategory &&
      this.currentCategory.id === category.id;
  }
}

const CategoriesComponent = {
  template,
  controller: CategoriesController,
  controllerAs: 'categoriesListCtrl'
};

const CategoriesModule = angular.module('categories', [
      CategoryItemModule.name
    ])
    .component('categories', CategoriesComponent)
  ;

export { CategoriesModule, CategoriesComponent, CategoriesController } ;
