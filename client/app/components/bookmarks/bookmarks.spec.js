import {
  bookmarks, bookmark, GET_BOOKMARKS, DELETE_BOOKMARK, SAVE_BOOKMARK, CREATE_NEW_BOOKMARK
} from './bookmarks.state';
describe('bookmarks reducer', () => {
  let initState;
  beforeEach(() => {
    initState = [
      {
        "id": 1,
        "title": "AngularJS",
        "url": "http://angularjs.org",
        "category": "Development"
      },
      {
        "id": 2,
        "title": "Egghead.io",
        "url": "http://egghead.io",
        "category": "Development"
      }
    ];
  });

  it('should return default state if type is random', () => {
    const result = bookmarks(undefined, {
      type: 'randomType',
      payload: undefined
    });
    const expected = [];
    expect(result).toEqual(expected);
  });

  it('should create new bookmark', () => {
    const newBookmark = {
      "id": 3,
      "title": "test",
      "url": "http://test.org",
      "category": "test"
    };
    const result = bookmarks(initState, {
      type: CREATE_NEW_BOOKMARK,
      payload: newBookmark
    });
    const expected = [
      ...initState,
      newBookmark
    ];
    expect(result).toEqual(expected);
  });

  it('should save updated bookmark', () => {
      const updatedBookmark = {
        "id": 1,
        "title": "Angular2",
        "url": "http://angularjs.org",
        "category": "Development"
      };
      const reuslt = bookmarks(initState, {type: SAVE_BOOKMARK, payload: updatedBookmark});
      const expected = updatedBookmark.title;
      expect(reuslt[0].title).toEqual(expected);
  });

  it('should delete bookmark', () => {
      const bookmarkToBeDeleted = {
        "id": 1,
        "title": "AngularJS",
        "url": "http://angularjs.org",
        "category": "Development"
      };
      const result = bookmarks(initState, {type: DELETE_BOOKMARK, payload: bookmarkToBeDeleted});
      expect(result).not.toContain(bookmarkToBeDeleted);
  });
});
