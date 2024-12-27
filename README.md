# AI Backend

This is the backend application for an AI-powered service. The project is built with Node.js and Express and uses several libraries for functionality such as database management, authentication, scheduling, and integration with external services.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [Usage](#usage)
- [License](#license)

## Features

- **Express Framework**: Simplified setup for routing and middleware.
- **Authentication**: JSON Web Tokens (JWT) and bcrypt for secure authentication.
- **Database**: MongoDB integration via Mongoose.
- **Scheduling**: Task scheduling with Node-Cron.
- **Payment Integration**: Stripe API for handling payments.
- **Environment Configuration**: dotenv for managing environment variables.
- **Generative AI Integration**: Google Generative AI library for AI-based tasks.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MOTANAFI/ai-mern.git
   cd ai-mern

   ## Install dependencies
   npm install

   ## Create .env file
   PORT=5000
DATABASE_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
STRIPE_API_KEY=<your-stripe-api-key>


## Scripts
start server --
 npm start

 run the developement mode 
 npm run server

## Dependencies 

@google/generative-ai	^0.21.0	Integration with Google Generative AI.
axios	^1.7.7	HTTP client for making API requests.
bcrypt	^5.1.1	Library for hashing passwords securely.
cookie-parser	^1.4.7	Middleware for parsing cookies.
cors	^2.8.5	Middleware to enable CORS.
dotenv	^16.4.5	Loads environment variables.
express	^4.21.1	Web framework for Node.js.
express-async-handler	^1.2.0	Simplifies async error handling in Express.
jsonwebtoken	^9.0.2	Library for generating and verifying JWTs.
mongoose	^8.8.1	MongoDB object modeling for Node.js.
node-cron	^3.0.3	Library for scheduling cron jobs in Node.js.
stripe	^17.4.0	Stripe API library for payment processing.

## DevDependencies
nodemon	^3.1.7	Automatically restarts the server on file changes.

## Usage 
npm run server

## License

### Notes:
1. Replace `<repository-url>` with your Git repository URL.
2. Update the `.env` section with the necessary environment variables for your app.
3. Add any additional details specific to your application.

Let me know if you'd like further customization for this README!





