# MongoDB-Logger

  

MongoLogger is a Node.js module designed to facilitate logging into a MongoDB database and performing various operations such as adding logs, retrieving logs, printing logs, and exporting logs to JSON files.

How to start:

    const  MongoLogger  =  require("mongo-logger-2.0")
    
    const  logger  =  new  MongoLogger("mongodb://localhost:27017/loggerDb")
    await logger.initialize() 
  

Note: Make sure to use `await` before `initialize` because it requires time to establish the connection with the database.

### logger.new()
 Add a new log. You can choose to print to the console.

    logger.new("error", "Log Message", {print: true})
	
console:

    error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) |	Log Message
  ### logger.printLogs()
Print logs with optional limit and type filter. If not specified, prints all logs.

    logger.printLogs({limit: 3, type: error})
console:

    error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
    error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
    error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
   ### logger.toString()
Retrieve logs as a string with optional limit and type filter. If not specified, retrieves all logs.

    let result = await logger.toString({limit: 3, type: error})
result: 

    error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
    error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
    error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
  ### logger.findLogs()
 Find logs in the database with optional limit and type filter.

    const result = await logger.findLogs({limit: 3, type: error})
result:

    [
      {
        _id: new ObjectId('66953d27530ee005cc5ee467'),
        message: 'error 3',
        type: 'error',
        timestamp: 2024-07-15T15:15:51.709Z,
        __v: 0
      },
      {
        _id: new ObjectId('66953d0ba38a87b35d9d0d03'),
        message: 'error 2',
        type: 'error',
        timestamp: 2024-07-15T15:15:23.904Z,
        __v: 0
      },
      {
        _id: new ObjectId('66953ce72c74ca0fa0cffe2c'),
        message: 'error 1',
        type: 'error',
        timestamp: 2024-07-15T15:14:47.898Z,
        __v: 0
      }
    ]
  ### logger.createLogFileForDay()
 Create a JSON log file for a specific day.

    await logger.createLogFileForDay(Date.now(), "./file.json", {type: error})
  ### logger.printLogForDay()
 Print logs for a specific day with optional type filter.

    await logger.printLogForDay(Date.now(), {type: error})
console:

    error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
    error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
    error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
  ### logger.getLogForDay()
 Retrieve logs for a specific day with optional type filter.

    const result = await logger.getLogForDay(Date.now(), {type: error})
result:

    [
      {
        _id: new ObjectId('66953d27530ee005cc5ee467'),
        message: 'error 3',
        type: 'error',
        timestamp: 2024-07-15T15:15:51.709Z,
        __v: 0
      },
      {
        _id: new ObjectId('66953d0ba38a87b35d9d0d03'),
        message: 'error 2',
        type: 'error',
        timestamp: 2024-07-15T15:15:23.904Z,
        __v: 0
      },
      {
        _id: new ObjectId('66953ce72c74ca0fa0cffe2c'),
        message: 'error 1',
        type: 'error',
        timestamp: 2024-07-15T15:14:47.898Z,
        __v: 0
      }
    ]

  ### logger.getLogBetweenDate()
 Retrieve logs between two specific dates with optional type filter.

    const result = await logger.getLogForDay(firstDate, secondDate, {type: error})
result:

    [
      {
        _id: new ObjectId('66953d27530ee005cc5ee467'),
        message: 'error 3',
        type: 'error',
        timestamp: 2024-07-15T15:15:51.709Z,
        __v: 0
      },
      {
        _id: new ObjectId('66953d0ba38a87b35d9d0d03'),
        message: 'error 2',
        type: 'error',
        timestamp: 2024-07-15T15:15:23.904Z,
        __v: 0
      },
      {
        _id: new ObjectId('66953ce72c74ca0fa0cffe2c'),
        message: 'error 1',
        type: 'error',
        timestamp: 2024-07-15T15:14:47.898Z,
        __v: 0
      }
    ]
   ### logger.printLogBetweenDate()
 Print logs between two specific dates with optional type filter.

    await logger.printLogForDay(firstDate, secondDate, {type: error})
console:

    error | Mon Jul 15 2024 17:10:50 GMT+0200 (Central European Summer Time) | error 1
    error | Mon Jul 15 2024 17:10:33 GMT+0200 (Central European Summer Time) | error 2
    error | Mon Jul 15 2024 15:55:53 GMT+0200 (Central European Summer Time) | error 3
   ### logger.createLogFileForDay()
 Create a JSON log file between two specific dates with optional type filter.

    await logger.createLogFileBetweenDate(firstDate, secondDate, "./file.json", {type: error})
   
   
