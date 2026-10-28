const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    trackingNumber: String
});

module.exports = mongoose.model('Tracking', trackingSchema);
