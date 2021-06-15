This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Reading Time field and sidebar extension for Contentful RichText

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Libraries to use

- npx @contentful/create-contentful-app create-definition
- Goto contentful/Apps/Manage apps
- Config new apps and install this apps into specific space.
- Create new rich text field which named "body"
- Create new JSON field which stores the reading time and set new application in the appearance.

 If you udatae the body field in the editor, then it will caculate the reading times and updates the JSON field.

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.
