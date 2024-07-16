# MongoLogger 2.0

MongoLogger 2.0 is an advanced logging utility that interacts with a MongoDB database to store, retrieve, and manipulate log entries. It provides various methods for logging different types of messages and supports templating for structured log messages.

## Installation

Install the MongoLogger 2.0 package via npm:

```bash
npm install mongo-logger-2.0
```

## Usage

### Initialize MongoLogger

First, initialize MongoLogger with your MongoDB connection URI. Since initialization may take some time to connect to the database, make sure to use `await` or handle promises accordingly:

```javascript
const MongoLogger = require("mongo-logger-2.0");
const logger = new MongoLogger("mongodb://localhost:27017/mydb");

async function initializeLogger() {
  try {
    await logger.initialize();
    console.log("MongoLogger initialized successfully");
  } catch (err) {
    console.error("Failed to initialize MongoLogger:", err);
  }
}

// Call the initialize function
initializeLogger();
```

> [!WARNING]
>
> **Note:** By default, logs are not printed to the console (`print` option is `false`). If you wish to print logs to the console, explicitly set the `print` option to `true` when using logging methods.

### Logging Methods

MongoLogger 2.0 provides methods to log messages of different types (`error`, `info`, `warn`, `debug`, `fatal`):

```javascript
// Logging examples
logger.error("An error occurred", { print: true });
logger.info("Information message");
logger.warn("Warning message", { print: true });
logger.debug("Debugging message");
logger.fatal("Fatal error", { print: true });
```

Each logging method accepts a message string and an optional `option` object with a `print` property to specify whether to print the log to the console.

### Creating a New Type Method

To create a new log type, use `logger.new`. This method simplifies adding a log entry of a specified type and message to the database. Here's how you can use it:

1. **Type**: Specify the type of log entry.
2. **Message**: Provide the log message.
3. **Options**: Include additional options such as `print` to control console logging.

Example:

```javascript
logger.new("type", "This is a new type of log", { print: true });
```

### Templating

MongoLogger 2.0 supports templating for structured log messages. Use `createTemplate` to define templates and `useTemplate` to apply them:

```javascript
// Create a template
logger.createTemplate(
  "error",
  "errorTemplate",
  "Error occurred: {% message %}"
);

// Use the template with data
logger.useTemplate(
  "errorTemplate",
  { message: "Connection timeout" },
  { print: true }
);

// Note: Templates are not persisted in the database. You need to recreate them upon API restart.
```

### Retrieving Logs

You can retrieve logs based on various criteria such as date range, log type, and more:

```javascript
// Retrieve logs for a specific date
const date = new Date("2023-07-15");
logger
  .getLogForDay(date, { type: "error" })
  .then((logs) => {
    console.log("Logs for 2023-07-15:", logs);
  })
  .catch((err) => {
    console.error("Error retrieving logs:", err);
  });

// Retrieve logs between two dates
const startDate = new Date("2023-07-01");
const endDate = new Date("2023-07-15");
logger
  .getLogBetweenDate(startDate, endDate, { type: "warn" })
  .then((logs) => {
    console.log("Logs between 2023-07-01 and 2023-07-15:", logs);
  })
  .catch((err) => {
    console.error("Error retrieving logs:", err);
  });
```

### Printing Logs

Print logs directly to the console using `printLogForDay` or `printLogBetweenDate` methods:

```javascript
// Print logs for a specific date
const date = new Date("2023-07-15");
logger.printLogForDay(date, { type: "error" }).catch((err) => {
  console.error("Error printing logs:", err);
});

// Print logs between two dates
const startDate = new Date("2023-07-01");
const endDate = new Date("2023-07-15");
logger
  .printLogBetweenDate(startDate, endDate, { type: "warn" })
  .catch((err) => {
    console.error("Error printing logs:", err);
  });
```

### Creating Log Files

Create JSON log files using `createLogFileForDay` or `createLogFileBetweenDate` methods:

```javascript
// Create a log file for logs on a specific date
const date = new Date("2023-07-15");
logger
  .createLogFileForDay(date, "./logs/log-2023-07-15.json", { type: "error" })
  .catch((err) => {
    console.error("Error creating log file:", err);
  });

// Create a log file for logs between two dates
const startDate = new Date("2023-07-01");
const endDate = new Date("2023-07-15");
logger
  .createLogFileBetweenDate(
    startDate,
    endDate,
    "./logs/log-2023-07-01-to-2023-07-15.json",
    { type: "warn" }
  )
  .catch((err) => {
    console.error("Error creating log file:", err);
  });
```

### Configuration Options

- **dbUri**: The MongoDB connection URI.
- **print**: An optional configuration option for logging methods to print the log to the console.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
