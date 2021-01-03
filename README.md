Greetings,

# About:
  
  # Flight Booking: 
 This is an E-Travel Website called Wright (inspired from Wright Brothers). On the website we allow users to enter their flight requirements (Seating type, Number of passengers, Type of trip etc.) and they are given the results fetched by Amadeus Flight Offers API. The users also have the option to filter the results stating the carriers that they want to exclude from the results or just see flights from those carriers. After selecting the offer(s), the proceed to the review section where they may choose available coupons and review the selected offer. After continuing, they can enter the details of the passengers and confirm their booking. On the final page, they can download the pdf of the ticket. After that they can also see the ticket in the profile section. 
   
  # User Recommendation: 
For user recommendations, the websites asks for current location and if granted it uses the current co-ordinates to find the city and country using Geocode API. It uses this location to find the IATA code of the city (if exists) using Amadeus Airport and City Search, and uses this code to get the cheapest offers from the city using Amadeus Flight Inspiration Search. The IATA code of the cities is then noted and translated to city names using a converter. These city names are then plugged into Google Places Photos API to get the pictures associated with the city. These are then mapped to the carousel on the homepage. 

# Technical Info:
We have used APIs from Amadeus and Google. To run the project, you need to fill out the .env file in this format:
      ATLAS_URI = {Mongo Atlas Key}
      REACT_APP_GOOGLE_CLIENT_ID = {Client ID}
      REACT_APP_GOOGLE_CLIENT_SECRET = {Secret}
      REACT_APP_API_KEY = {Key}
      REACT_APP_AMADEUS_SECRET= {Secret}
      REACT_APP_AMADEUS_API= {Secret}
  
  - We have created a node app on Heroku to proxy google API requests to get the CORS headers. 
 
  











# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
