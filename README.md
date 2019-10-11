# 🔑 Prestart

![npm (scoped)](https://img.shields.io/npm/v/@itsjonq/prestart)

> A tiny tool to make Javascript development a little more delightful

Prestart is a tool can hook into `npm prestart` to help setup your Javascript development workflow. The main feature is that it will automatically check and install any missing dependencies for you.

```
PreStart

Project details
--------------------------------------------
node   version   12.9.1
git    branch    master
       email     name@email.com
--------------------------------------------

  ✔ [1/2] 🔌   Checking connection...
  ✔ [2/2] 🚚   Fetching packages...

Success!
✨  Have fun developing!
```

## Installation

```
npm install --save-dev @itsjonq/prestart
```

## Usage

Add `@itsjonq/prestart` to your `prestart` script in your project's `package.json`.

```
"scripts": {
  ...
  "prestart": "prestart",
  ...
},
```
