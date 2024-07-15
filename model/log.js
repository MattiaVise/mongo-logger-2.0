const createSchema = (mongoose) => {
    const logSchema = new mongoose.Schema({
        timestamp: { type: Date, default: Date.now },
        message: { type: String, required: true },
        type: { type: String }
    
    });

    return mongoose.model("Log", logSchema);
};

module.exports = { createSchema };
