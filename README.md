# Quasar App (awesome-todo)

This is a Quasar project to write "to do tasks". A fully implementation is available on [https://todo.devartiral.com](https://todo.devartiral.com).

The api repository for this app is in [this repository](https://github.com/bbf6/todo-api).

The features included in this app are:
- Creation of task with schedule.
- Option to show the task split by done and undone or all together.
- Option to show dates on 12 or 24 hours format.
- A searcher that highlight the search match.
- A websocket real time update of the tasks using the [rails/actioncable library](https://www.npmjs.com/package/@rails/actioncable).
- Deployment options for webapp, SPA app, mobile with capacitor (Android/IOS) and desktop with electron (Linux/Mac/Windows)

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
