"use strict";
const jwt = require("jsonwebtoken");
const { User } = require("../models");

class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    res.render("login");
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      const usuario = await User.findOne({ email });

      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = res.__("Invalid credentials");
        res.render("login");
        return;
      }

      req.session.loggedUser = {
        _id: usuario._id,
      };

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      const usuario = await User.findOne({ email });

      if (!usuario || !(await usuario.comparePassword(password))) {
        res.json({ error: "Invalid credentials" });
        return;
      }

      req.session.loggedUser = {
        _id: usuario._id,
      };

      jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // devolver al cliente el token generado
          res.json({ token: jwtToken });
        }
      );
    } catch (err) {
      next();
    }
  }
}
module.exports = LoginController;
