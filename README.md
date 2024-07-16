# Mongo-Logger-2.0

MongoLogger is a Node.js module designed to facilitate logging into a MongoDB database. It provides various functionalities such as adding logs, retrieving logs, printing logs, and exporting logs to JSON files.

## Getting Started

```javascript
const MongoLogger = require("mongo-logger-2.0");
const logger = new MongoLogger("mongodb://localhost:27017/loggerDb");
await logger.initialize();
```

> **Note:** Make sure to use `await` before `initialize` because it requires time to establish the connection with the database.

## Logger Methods

### `logger.info()`

Adds a new info log. Optionally prints to the console (default: `print: false`).

```javascript
logger.info("Log Message", { print: true });
```

### `logger.error()`

Adds a new error log. Optionally prints to the console (default: `print: false`).

```javascript
logger.error("Log Message", { print: true });
```

### `logger.warn()`

Adds a new warn log. Optionally prints to the console (default: `print: false`).

```javascript
logger.warn("Log Message", { print: true });
```

### `logger.debug()`

Adds a new debug log. Optionally prints to the console (default: `print: false`).

```javascript
logger.debug("Log Message", { print: true });
```

### `logger.fatal()`

Adds a new fatal log. Optionally prints to the console (default: `print: false`).

```javascript
logger.fatal("Log Message", { print: true });
```

### `logger.new()`

Adds a new log of a specified type. Optionally prints to the console (default: `print: false`).

```javascript
logger.new("error", "Log Message", { print: true });
```

Console output:

```
error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | Log Message
```

### `logger.printLogs()`

Prints logs with an optional limit and type filter. If not specified, prints all logs.

```javascript
logger.printLogs({ limit: 3, type: "error" });
```

Console output:

```
error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
```

### `logger.toString()`

Retrieves logs as a string with an optional limit and type filter. If not specified, retrieves all logs.

```javascript
let result = await logger.toString({ limit: 3, type: "error" });
```

Result:

```
error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
```

### `logger.findLogs()`

Finds logs in the database with an optional limit and type filter.

```javascript
const result = await logger.findLogs({ limit: 3, type: "error" });
```

Result:

```json
[
  {
    "_id": "66953d27530ee005cc5ee467",
    "message": "error 3",
    "type": "error",
    "timestamp": "2024-07-15T15:15:51.709Z",
    "__v": 0
  },
  {
    "_id": "66953d0ba38a87b35d9d0d03",
    "message": "error 2",
    "type": "error",
    "timestamp": "2024-07-15T15:15:23.904Z",
    "__v": 0
  },
  {
    "_id": "66953ce72c74ca0fa0cffe2c",
    "message": "error 1",
    "type": "error",
    "timestamp": "2024-07-15T15:14:47.898Z",
    "__v": 0
  }
]
```

### `logger.createLogFileForDay()`

Creates a JSON log file for a specific day with an optional type filter.

```javascript
await logger.createLogFileForDay(Date.now(), "./file.json", { type: "error" });
```

### `logger.printLogForDay()`

Prints logs for a specific day with an optional type filter.

```javascript
await logger.printLogForDay(Date.now(), { type: "error" });
```

Console output:

```
error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
```

### `logger.getLogForDay()`

Retrieves logs for a specific day with an optional type filter.

```javascript
const result = await logger.getLogForDay(Date.now(), { type: "error" });
```

Result:

```json
[
  {
    "_id": "66953d27530ee005cc5ee467",
    "message": "error 3",
    "type": "error",
    "timestamp": "2024-07-15T15:15:51.709Z",
    "__v": 0
  },
  {
    "_id": "66953d0ba38a87b35d9d0d03",
    "message": "error 2",
    "type": "error",
    "timestamp": "2024-07-15T15:15:23.904Z",
    "__v": 0
  },
  {
    "_id": "66953ce72c74ca0fa0cffe2c",
    "message": "error 1",
    "type": "error",
    "timestamp": "2024-07-15T15:14:47.898Z",
    "__v": 0
  }
]
```

### `logger.getLogBetweenDate()`

Retrieves logs between two specific dates with an optional type filter.

```javascript
const result = await logger.getLogBetweenDate(firstDate, secondDate, { type: "error" });
```

Result:

```json
[
  {
    "_id": "66953d27530ee005cc5ee467",
    "message": "error 3",
    "type": "error",
    "timestamp": "2024-07-15T15:15:51.709Z",
    "__v": 0
  },
  {
    "_id": "66953d0ba38a87b35d9d0d03",
    "message": "error 2",
    "type": "error",
    "timestamp": "2024-07-15T15:15:23.904Z",
    "__v": 0
  },
  {
    "_id": "66953ce72c74ca0fa0cffe2c",
    "message": "error 1",
    "type": "error",
    "timestamp": "2024-07-15T15:14:47.898Z",
    "__v": 0
  }
]
```

### `logger.printLogBetweenDate()`

Prints logs between two specific dates with an optional type filter.

```javascript
await logger.printLogBetweenDate(firstDate, secondDate, { type: "error" });
```

Console output:

```
error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
```

### `logger.createLogFileBetweenDate()`

Creates a JSON log file between two specific dates with an optional type filter.

```javascript
await logger.createLogFileBetweenDate(firstDate, secondDate, "./file.json", { type: "error" });
```