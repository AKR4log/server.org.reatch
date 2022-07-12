const models = require("../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../../error/apiError");

const generationJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async register(req, res, next) {
    try {
      const { email, password, role, username, photo, phone,name } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Not a complete request"));
      }
      const candidate = await models.users.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest("Failed to complete request"));
      }
      const hashPassword = await bcrypt.hash(password, 4);
      const user = await models.users.create({
        email,
        role,
        password: hashPassword,
        username: username,
        photo: photo,
        phone: phone,
        name: name
      });
      const token = generationJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (err) {}
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await models.users.findOne({ where: { email } });
      if (!user) {
        return ApiError.badRequest("Request returned empty");
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return ApiError.badRequest("Request returned with authorization error");
      }
      const token = generationJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }

  async check(req, res, next) {
    try {
      const token = generationJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }

  async updatePassword(req, res, next) {
    try {
      const { email, password, newPassword } = req.body;
      const user = await models.users.findOne({ where: { email } });
      if (!user) {
        return ApiError.badRequest("Request returned empty");
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return ApiError.badRequest("Request returned with authorization error");
      }
      const hashPassword = await bcrypt.hash(newPassword, 4);
      const updatePassword = await models.users.update(hashPassword, {
        where: { email: email },
      });
      return res.status(200).send(updatePassword);
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }

  async subscribe(req, res, next) {
    try {
      const { idolUsername, subUsername } = req.body;
      const idol = await models.users.findOne({ where: { username: idolUsername } });
      const subscriber = await models.users.findOne({ where: { username: subUsername } });
      idol.addSubscribe(subscriber);
      return res.status(200).send(idol);
    }
    catch(err){
      console.log(err);
    }
  }

  async unSubscribe(req, res, next) {
    try {
      const { idolUsername, subUsername } = req.body;
      const idol = await models.users.findOne({ where: { username: idolUsername } });
      const subscriber = await models.users.findOne({ where: { username: subUsername } });
      idol.addSubscribe(subscriber);
      return res.status(200).send(idol);
    }
    catch(err){
      console.log(err);
    }
  }

  async getSubscribers(req, res, next){
    try{
      const { idolUsername } = req.body;
      const idol = await models.users.findOne({ where: { username: idolUsername }});
      return res.status(200).send(await idol.getSubscribe());
    }catch(err){console.log(err);}
  }

  async getSubscriptions(req, res, next){
    try{
      const { subUsername } = req.body;
      const subscriber = await models.users.findOne({ where: { username: subUsername }});
      return res.status(200).send(await subscriber.getBackSubscribe());
    }catch(err){console.log(err);}
  }

}

module.exports = new UserController();
