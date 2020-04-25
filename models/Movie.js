const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
    director_id: {
        type : Schema.Types.ObjectId,
        ref :'Director'
    },

    title: {
       type: String,
        //Validasyon ilk parametre istenilen değer, ikinci parametre mesaj
       required:[true,"`{PATH}` alanı zoruldur."],
        maxlength: [15, "`{PATH}` alanı ({VALUE}), en fazla ({MAXLENGTH} karanter olabilir"],
        minlength: [4, "`{PATH}` alanı ({VALUE}), en az {MINLENGTH} karakter olmalıdır"]
   },
    category: String,
    country: String,
    year: {
      type: Number,
      max: 2040,
      min: 1900
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);