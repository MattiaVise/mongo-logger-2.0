const MongoLogger = require("./index")

const run = async () => {
    const logger = new MongoLogger("mongodb://192.168.1.22:27017/loggerDb")
    logger.initialize()

    let result = await logger.findLogs({limit: 3, type: "debug"})
    logger.info()
}

run()


