/*
import { CategoriesModule, CategoriesController, CategoriesComponent } from './categories';
import CategoriesTemplate from './categories.html';

describe('Categories', () => {
  let component, $componentController, CategoriesModel;

  beforeEach(() => {
    window.module('categories');

    window.module($provide => {
      $provide.value('CategoriesModel', {
        getCategories: () => {
          return {
            then: () => {
            }
          };
        }
      });
    });
  });

  beforeEach(inject((_$componentController_, _CategoriesModel_) => {
    CategoriesModel = _CategoriesModel_;
    $componentController = _$componentController_;
  }));

  describe('Module', () => {
    it('is named correctly', () => {
      expect(CategoriesModule.name).toEqual('categories');
    });
  });

  describe('Controller', () => {
    it('calls CategoriesModel.getCategories immediately', () => {
      spyOn(CategoriesModel, 'getCategories').and.callThrough();

      component = $componentController('categories', {
        CategoriesModel
      });
      component.$onInit();

      expect(CategoriesModel.getCategories).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('includes the `category-item` directive', () => {
      expect(CategoriesTemplate).toContain('category-item');
    });
  });

  describe('Component', () => {
    const component = CategoriesComponent;

    it('includes the intended template', () => {
      expect(component.template).toEqual(CategoriesTemplate);
    });

    it('uses the correct `controllerAs` label', () => {
      expect(component.controllerAs).toBe('categoriesListCtrl');
    });

    it('invokes the right controller', () => {
      expect(component.controller).toEqual(CategoriesController);
    });
  });
});
*/
import { categories, GET_CATEGORIES, GET_CURRENT_CATEGORY } from './category.state';

describe('categroies reducer', () => {
  let initState;
  beforeEach(() => {
    initState = [
      {
        "id": 0,
        "name": "Development"
      },
      {
        "id": 1,
        "name": "Design"
      },
      {
        "id": 2,
        "name": "Exercise"
      },
      {
        "id": 3,
        "name": "Humor"
      }
    ];
  });

  it('should return default state as empty array if state is undefined and payload type is random', () => {
    const result = categories(undefined, {
      type: 'randomAction',
      payload: undefined
    });
    const expected = [];
    expect(result).toEqual(expected);
  });

  it('should get init state if payload is empty for GET_CATEGORIES', () => {
    const result = categories(initState, {
      type: GET_CATEGORIES,
      paylaod: {}
    });
    const expected = initState;
    expect(result).toEqual(expected);
  });

  it('should return payload value for GET_CATEGORIES', () => {
    const result = categories(undefined, {
      type: GET_CATEGORIES,
      payload: initState
    });
    const expected = initState;
    expect(result).toEqual(expected);
  });
});
