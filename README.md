[![Build Status](https://travis-ci.org/AoDev/bard-instruments.svg?branch=master)](https://travis-ci.org/AoDev/bard-instruments) ![Node support](https://img.shields.io/badge/node-%3E%3D%2010.0.0-brightgreen)

# bard-instruments
Utilities for every day development challenges in JS/SPA/Mobx/React web applications.

> **It is a basket of utils to cherry pick that I improve and test over time.**

(See section "part of Bard Ecosystem" for details at the end of the docs).

## How to use
**Some utils rely on lodash 4.x, so it is needed as peer|dependency.**

### Install
```shell
npm install bard-instruments
npm install lodash@4
```

### Require / import
All utils are in their own module under /lib. Many of them work both in Nodejs and browser.  
Importing is different if you use ES6 or CJS.

Example:
```js
// Node / cjs
const RateLimitPromiseQueue = require('bard-instruments/lib/async/RateLimitPromiseQueue').default
// ES6
import RateLimitPromiseQueue from 'bard-instruments/lib/async/RateLimitPromiseQueue'

const promiseQueue = new RateLimitPromiseQueue({minTimeBetweenTasks: 1000})
```

## Util list
This is a simple list. The source code has more detailed usage example.

### async utils

* `/async/promiseAllProps`  
Wait for a `map` of promises; fails as soon as one fails.

* `/async/promiseAllPropsResults`  
Wait for a `map` of promises; does not fail; failed promises values will be the corresponding error.

* `/async/promiseAllResults`  
Wait for an `array` of promises; does not fail; failed promises values will be the corresponding error.

* `/async/RateLimitPromiseQueue`  
Promise queue that enforces an amount of time that must have passed between each task. Typical use case: request rate limit to an API.

* `/async/sleep`  
Delay the execution of a Promise Chain.

### axios utils

* `/axios/createRateLimitAdapter`  
Add rate limit management on an [axios](https://github.com/axios/axios) instance.


### DOM utils

* `/dom/injectCss`  
Inject css rules into the document head.


### Mobx utils

* `/mobx/AsyncDateModel`  
Observable model of typical asynchronous data state.

* `/mobx/ObservableViewport`  
Expose observable properties of the browser viewport.


### react-mobx utils

* `/withVM`  
Higher order component that allows to connect easily a [mobx root store](https://mobx.js.org/best/store.html#combining-multiple-stores) to a component via React context api.

## Part of the "Bard ecosystem"
I am developing an ecosystem to easily build frontend apps based on React and Mobx.
The utils are loosely related to each other, so that they can be shared in javascript projects, especially in the "Bard ecosystem".

More info:
* [bard-router](https://github.com/AoDev/bard-router)
