const { default: mongoose } = require("mongoose");
const Schema = require("./model/log")
const fs = require('fs');
const { green, red } = require('kleur')

const print = (type, timestamp, message) => {
    console.log(red(type) + " | " + green(timestamp) + " | " + message)
}

class MongoLogger {

    constructor(dbUri) {
        this.dbUri = dbUri
        this.logSchema = null
        this.templates = []
    }

    /**
     * Initializes the database connection and sets up event listeners for connection status.
     * Attempts to create the schema for logging.
     * 
     * @async
     * @throws Will throw an error if the connection to MongoDB fails.
     */
    async initialize() {
        try {
            await mongoose.connect(this.dbUri);

            mongoose.connection.on('connected', () => {
                console.log(`Mongoose connected to ${this.dbUri}`);
            });

            mongoose.connection.on('error', (err) => {
                console.log('Mongoose connection error:', err);
            });

            mongoose.connection.on('disconnected', () => {
                console.log('Mongoose disconnected');
            });

            this.logSchema = Schema.createSchema(mongoose);
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
        }
    }

    /**
     * Creates a new log entry in the database.
     * 
     * This method will add a log entry of the specified type and message to the database.
     * If the logger is not initialized, it will log an error message.
     * 
     * @async
     * @param {string} type - The type of log entry.
     * @param {string} message - The log message.
     * @param {Object} option - Additional options for logging.
     * @param {boolean} option.print - If true, prints the log to the console.
     * @throws Will throw an error if there is an issue adding the log entry to the database.
     */
    async new(type, message, option) {
        if (!this.logSchema) {
            console.error('MongoLogger not initialized');
            return;
        }
        try {

            const result = await this.logSchema.create({ type, message });
            if (option.print) {
                print(type, Date.now(), message)
            }
        } catch (err) {
            console.error('Error adding log entry:', err);
        }
    }

    /**
     * Creates a new error entry in the database.
     * 
     * This method will add a log entry of the specified type and message to the database.
     * If the logger is not initialized, it will log an error message.
     * 
     * @async
     * @param {string} message - The log message.
     * @param {Object} option - Additional options for logging.
     * @param {boolean} option.print - If true, prints the log to the console.
     * @throws Will throw an error if there is an issue adding the log entry to the database.
     */
    async error(message, option) {
        if (!this.logSchema) {
            console.error('MongoLogger not initialized');
            return;
        }
        try {

            const result = await this.logSchema.create({ type: "error", message });
            if (option.print) {
                print("error", Date.now(), message)
            }
        } catch (err) {
            console.error('Error adding log entry:', err);
        }
    }

    /**
     * Creates a new error entry in the database.
     * 
     * This method will add a log entry of the specified type and message to the database.
     * If the logger is not initialized, it will log an error message.
     * 
     * @async
     * @param {string} message - The log message.
     * @param {Object} option - Additional options for logging.
     * @param {boolean} option.print - If true, prints the log to the console.
     * @throws Will throw an error if there is an issue adding the log entry to the database.
     */
    async info(message, option) {
        if (!this.logSchema) {
            console.error('MongoLogger not initialized');
            return;
        }
        try {

            const result = await this.logSchema.create({ type: "info", message });
            if (option.print) {
                print("info", Date.now(), message)
            }
        } catch (err) {
            console.error('Error adding log entry:', err);
        }
    }


    /**
     * Creates a new warn entry in the database.
     * 
     * This method will add a log entry of the specified type and message to the database.
     * If the logger is not initialized, it will log an error message.
     * 
     * @async
     * @param {string} message - The log message.
     * @param {Object} option - Additional options for logging.
     * @param {boolean} option.print - If true, prints the log to the console.
     * @throws Will throw an error if there is an issue adding the log entry to the database.
     */
    async warn(message, option) {
        if (!this.logSchema) {
            console.error('MongoLogger not initialized');
            return;
        }
        try {

            const result = await this.logSchema.create({ type: "warn", message });
            if (option.print) {
                print("warn", Date.now(), message)
            }
        } catch (err) {
            console.error('Error adding log entry:', err);
        }
    }

    /**
     * Creates a new fatal entry in the database.
     * 
     * This method will add a log entry of the specified type and message to the database.
     * If the logger is not initialized, it will log an error message.
     * 
     * @async
     * @param {string} message - The log message.
     * @param {Object} option - Additional options for logging.
     * @param {boolean} option.print - If true, prints the log to the console.
     * @throws Will throw an error if there is an issue adding the log entry to the database.
     */
    async fatal(message, option) {
        if (!this.logSchema) {
            console.error('MongoLogger not initialized');
            return;
        }
        try {

            const result = await this.logSchema.create({ type: "fatal", message });
            if (option.print) {
                print("fatal", Date.now(), message)
            }
        } catch (err) {
            console.error('Error adding log entry:', err);
        }
    }

    /**
     * Creates a new debug entry in the database.
     * 
     * This method will add a log entry of the specified type and message to the database.
     * If the logger is not initialized, it will log an error message.
     * 
     * @async
     * @param {string} message - The log message.
     * @param {Object} option - Additional options for logging.
     * @param {boolean} option.print - If true, prints the log to the console.
     * @throws Will throw an error if there is an issue adding the log entry to the database.
     */
    async debug(message, option) {
        if (!this.logSchema) {
            console.error('MongoLogger not initialized');
            return;
        }
        try {

            const result = await this.logSchema.create({ type: "debug", message });
            if (option.print) {
                print("debug", Date.now(), message)
            }
        } catch (err) {
            console.error('Error adding log entry:', err);
        }
    }

    /**
     * Prints log entries from the database based on the provided options.
     * 
     * This method retrieves and prints log entries from the database, 
     * with options to filter by type and limit the number of entries.
     * 
     * @async
     * @param {Object} option - Options for retrieving logs.
     * @param {boolean} option.limit - If true, limits the number of log entries retrieved.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @returns {Array} An array of log entries if an error occurs.
     */
    async printLogs(option) {
        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }
            let logs
            if (option.limit) {
                if (option.type) {
                    logs = await this.logSchema.find({ type: option.type })
                        .sort({ timestamp: -1 })
                        .limit(realLimit)
                } else {
                    logs = await this.logSchema.find()
                        .sort({ timestamp: -1 })
                        .limit(realLimit)
                }
            } else {
                if (option.type) {
                    logs = await this.logSchema.find({ type: option.type })
                        .sort({ timestamp: -1 })
                } else {
                    logs = await this.logSchema.find()
                        .sort({ timestamp: -1 })
                }
            }

            logs.map((x) => {
                print1(x.type, x.timestamp, x.message)
            })

        } catch (err) {
            return [];
        }
    }

    /**
     * Retrieves log entries from the database based on the provided options.
     * 
     * This method retrieves log entries from the database, with options to filter by type
     * and limit the number of entries. It returns an array of log entries.
     * 
     * @async
     * @param {Object} option - Options for retrieving logs.
     * @param {boolean} option.limit - If true, limits the number of log entries retrieved.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @returns {Array} An array of log entries or an empty array if an error occurs.
     */
    async findLogs(option) {

        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }
            let logs
            if (option.limit) {
                if (option.type) {
                    logs = await this.logSchema.find({ type: option.type })
                        .sort({ timestamp: -1 })
                        .limit(option.limit)
                } else {
                    logs = await this.logSchema.find()
                        .sort({ timestamp: -1 })
                        .limit(option.limit)
                }
            } else {
                if (option.type) {
                    logs = await this.logSchema.find({ type: option.type })
                        .sort({ timestamp: -1 })
                } else {
                    logs = await this.logSchema.find()
                        .sort({ timestamp: -1 })
                }
            }
            return logs;
        } catch (err) {
            return [];
        }
    }

    /**
     * Creates a log file for a specific day.
     * 
     * This method retrieves log entries for a specified date, optionally filtered by type,
     * and writes them to a JSON file at the specified file path.
     * 
     * @async
     * @param {string} date - The date for which logs are to be retrieved.
     * @param {string} filePath - The file path where the log file will be created.
     * @param {Object} option - Options for retrieving logs.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @throws Will log an error if there is an issue writing the log file.
     */
    async createLogFileForDay(date, filePath, option) {
        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }

            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            let logs
            if (option.type) {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                },
                    { type: option.type }
                ).sort({ timestamp: -1 })
            } else {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                }
                ).sort({ timestamp: -1 })
            }

            const logsJSON = JSON.stringify(logs, null, 2);

            fs.writeFileSync(filePath, logsJSON);

        } catch (err) {
            console.error('Error:', err);
        }
    }

    /**
     * Prints log entries for a specific day.
     * 
     * This method retrieves log entries for a specified date, optionally filtered by type,
     * and prints them to the console.
     * 
     * @async
     * @param {string} date - The date for which logs are to be retrieved.
     * @param {Object} option - Options for retrieving logs.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @throws Will log an error if there is an issue retrieving or printing the logs.
     */
    async printLogForDay(date, option) {
        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }

            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            let logs
            if (option.type) {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                },
                    { type: option.type }
                ).sort({ timestamp: -1 })
            } else {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                }
                ).sort({ timestamp: -1 })
            }

            logs.map((x) => {
                print(x.type, x.timestamp, x.message)
            })


        } catch (err) {
            console.error('Error:', err);
        }
    }

    /**
     * Retrieves log entries for a specific day.
     * 
     * This method retrieves log entries for a specified date, optionally filtered by type,
     * and returns them as an array.
     * 
     * @async
     * @param {string} date - The date for which logs are to be retrieved.
     * @param {Object} option - Options for retrieving logs.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @returns {Array} An array of log entries or an empty array if an error occurs.
     */
    async getLogForDay(date, option) {
        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }

            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            let logs
            if (option.type) {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                },
                    { type: option.type }
                ).sort({ timestamp: -1 })
            } else {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                }
                ).sort({ timestamp: -1 })
            }



            return logs;

        } catch (err) {
            console.error('Error:', err);
        }
    }

    /**
     * Retrieves log entries between two specified dates.
     * 
     * This method retrieves log entries between two dates, optionally filtered by type,
     * and returns them as an array.
     * 
     * @async
     * @param {string} firstDate - The start date for retrieving logs.
     * @param {string} secondDate - The end date for retrieving logs.
     * @param {Object} option - Options for retrieving logs.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @returns {Array} An array of log entries or an empty array if an error occurs.
     */
    async getLogBetweenDate(firstDate, secondDate, option) {
        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }

            const startOfDay = new Date(firstDate);

            const endOfDay = new Date(secondDate);

            let logs
            if (option.type) {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                },
                    { type: option.type }
                ).sort({ timestamp: -1 })
            } else {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                }
                ).sort({ timestamp: -1 })
            }



            return logs;

        } catch (err) {
            console.error('Error:', err);
        }
    }

    /**
     * Prints log entries between two specified dates.
     * 
     * This method retrieves log entries between two dates, optionally filtered by type,
     * and prints them to the console.
     * 
     * @async
     * @param {string} firstDate - The start date for retrieving logs.
     * @param {string} secondDate - The end date for retrieving logs.
     * @param {Object} option - Options for retrieving logs.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @throws Will log an error if there is an issue retrieving or printing the logs.
     */
    async printLogBetweenDate(firstDate, secondDate, option) {
        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }

            const startOfDay = firstDate;

            const endOfDay = secondDate;

            let logs
            if (option.type) {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                },
                    { type: option.type }
                ).sort({ timestamp: -1 })
            } else {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                }
                ).sort({ timestamp: -1 })
            }


            logs.map((x) => {
                print(x.type, x.timestamp, x.message)
            })


        } catch (err) {
            console.error('Error:', err);
        }
    }

    /**
     * Creates a log file containing entries between two specified dates.
     * 
     * This method retrieves log entries between two dates, optionally filtered by type,
     * and writes them to a JSON file at the specified file path.
     * 
     * @async
     * @param {string} firstDate - The start date for retrieving logs.
     * @param {string} secondDate - The end date for retrieving logs.
     * @param {string} filePath - The file path where the log file will be created.
     * @param {Object} option - Options for retrieving logs.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @throws Will log an error if there is an issue retrieving or writing the log file.
     */
    async createLogFileBetweenDate(firstDate, secondDate, filePath, option) {
        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }

            const startOfDay = firstDate;

            const endOfDay = secondDate;


            let logs
            if (option.type) {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                },
                    { type: option.type }
                ).sort({ timestamp: -1 })
            } else {
                logs = await this.logSchema.find({
                    timestamp: { $gte: startOfDay, $lte: endOfDay }
                }
                ).sort({ timestamp: -1 })
            }

            const logsJSON = JSON.stringify(logs, null, 2);

            fs.writeFileSync(filePath, logsJSON);

        } catch (err) {
            console.error('Error:', err);
        }
    }

    /**
     * Converts log entries to a formatted string representation.
     * 
     * This method retrieves log entries based on the provided options,
     * formats them into a string, and returns the formatted string.
     * 
     * @async
     * @param {Object} option - Options for retrieving and formatting logs.
     * @param {boolean} option.limit - If true, limits the number of log entries retrieved.
     * @param {string} option.type - If provided, filters log entries by type.
     * @throws Will throw an error if the logger is not initialized.
     * @returns {string} A formatted string representation of log entries, or an error message if an error occurs.
     */
    async toString(option) {

        try {
            if (!this.logSchema) {
                throw new Error('MongoLogger not initialized');
            }
            let logs
            if (option.limit) {
                if (option.type) {
                    logs = await this.logSchema.find({ type: option.type })
                        .sort({ timestamp: -1 })
                        .limit(realLimit)
                } else {
                    logs = await this.logSchema.find()
                        .sort({ timestamp: -1 })
                        .limit(realLimit)
                }
            } else {
                if (option.type) {
                    logs = await this.logSchema.find({ type: option.type })
                        .sort({ timestamp: -1 })
                } else {
                    logs = await this.logSchema.find()
                        .sort({ timestamp: -1 })
                }
            }
            let string = ""
            logs.map((x) => {
                string = string + "\n" + x.type + " | " + x.timestamp.toString() + " | " + x.message
            })
            return string;
        } catch (err) {
            return "Error: " + err;
        }
    }

    /**
     * Creates a new template and adds it to the templates array.
     * @param {string} type - The type of the template (e.g., "error").
     * @param {string} name - The unique name or identifier of the template.
     * @param {string} string - The content or body of the template, stored as a string (e.g., "hello {% name %}").
     */
     createTemplate(type, name, string) {
        this.templates.push({ type, name, string });
    }

    /**
     * Uses a template identified by its name to generate a result based on input data,
     * and optionally prints or logs the result.
     * @param {string} name - The name or identifier of the template to use.
     * @param {Object} input - An object containing data to replace placeholders in the template.
     * @param {Object} option - An optional object containing configuration options.
     *                          - `print`: If true, prints the generated result.
     */
     useTemplate(name, input, option) {
        const template = this.templates.find(t => t.name === name);
        if (!template) {
            throw new Error(`Template '${name}' don't found.`);
        }

        let result = template.string;
        Object.keys(input).forEach(key => {
            const regex = new RegExp(`{%\\s*${key}\\s*%}`, 'g');
            result = result.replace(regex, input[key]);
        });

        if(option.print){
            print(template.type, Date.now(), result)
        }
        this.logSchema.create({type: template.type, result});
    }

}



module.exports = MongoLogger;