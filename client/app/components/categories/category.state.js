/**
 * CONSTANT
 * @type {string}
 */
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CURRENT_CATEGORY = "GET_CURRENT_CATEGORY";

/**
 * INIT VALUE
 */
export const initialCategories = [
  {id: 0, name: 'Development'},
  {id: 1, name: 'Design'},
  {id: 2, name: 'Exercise'},
  {id: 3, name: 'Humor'}
];

/**
 * ACTIONS CREATOR
 */
export const CategoriesActions = () => {
  const getCategoreis = (categories) => {
    return {type: GET_CATEGORIES, payload: categories}
  };

  const getCurrentCategory = (currentCategory) => {
    return {type: GET_CURRENT_CATEGORY, payload: currentCategory}
  };

  return {
    getCategoreis,
    getCurrentCategory
  };
};

/**
 * REDUCERS
 * @type {string}
 */
export const categories = (state = initialCategories, {type, payload}) => {
  switch(type) {
    case GET_CATEGORIES:
      return payload || state;
    default:
      return state;
  }
};

export const category = (state = {}, {type, payload}) => {
  switch(type) {
    case GET_CURRENT_CATEGORY:
      return payload || {name:  undefined};
    default:
      return state;
  }
};
