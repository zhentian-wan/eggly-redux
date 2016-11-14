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

    this.unsubscribe = this.store.connect(this.mapStateToThis, this.BookmarksActions)(this);

    /*this.store.subscribe(() => {
      this.currentCategory = this.store.getState().category;
      this.bookmarks = this.store.getState().bookmarks;
      this.currentBookmark = this.store.getState().bookmark;
    });*/

    /*this.store.dispatch(
      this.BookmarksActions.getBookmarks()
    );*/

    this.getBookmarks();
    this.resetBookmark();
  }

  $onDestory() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      currentCategory: state.category,
      bookmarks: state.bookmarks,
      currentBookmark: state.bookmark
    };
  }

  createBookmark() {
    /*this.store.dispatch(
      this.BookmarksActions.getSelectedBookmark()
    );*/
    this.getSelectedBookmark()
  }

  editBookmark(bookmark) {
    /*this.store.dispatch(
      this.BookmarksActions.getSelectedBookmark(bookmark)
    );*/
    this.getSelectedBookmark(bookmark);
  }

  initNewBookmark() {
    return {
      id: null,
      title: '',
      url: '',
      category: this.CategoriesModel.getCurrentCategory().name
    };
  }

  /*deleteBookmark(bookmark) {
    this.store.dispatch(
      this.BookmarksActions.deleteBookmark(bookmark)
    )
  }*/

  onSave(bookmark) {
    if (bookmark.id) {
      /*this.store.dispatch(
       this.BookmarksActions.saveBookmark(bookmark)
       );*/
      this.saveBookmark(bookmark);
    } else {
      /*this.store.dispatch(
       this.BookmarksActions.createNewBookmark(bookmark)
       );*/
      this.createNewBookmark(bookmark);
    }
    this.resetBookmark();
  }

  /*resetBookmark() {
    this.store.dispatch(this.BookmarksActions.resetBookmark());
  }*/
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
