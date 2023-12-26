const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório.")
      .isString()
      .withMessage("O título é obrigatório.")
      .isLength({min: 3})
      .withMessage("O título precisa ter no minímo 3 caracteres."),
      body('image').custom((value, {req}) => {
        if(!value.req){
          throw new Error('A imagem é obrigatória.')
        }
        return true;
      }),
  ];
};

module.exports = {
  photoInsertValidation,
}