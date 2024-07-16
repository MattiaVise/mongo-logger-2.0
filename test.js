const MongoLogger = require("./index")

const run = async () => {
    const logger = new MongoLogger("mongodb://192.168.1.22:27017/loggerDb")
    await logger.initialize()

    logger.createTemplate("error", "giovanni", "hello {% name %}")
    console.log(logger.useTemplate("giovnni", {name: "mattia"}))
}

run()


