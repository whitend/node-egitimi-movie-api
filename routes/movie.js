const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

/*
router.get('/', (req, res, next) => {

  res.send('respond with a resource');
});
*/


router.post('/add', (req,res,next) => {

  /*
  const data = req.body;
  const movie = new Movie({
    title: data.title,
    imdb_score: data.imdb_score,
    category: data.category,
    country: data.country,
    year: data.year
  });
  */
  //zaten json objesi geldiği için direk olarak body i içerisine de yazabiliriz
  const movie = new Movie(req.body);
/*
  movie.save((err,result) => {
    if(err)
      res.json(err);
    res.json({status:1});
  })
  */
  //daha temiz bir kodlama için
  const promise = movie.save();
  promise.then((data) => {
    //res.json({status:1});
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//list all films
router.get('/', (req,res) => {
  const promise = Movie.find({ });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

//top10 sıralaması

router.get('/top10', (req,res) => {
  const promise = Movie.find({}).sort({imdb_score: -1}).limit(10);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//id ye göre film arama
router.get('/:movie_id', (req,res,next) => {
//  res.send(req.params);
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie) => {
    //console.log(typeof  movie);
    if(!movie){
      //next içerisine yazılanı error handler a gönderiyor app.js içerisinde
      next({ message: 'The movie was not found', code: 99 });
      //return koyarak sadece yazdığımız kadar error gönderir kendi errorlarını keser
      //https://stackoverflow.com/questions/52122272/err-http-headers-sent-cannot-set-headers-after-they-are-sent-to-the-client
      //return;
    }else{
      res.json(movie);
    }
  }).catch((err) => {
    res.json(err);
  });
});

//id ye göre update işlemi
//sadece gönderilen değerleri günceller diğer değerleri güncellemez.
router.put('/:movie_id', (req,res,next) => {
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body
      //yukarıdaki şekilde kalırsa geri dönüş olarak eski datayı gönderir
      ,{new:true} //güncellenmiş veriyi geri gönderir
  );
  promise.then((movie) => {
    if(!movie){
      next({message: 'The movie was not found', code: 98});
    }else{
      //res.json(movie);
      //res.json({status : 1});
    }
  }).catch((err) => {
    res.json(err);
  })
});

//id ye göre film silme
router.delete('/:movie_id', (req,res,next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) => {
    if(!movie){
      next({message : 'The movie was not found', code: 97});
    }else{
      res.json({status :1});
    }
  }).catch((err) => {
    res.json(err);
  });
});

//Between kullanımı

router.get('/between/:start_year/:end_year', (req,res) => {
  const {start_year,end_year} = req.params;
  const promise = Movie.find({
    year: {'$gte': parseInt(start_year), "$lte": parseInt(end_year)}
  });

  promise.then((movies) => {
    res.json(movies);
  }).catch((err) => {
    res.json(err);
  });
});



module.exports = router;
