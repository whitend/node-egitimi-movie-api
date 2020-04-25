const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if(token){

        jwt.verify(token, req.app.get('api_secret_key'), (err,decoded) => {
           if(err){
               res.json({
                   status: false,
                   message: 'Failed to autheticate token.'
               });
           }else{
               req.decode = decoded;
               //console.log(decoded);
               //{ username: 'whitend06', iat: 1587850503, exp: 1587851223 }
               //iat oluşturulma, exp expire olma tarihi
               //önce middleware kısmı çalışacak
               //daha sonra nereye gideceksen git dediğimiz yer bu next() kısmı.
               next();
           }
        });


    }else{
        res.json({
            status: false,
            message: 'No token provided'
        })
    }
}