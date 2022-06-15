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
      const { email, password, role, username, photo, phone } = req.body;
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
      return res.json({ updatePassword });
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }

  async updateName(req, res, next) {
    try {
      const { email, newName } = req.body;
      const user = await models.users.findOne({ where: { email } });
      if (!user) {
        return ApiError.badRequest("Request returned empty");
      }
      const updateName = await models.users.update(newName, {
        where: { email: email },
      });
      return res.json({ updateName });
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }
  async updateEmail(req, res, next) {
    try {
      const { email, newEmail } = req.body;
      const user = await models.users.findOne({ where: { email } });
      if (!user) {
        return ApiError.badRequest("Request returned empty");
      }
      const updateEmail = await models.users.update(newEmail, {
        where: { email: email },
      });
      return res.json({ updateEmail });
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }

  async get(req, res, next) {
    models.users
      .findAll({
        include: [
          {
            model: models.user_details,
            as: "user_details",
          },
        ],
      })
      .then((users) => {
        res.status(200).send(users);
      });
  }

  async create(req, res, next) {
    models.users.create(
      {
        name: req.body.name,
        username: req.body.username,
        photo: req.body.photo,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        user_details: {
          verification: req.body.verification,
          bio: req.body.bio,
        },
      },
      {
        include: {
          model: models.user_details,
          as: "user_details",
        },
      }
    );
    res.status(200).send("user");
  }
}

module.exports = new UserController();
