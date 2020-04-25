const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


//Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("merhaba");
  //res.render('index', { title: 'Express' });
});

router.post('/register', (req,res,next) => {
  const {username,password} = req.body;
  //şifreli bir şekilde paassword ü tutmak için
  bcrypt.hash(password,10).then((hash) => {
    const user = new User({
      //username = username;
      username,
      //password = password;
      password: hash
    });

    const promise = user.save();
    promise.then((data) =>  {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});


router.post('/authenticate', (req,res) => {
  const {username,password} = req.body;
  User.findOne({
    username
  }, (err,user) => {
    if(err)
      throw err;
    if(!user){
      res.json({
        status: false,
        message: 'Authentication failed, user not found.'
      })
    }else{
      bcrypt.compare(password, user.password).then((result) => {
        if(!result){
          res.json({
            status: false,
            message: 'Authentication failed, wrong password'
          });
        }else{
          const payload = {
            username
          };
          //expiresIn minute cinsinden 720 12 saat demek
          /*
          jwt token 3 kısımdan oluşur
          header.payload.verify_signature
          header : algoritma türü ve typ(JWT)
          payload : client tarafına gönderilmek istenilen veri.
                    burada önemli bilgileri göndermemek gerekir.
                    sadece unique bir id göndersek yeterlidir
          verify  : burayada kendi oluşturduğumuz secret_key i yazarız
          diğer parametreler isteğe bağlıdır.
          */
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{expiresIn: 720});
          res.json({
            status: true,
            token
          });
        }
      });
    }
  });
});

module.exports = router;
