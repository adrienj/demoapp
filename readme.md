# Comics demo app

Browse Marvel Comics

## Getting started

To run the app, execute:
```
npm install
npm run build
npm run start
```

Then go to http://localhost:8080

Auto build on save by running
```
npm run watch
```

## Structure

- *dist*: public output. Use `npm run clean` to clean.
- *scripts*: utilitiles. Contains the dev server script.
- *src*: main sources. Contains utilities. Entry-point is index.jsx
	- *components*: all react components
	- *mixins*: all react mixins
	- *fonts*: web fonts are copied to *dist/fonts*
	- *styles*: postcss+cssnext styles. Entry-point is *index.css*

## Todo

- eslint, stylelint, envfile, browserlist
- flux, redux
- optimize and make css more modular with mixins and variables
- error management, assertions, ui notifications
- unit, functional and e2e testing
- checkout page
- store fonts locally
- i18n
- cache & offline mode with serviceWorkers
- remove nodejs proxy once marvel works
