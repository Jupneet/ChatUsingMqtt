var mongoose  = require('mongoose');
var Schema   = mongoose.Schema;

var chatUserSchema = new Schema({
	id : String,
    name: String,
    contact_number : Number,
    image_url : String
});

module.exports = mongoose.model('chat_users_data', chatUserSchema);