# rnGithubEx
A Github explorer using React Native & Github's GraphQL API. Built using react-native-cli using the Typescript template and apollo-graphql.


## Features
* Search Repositories
* Add Repositories to client side watchlist
* See Last 5 open issues on any Repository
* Create an Issue
* Search and Sort through Watchlist
* Client side managed Login


## Running locally
1. Clone the repository
2. Make sure you complete local setup from [RN Evironment Setup](https://reactnative.dev/docs/environment-setup) using `React Native CLI Quickstart` for either android or ios.
3. Run `npm install` from inside the folder.
4. Start Metro Budler using `npx react-native start`
4. Start your using `npx react-native <run-android|run-ios>`

**Development Keys**: The `API_TOKEN` in `src/constants.ts` needs to be put in for running the app. Follow this [Link](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql) on how to get it.