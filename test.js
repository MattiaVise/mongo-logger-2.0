async function createLogger() {
    const logger = new MongoLogger("mongodb://192.168.1.22:27017/loggerDb");
    try {
        await logger.initialize();
        await logger.log('Hello, MongoDB!');
    } catch (error) {
        console.error('Error:', error);
    }
    return logger
}

const logger = createLogger();


