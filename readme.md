# Project 4: Make a game in Javascript

> Phaser 3 + TypeScript + Vite.js Template

I've decided to use this template for my project [phaser3-vite-template](https://github.com/ourcade/phaser3-vite-template).. 
I've used Phaser 3 before, but I've never used TypeScript or Vite.js. I'm excited to learn more about them and use them in my project. I'm excited to see how it compares to the other languages I've used.

## Prerequisites

You'll need [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

Install Node.js and `npm` with `nvm`:

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

## Getting Started

You can clone this repository or use [git clone](https://github.com/TimCauss/Project4-Game) to clone the project like this:

```bash
cd my-folder-name
git clone https://github.com/TimCauss/Project4-Game

npm install
```

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## Project Structure

/* TODO Update this structure: */

```
    .
    ├── dist
    ├── node_modules
    ├── public
    ├── src
    │   ├──consts
    │   │  ├── SceneKeys.ts
    │   ├──scenes
    │   │  ├── Game.ts
    │   ├── main.ts
	├── index.html
    ├── package.json
```

TypeScript files are intended for the `src` folder. `main.ts` is the entry point referenced by `index.html`.

Other than that there is no opinion on how you should structure your project.


It is all up to you!

## Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served from the root. For example: http://localhost:8000/images/my-image.png

Example `public` structure:

```
    public
    ├── images
    │   ├── my-image.png
    ├── music
    │   ├── ...
    ├── sfx
    │   ├── ...
```

They can then be loaded by Phaser with `this.image.load('my-image', 'images/my-image.png')`.

# TypeScript ESLint

This template uses a basic `typescript-eslint` set up for code linting.

It does not aim to be opinionated.

[See here for rules to turn on or off](https://eslint.org/docs/rules/).

## Dev Server Port

You can change the dev server's port number by modifying the `vite.config.ts` file. Look for the `server` section:

```js
{
	// ...
	server: { host: '0.0.0.0', port: 8000 },
}
```

Change 8000 to whatever you want.

