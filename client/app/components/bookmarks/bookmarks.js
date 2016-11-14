import angular from 'angular';
import SaveBookmarksModule from './save-bookmark/save-bookmark';

import template from './bookmarks.html';
import './bookmarks.css';

class BookmarksController {
  constructor($ngRedux, BookmarksActions) {
    'ngInject';
    this.store = $ngRedux;
    this.BookmarksActions = BookmarksActions;
  }

  $onInit() {
    this.store.subscribe(() => {
      this.currentCategory = this.store.getState().category;
      this.bookmarks = this.store.getState().bookmarks;
      this.currentBookmark = this.store.getState().bookmark;
    });

    this.store.dispatch(
      this.BookmarksActions.getBookmarks()
    );

    this.resetBookmark();
  }

  createBookmark() {
    this.store.dispatch(
      this.BookmarksActions.getSelectedBookmark()
    );
  }

  editBookmark(bookmark) {
    this.store.dispatch(
      this.BookmarksActions.getSelectedBookmark(bookmark)
    );
  }

  initNewBookmark() {
    return {
      id: null,
      title: '',
      url: '',
      category: this.CategoriesModel.getCurrentCategory().name
    };
  }

  saveBookmark(bookmark) {
    if (bookmark.id) {
      this.store.dispatch(
        this.BookmarksActions.saveBookmark(bookmark)
      )
    } else {
      this.store.dispatch(
        this.BookmarksActions.createNewBookmark(bookmark)
      )
    }
  }

  deleteBookmark(bookmark){
    this.store.dispatch(
      this.BookmarksActions.deleteBookmark(bookmark)
    )
  }

  onSave(bookmark) {
    this.saveBookmark(bookmark);
    this.resetBookmark();
  }

  resetBookmark() {
    this.store.dispatch(this.BookmarksActions.resetBookmark());
  }
}

const BookmarksComponent = {
  template,
  controller: BookmarksController,
  controllerAs: 'bookmarksListCtrl'
};

const BookmarksModule = angular.module('bookmarks', [
    SaveBookmarksModule.name
  ])
  .component('bookmarks', BookmarksComponent);

export default BookmarksModule;
