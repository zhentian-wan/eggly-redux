# An Angular 1.x bookmark manager with Redux
This is a simple bookmark manager built with AngularJS, [ng-redux](https://github.com/wbuchwalter/ng-redux), ES6, Webpack, and Gulp. It illustrates storing state in one place via Redux, and then using controllers to "glue" that state to the views.

## Getting Started
You will need `node` (`brew install node` or https://nodejs.org/en/) and `npm` (which ships with node).

## Installing
```bash
git clone https://github.com/simpulton/eggly-redux.git
cd eggly-redux
npm i
gulp
```

## Testing
To run the tests, run `npm test` or `karma start`.

Be sure to define your `*.spec.js` files within their corresponding component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` suffix, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Jasmine` is the testing suite and assertion library used for this project. If you would like to change this, see `karma.conf.js`.

## Install Redux devtools
```
npm install --save-dev bable-preset-react
npm install --save react react-dom redux-devtools redux-devtools-dock-monitor redux-devtools-log-monitor
```

### Go to app.js:
import:
```
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
```

```
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
changePositionKey='ctrl-q'
defaultIsVisible={false}>
  <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

const run = ($ngRedux, $rootScope) => {
  'ngInject';

  const componentDidUpdate = DockMonitor.prototype.componentDidUpdate;
  DockMonitor.prototype.componentDidUpdate = function() {
    $rootScope.$evalAsync();
    if (componentDidUpdate) {
      return componentDidUpdate.apply(this, arguments);
    }
  };

  ReactDom.render(
  <DevTools store={$ngRedux}/>,
    document.getElementById('devTools')
  );
};

const config = $ngReduxProvider => {
  'ngInject';
  $ngReduxProvider.createStoreWith(rootReducers, [thunk], [DevTools.instrument()]);
};
```

### Open devtools
``ctrl + h``
