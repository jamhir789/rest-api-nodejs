const Role = require("../models/role");
const User = require("../models/user");

const RolValidate = async (rol = "") => {
  const existRole = await Role.findOne({ rol });
  if (!existRole) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const EmailValidate = async (correo = "") => {
  const existEmail = await User.findOne({ correo });
  if (existEmail) {
    throw new Error(`El Correo: ${correo}, ya esta registrado`);
  }
};

const ExistUsuario = async (id) =>{
  const ExisteUsuario = await User.findById(id);
  if(!ExisteUsuario){
    throw new Error(`El usuario con ID: ${id}, no existe`);
  }
}

module.exports = {
  RolValidate,
  EmailValidate,
  ExistUsuario
};
