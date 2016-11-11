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

    this.reset();
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
      this.BookmarksModel.updateBookmark(bookmark);
    } else {
      this.BookmarksModel.createBookmark(bookmark);
    }
  }

  onSave(bookmark) {
    this.saveBookmark(bookmark);
    this.reset();
  }

  reset() {
    this.currentBookmark = null;
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
