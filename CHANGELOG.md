# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0-beta.0](https://github.com/AoDev/bard-instruments/compare/v3.0.0-alpha.0...v3.0.0-beta.0) (2021-03-07)


### ⚠ BREAKING CHANGES

* * Simplify folders by moving withVM to lib/mobx
Not you need to import from bard-instruments/lib/mobx/withVM

* AsyncDataModel is now called AsyncData

* update to mobx6 + AsyncData + move withVM to mobx folder ([f2f04ab](https://github.com/AoDev/bard-instruments/commit/f2f04abdf7594ba3e9128114dffa9e89b528b464))

## [3.0.0-alpha.0](https://github.com/AoDev/bard-instruments/compare/v2.1.0...v3.0.0-alpha.0) (2021-02-09)


### ⚠ BREAKING CHANGES

* **withVM:** * withVM2 (hook version) has been moved to withVM.
* support for older versions of React is thus removed.

So if you had `import withVM2 ...` now it's just `import withVM ...`

You can keep using bard-instruments v2 for older React versions.

* **withVM:** will only support React versions > 16.8 (hooks) ([e08c87c](https://github.com/AoDev/bard-instruments/commit/e08c87cf0c00b25d863a1c2ca46daf6ec2d426a6))

## [2.1.0](https://github.com/AoDev/bard-instruments/compare/v2.0.0...v2.1.0) (2020-10-03)


### Features

* **time:** add simple Scheduler + add more timeUnits ([322f76e](https://github.com/AoDev/bard-instruments/commit/322f76e1a055ee8b262f829694fd7a4b9ed318ce))

## [2.0.0](https://github.com/AoDev/bard-instruments/compare/v1.2.1...v2.0.0) (2020-09-22)


### ⚠ BREAKING CHANGES

* **timeUtils:** To allow a simple import in Nodejs with the default export,
named exports of timeUtils had to be removed.

* **timeUtils:** remove named exports ([595e0c6](https://github.com/AoDev/bard-instruments/commit/595e0c66776130fd411d6108081a5c47d9826dab))

### [1.2.1](https://github.com/AoDev/bard-instruments/compare/v1.2.0...v1.2.1) (2020-09-22)

## [1.2.0](https://github.com/AoDev/bard-instruments/compare/v1.1.0...v1.2.0) (2020-09-22)


### Features

* **timeUtils:** add 1h, 4h, 1d roundInterval ([596d5de](https://github.com/AoDev/bard-instruments/commit/596d5de1e868ac366b00088d747d8008fad87f27))

## [1.1.0](https://github.com/AoDev/bard-instruments/compare/v1.0.2...v1.1.0) (2020-08-19)


### Features

* **withVM2:** add hook version of withVM ([2f7d2f7](https://github.com/AoDev/bard-instruments/commit/2f7d2f76d55a8b26d9d647df09fd4c988585438e))

### [1.0.2](https://github.com/AoDev/bard-instruments/compare/v1.0.1...v1.0.2) (2020-03-22)

### [1.0.1](https://github.com/AoDev/bard-instruments/compare/v1.0.0...v1.0.1) (2020-02-11)


### Bug Fixes

* exports of AsyncDataModel and ObservableViewport ([558b2d3](https://github.com/AoDev/bard-instruments/commit/558b2d3465e755051ba5ec93ba1e4b5cb67687e5))

## [1.0.0](https://github.com/AoDev/bard-instruments/compare/v0.0.5...v1.0.0) (2020-01-09)


### Features

* **timeUtils:** add 5m, 15m, 1h round functions. ([3412698](https://github.com/AoDev/bard-instruments/commit/3412698e3609ada0f249f3b7e952bc31b036744b))

### [0.0.5](https://github.com/AoDev/bard-instruments/compare/v0.0.4...v0.0.5) (2019-11-13)

### [0.0.4](https://github.com/AoDev/bard-instruments/compare/v0.0.3...v0.0.4) (2019-11-10)


### Features

* add timeUtils ([74276ef](https://github.com/AoDev/bard-instruments/commit/74276ef))

### [0.0.3](https://github.com/AoDev/bard-instruments/compare/v0.0.2...v0.0.3) (2019-08-13)


### Bug Fixes

* **withVM:** export was wrong (refactoring) ([000a547](https://github.com/AoDev/bard-instruments/commit/000a547))

### 0.0.2 (2019-08-13)


### Bug Fixes

* **build:** don't include polyfills ([a72c556](https://github.com/AoDev/bard-instruments/commit/a72c556))
* **build:** remove node < 10 support ([b65dd55](https://github.com/AoDev/bard-instruments/commit/b65dd55))


### Features

* add first utils ([dcc48ba](https://github.com/AoDev/bard-instruments/commit/dcc48ba))
