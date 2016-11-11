export const GET_BOOKMARKS = "GET_BOOKMARKS";
export const GET_SELECTED_BOOKMARK = "GET_SELECTED_BOOKMARK";

/**
 * Initial data
 */
const initialBookmarks = [
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
  },
  {
    "id": 3,
    "title": "A List Apart",
    "url": "http://alistapart.com/",
    "category": "Design"
  },
  {
    "id": 4,
    "title": "One Page Love",
    "url": "http://onepagelove.com/",
    "category": "Design"
  },
  {
    "id": 6,
    "title": "MobilityWOD",
    "url": "http://www.mobilitywod.com/",
    "category": "Exercise"
  },
  {
    "id": 7,
    "title": "Robb Wolf",
    "url": "http://robbwolf.com/",
    "category": "Exercise"
  },
  {
    "id": 8,
    "title": "Senor Gif",
    "url": "http://memebase.cheezburger.com/senorgif",
    "category": "Humor"
  },
  {
    "id": 9,
    "title": "Wimp",
    "url": "http://wimp.com",
    "category": "Humor"
  },
  {
    "id": 10,
    "title": "ViralViralVideos",
    "url": "http://viralviralvideos.com",
    "category": "Humor"
  }
];

const initBookmark = {
  "id": null,
  "title": null,
  "url": null,
  "category": null
};

/**
 * Actions
 */
export const BookmarksActions = ($ngRedux) => {
  'ngInject'
  const getBookmarks = (bookmarks) => {
    return {
      type: GET_BOOKMARKS,
      payload: bookmarks
    };
  };
  const getSelectedBookmark = (bookmark = {}) => {
    const {category} = $ngRedux.getState();
    const payload = bookmark.id ?
      bookmark :
      Object.assign({}, bookmark, { category: category.name });
    return {
      type: GET_SELECTED_BOOKMARK,
      payload
    }
  };
  return {
    getBookmarks,
    getSelectedBookmark
  };
};

/**
 * Reducer
 */
export const bookmarks = (state = initialBookmarks, { type, payload }) => {
  switch (type) {
    case GET_BOOKMARKS:
      return payload || state;
    default :
      return state;
  }
};

export const bookmark = (state = initBookmark, { type, payload }) => {
  switch (type) {
    case GET_SELECTED_BOOKMARK:
      return payload || state;
    default :
      return state;
  }
};
