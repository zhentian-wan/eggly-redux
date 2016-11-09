import angular from 'angular';
import CategoryItemModule from './category-item/category-item';

import template from './categories.html';
import './categories.css';

import {categories, CategoriesActions, category} from './category.state';

class CategoriesController {
  constructor($timeout, store, CategoriesActions) {
    'ngInject';

    angular.extend(this, {
      $timeout,
      store,
      CategoriesActions
    });
  }

  $onInit() {
    this.unsubscribe = this.store.subscribe(() => {
       this.categories = this.store.getState();
    });

    this.store.dispatch(this.CategoriesActions.getCategoreis());

    this.$timeout(( )=> {
      const data = [
        {id: 0, name: 'Angular'}
      ];
      this.store.dispatch(this.CategoriesActions.getCategoreis(data));
    }, 2000);
  }

  onCategorySelected(currentCategory) {
    this.currentCategory = category(this.currentCategory, this.CategoriesActions.getCurrentCategory(currentCategory));
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
