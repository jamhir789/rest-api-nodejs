const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validate-campos");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/user.controller");
const {
  RolValidate,
  EmailValidate,
  ExistUsuario,
} = require("../helpers/db-validators");
const router = Router();

router.get("/", userGet);
router.put(
  "/:id",
  [
    check("id", "No es un mongo ID").isMongoId(),
    check("id").custom(ExistUsuario),
    validarCampos,
  ],
  userPut
);
router.post(
  "/",
  [
    check("correo").custom(EmailValidate),
    check("rol").custom(RolValidate),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    // check("rol","No es un rol Valido").isIn(['ADMIN_ROLE','USER_ROLE']),

    validarCampos,
  ],
  userPost
);
router.delete(
  "/:id",
  [
    check("id", "No es un mongo ID").isMongoId(),
    check("id").custom(ExistUsuario),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
