const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const userGet = async (req = request, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const consulta = { estado: true };

  const [total, usuarios] = await Promise.all([
    User.countDocuments(consulta),
    User.find(consulta).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const userPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  try {
    const usuario = new User(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password.toString(), salt);

    await usuario.save();
    res.json({
      msg: "Post",
      usuario,
    });
  } catch (error) {
    console.log(error);
    123;
    res.status(500).json({
      ok: false,
      msg: "error inesperado revisar log",
    });
  }
};

const userPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password.toString(), salt);
  }
  try {
    const usuario = await User.findByIdAndUpdate(id, resto);
    res.json({
      msg: "PUT -Controllador",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "error inesperado revisar log",
    });
  }
};

const userDelete = async (req, res) => {
  const { id } = req.params;
  //fisicamente
  //const usuario = User.findByIdAndDelete(id);
  const usuario = await User.findByIdAndUpdate(id, { estado: false });

  res.json({
    id,
    usuario,
    msg: "Delete",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
