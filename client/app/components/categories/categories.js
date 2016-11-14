import angular from 'angular';
import CategoryItemModule from './category-item/category-item';

import template from './categories.html';
import './categories.css';

import { categories, CategoriesActions, category } from './category.state';

class CategoriesController {
  constructor(CategoriesActions, BookmarksActions, $ngRedux) {
    'ngInject';

    angular.extend(this, {
      CategoriesActions,
      BookmarksActions
    });

    this.store = $ngRedux;
  }

  $onInit() {
    const actions = Object.assign({}, this.CategoriesActions, this.BookmarksActions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
    this.getCategoreis();

    /*this.unsubscribe = this.store.subscribe(() => {
      this.categories = this.store.getState().categories;
      this.currentCategory = this.store.getState().category;
    });*/

    //this.store.dispatch(this.CategoriesActions.getCategoreis());
  }

  $onDestory() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      categories: state.categories,
      currentCategory: state.currentCategory
    };
  }

  onCategorySelected(currentCategory) {
    /*this.store.dispatch(this.CategoriesActions.getCurrentCategory(currentCategory));
    this.store.dispatch(this.BookmarksActions.resetBookmark());*/
    this.getCurrentCategory(currentCategory);
    this.resetBookmark();
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
