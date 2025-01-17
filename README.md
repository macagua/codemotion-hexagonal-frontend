# codemotion-hexagonal-frontend

## Pre requirements

- [Node Version Manager](https://github.com/nvm-sh/nvm) - nvm.
- ``curl`` command or [Postman](https://www.postman.com/) software.
- [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7 or later.

## Download

```
git clone github.com:macagua/codemotion-hexagonal-frontend.git
cd codemotion-hexagonal-frontend
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Testing

To testing the Angular JS client, with the following links:

### Login form

http://localhost:4200/login

### All Rick And Morty Characters

http://localhost:4200/gallery

### All Pokemon cards

http://localhost:4200/pokemons

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## APIs

This AngularJS client application have at least two APIs, which I describe below:

### Rick And Morty Character API

``/character``
- Obtains all Rick and Morty characters.

``/character/{id}``
- Gets the information of a Rick and Morty character.

### Pokemon API

This AngularJS client application gets the information from the [backend](https://github.com/macagua/codemotion-hexagonal-backend#pokemon-api).

``/api/pokemons``
- Obtains all Pokemon records

``/api/pokemon/{id}``
- Obtains the information of a Pokemon

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
