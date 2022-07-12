class DianaController {
  
    async getSurprise(req, res, next){
      try{
        return res.status(200).send("Это сюрприз");
      }catch(err){console.log(err);}
    }
  
  }
  
  module.exports = new DianaController();
  