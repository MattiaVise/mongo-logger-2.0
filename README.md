
# MongoLogger

MongoLogger is a logging utility that interacts with a MongoDB database to store, retrieve, and manipulate log entries. It provides various methods for logging different types of messages and supports templating for structured log messages.

## Installation

Install the MongoLogger package via npm:

```bash
npm install mongo-logger
```

## Usage

### Initialize MongoLogger

First, initialize MongoLogger with your MongoDB connection URI:

```javascript
const MongoLogger = require('mongo-logger');

const logger = new MongoLogger('mongodb://localhost:27017/mydb');

// Initialize the logger
logger.initialize()
  .then(() => {
    console.log('MongoLogger initialized successfully');
  })
  .catch(err => {
    console.error('Failed to initialize MongoLogger:', err);
  });
```

### Logging Methods

MongoLogger provides methods to log messages of different types (`error`, `info`, `warn`, `debug`, `fatal`):

```javascript
// Logging examples
logger.error('An error occurred', { print: true });
logger.info('Information message');
logger.warn('Warning message', { print: true });
logger.debug('Debugging message');
logger.fatal('Fatal error', { print: true });
```

Each logging method accepts a message string and an optional `option` object with a `print` property to specify whether to print the log to the console.

### Templating

MongoLogger supports templating for structured log messages. Use `createTemplate` to define templates and `useTemplate` to apply them:

```javascript
// Create a template
logger.createTemplate('error', 'errorTemplate', 'Error occurred: {% message %}');

// Use the template with data
logger.useTemplate('errorTemplate', { message: 'Connection timeout' }, { print: true });
```

### Retrieving Logs

You can retrieve logs based on various criteria such as date range, log type, and more:

```javascript
// Retrieve logs for a specific date
logger.getLogForDay('2023-07-15', { type: 'error' })
  .then(logs => {
    console.log('Logs for 2023-07-15:', logs);
  })
  .catch(err => {
    console.error('Error retrieving logs:', err);
  });

// Retrieve logs between two dates
logger.getLogBetweenDate('2023-07-01', '2023-07-15', { type: 'warn' })
  .then(logs => {
    console.log('Logs between 2023-07-01 and 2023-07-15:', logs);
  })
  .catch(err => {
    console.error('Error retrieving logs:', err);
  });
```

### Printing Logs

Print logs directly to the console using `printLogForDay` or `printLogBetweenDate` methods:

```javascript
// Print logs for a specific date
logger.printLogForDay('2023-07-15', { type: 'error' })
  .catch(err => {
    console.error('Error printing logs:', err);
  });

// Print logs between two dates
logger.printLogBetweenDate('2023-07-01', '2023-07-15', { type: 'warn' })
  .catch(err => {
    console.error('Error printing logs:', err);
  });
```

### Creating Log Files

Create JSON log files using `createLogFileForDay` or `createLogFileBetweenDate` methods:

```javascript
// Create a log file for logs on a specific date
logger.createLogFileForDay('2023-07-15', './logs/log-2023-07-15.json', { type: 'error' })
  .catch(err => {
    console.error('Error creating log file:', err);
  });

// Create a log file for logs between two dates
logger.createLogFileBetweenDate('2023-07-01', '2023-07-15', './logs/log-2023-07-01-to-2023-07-15.json', { type: 'warn' })
  .catch(err => {
    console.error('Error creating log file:', err);
  });
```

### Configuration Options

- **dbUri**: The MongoDB connection URI.
- **print**: An optional configuration option for logging methods to print the log to the console.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

