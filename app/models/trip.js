// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Docs for referencing 'User._id' via 'TripSchma.auther'
// http://mongoosejs.com/docs/populate.html

// user schema 
var TripSchema   = new Schema({
	title: String,
    description: String,
    country: String,
    author: { type: Schema.ObjectId, ref: 'User' },
    thumbnail: { type: String, default: 'default.jpg' },
    content: [{
    	datatype: { type: String },
    	content: { type: String }
    }],
    date: { type: Date, default: Date.now },
    public_trip: { type: Boolean, default: true }
});

TripSchema.index({ title: 'text', country: 'text' });

// return the model
module.exports = mongoose.model('Trip', TripSchema);