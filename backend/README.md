# Currency Converter API

This is the backend service for the Currency Converter application, providing an API endpoint to fetch currency exchange rates from an external service.

## Features

- RESTful API to fetch current exchange rates
- Proxy for ExchangeRate-API service to protect API keys
- Built with Express.js using a structured MVC architecture
- Environment configuration for development and production
- CORS support for cross-origin requests
- Error handling for API requests

## API Endpoints

### Get Exchange Rates

```text
GET /api/exchange-rates?base={CURRENCY_CODE}
```

Retrieves the latest exchange rates with the specified base currency.

**Query Parameters:**

- `base`: The base currency code (e.g., USD, EUR, GBP)

**Example Request:**

```text
GET /api/exchange-rates?base=USD
```

**Example Response:**

```json
{
    "result": "success",
    "documentation": "https://www.exchangerate-api.com/docs",
    "terms_of_use": "https://www.exchangerate-api.com/terms",
    "time_last_update_utc": "Tue, 25 Mar 2025 00:00:02 +0000",
    "time_next_update_utc": "Wed, 26 Mar 2025 00:00:02 +0000",
    "base_code": "USD",
    "conversion_rates": {
        "USD": 1,
        "EUR": 0.9252,
        "GBP": 0.7737,
        "JPY": 150.3725,
        "CAD": 1.4319,
        "AUD": 1.5909,
        "CNY": 7.2598,
        "INR": 85.6649
        // Additional currencies omitted for brevity
    }
}
```

**Notes:**

- If no base currency is specified, USD will be used as the default
- Currency codes should be provided in ISO 4217 format (3-letter codes)
- The API will return the latest exchange rates available from the external service
- Ensure to handle errors gracefully in your application
- Rate limits may apply based on the external service's API usage policy
- For more information on the external service, refer to their documentation

### Project Structure

```text
currency-converter/
├── backend
│   ├── controllers/          # Controllers for handling requests
│   ├── config/               # Configuration variables
│   │   └── config.js
│   ├── controllers/          # Controllers for handling requests
│   │   └── exchangeRateController.js
│   ├── routes/               # Route definitions
│   │   └── exchangeRateRoutes.js
│   ├── .env                  # Environment variables (not in Git)
│   ├── .example.env          # Example environment file
│   ├── .gitignore            # Git ignore file
│   ├── index.js              # Application entry point
│   ├── package.json          # Project dependencies
│   └── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- API key from [ExchangeRate-API](https://www.exchangerate-api.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/manthanank/currency-converter.git
    cd currency-converter/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create .env file:

    ```bash
    cp .env.example .env
    ```

4. Edit the .env file with your API key:

    ```text
    PORT=5000
    NODE_ENV=development
    EXCHANGE_RATE_API_KEY=your_api_key_here
    ```

### Running the Server

#### Development mode

```bash
npm run dev
```

#### Production mode

```bash
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## Deployment

This API is deployed on Vercel. You can use the following URL for production:

```text
https://currency-converter-api.vercel.app
```

## Error Handling

The API includes error handling for:

- Invalid API requests
- Network issues
- Rate limiting
- Unhandled promise rejections

## Technologies Used

- Express.js - Web framework
- Axios - HTTP client
- CORS - Cross-origin resource sharing
- dotenv - Environment configuration

## License

This project is licensed under the MIT License.
