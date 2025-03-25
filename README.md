# Currency Converter App

This is a simple currency converter application built using Angular and styled with Tailwind CSS. The app allows users to convert amounts between different currencies using live exchange rates from a public API.

## Features

- Convert between multiple currencies
- Real-time exchange rates using an external API
- Responsive design with a modern UI
- Built with Angular and Tailwind CSS for a clean and scalable codebase

## Preview

![Currency Converter](/public/image.png)

## Demo

You can view a live demo of the app [here](https://currency-converter-manthanank.vercel.app/).

## Getting Started

### Prerequisites

Ensure you have Node.js and Angular CLI installed on your machine.

- Node.js: [Download Node.js](https://nodejs.org/)
- Angular CLI: Install via npm:

  ```bash
  npm install -g @angular/cli
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manthanank/currency-converter-app.git
   cd currency-converter-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Create a `.env` file in the backend directory (using `.example.env` as a template):

   ```plaintext
   cp .example.env .env
   ```

5. Get an API key from ExchangeRate-API and add it to the backend `.env` file:

   ```plaintext
   PORT=5000
   NODE_ENV=development
   EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

### Usage

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the Angular development server:

   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:4200` to view the app.
4. Use the app to convert currencies by selecting the desired currencies and entering the amount.
5. The converted amount will be displayed in real-time based on the latest exchange rates.

### Project Structure

```plaintext
currency-converter-app/
├── backend/                # Backend API
│   ├── config/             # Configuration files
│   ├── controllers/        # API controllers
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   ├── .env.example         # Example environment variables
│   ├── .gitignore          # Git ignore file
│   ├── index.js            # Application entry point
│   ├── package.json        # Project dependencies
│   └── README.md           # Backend documentation
├── public/                # Public assets (images, icons)
├── src/                    # Frontend application
│   ├── app/                # Angular components and services
│   ├── index.html          # Main HTML file
│   ├── main.ts             # Angular entry point
│   └── styles.scss         # Global styles
├── .gitignore             # Git ignore file
├── angular.json           # Angular configuration
|── tailwind.config.js      # Tailwind CSS configuration
├── package.json           # Project dependencies
├── README.md              # Project documentation
└── .gitignore             # Git ignore file
...
```

### Built With

- [Angular](https://angular.io/) - Web framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ExchangeRate-API](https://www.exchangerate-api.com/) - Currency exchange rates API
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js

### License

This project is licensed under the MIT License.

---

Feel free to contribute or provide feedback!
