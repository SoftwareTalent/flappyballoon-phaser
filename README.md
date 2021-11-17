# JavaScript Capstone Project: FlappyBird

## Built With

- JavaScript ES6
- Webpack
- SCSS
- Phaser 3
- Babel
- LeaderBoard API Service
- ESlint and Stylelint as linters

## Getting Started

### Prerequisites

In order to have this project up and running you will need:

- NodeJS 10+

### Setup

First, you need to clone this project using one of the links above, using this command:

`git clone RESPOSITRY_LINK`

Then you should run: `npm install`

And afterward you supposed to run: `npm run server`, to run the project in your local machine.

Congrats the project is fully working.

### Deployment

For deployment, I used GitHub pages, but as you see my project is full of files and the `index.html` file is inside the `build/` folder, so in order to deploy using GitHub pages we need to put the `index.html` file in the root of the repository, in order to do this we will use a simple trick, please follow the commands below if you want to deploy on your own repository:

- If you have the `build/` folder declared inside the `.gitignore` file please remove it from there.

- run `npm run build` to generate the build folder.

- then make sure that git knows about your subtree, using this command:

  ```
  git add build && git commit -m "Initial build subtree commit"
  ```

- after that use subtree push to send it to gh-pages branch in GitHub:

  ```
  git subtree push --prefix build origin gh-pages
  ```

Now you that have finished, check the link to GitHub pages you will find your project deployed there. you can find the link on the repository settings page.

### Running tests

I have added some tests for the API that I used, you can run them by running the following command on the terminal:

```terminal
npm run test
```

Feel free to add new tests by your self by adding your tests in the `/test` directory.

_I wished if I was working on a big project so I can write more tests and I use TDD_

# NPM available scripts:

Use "npm run-script " followed by any of the following commands :

- "build": "webpack --mode production"
- "watch": "webpack --mode development --watch"
- "test": "jest"

# Future Work

- Add Night Mode to the game,
- Increase difficulty by time or score,
- Improve the mobile version,
- Add more type of birds to play with,
- Add Music that plays in the background;

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- [Microverse](https://www.microverse.org/)
- [Phaser 3 notes](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html)
- [phaser.io](https://phaser.io)
- [Phaser 3 API docs](https://photonstorm.github.io/phaser3-docs/index.html)
