import { Joi, Segments } from "celebrate";

const authValidation = () => {
  const register = {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      username: Joi.string().min(4).required(),
    }),
  };

  const login = {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };

  const logout = {
    [Segments.BODY]: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  };

  const refreshTokens = {
    [Segments.BODY]: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  };

  const forgotPassword = {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  };

  const resetPassword = {
    [Segments.QUERY]: Joi.object().keys({
      token: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
    }),
  };

  const verifyEmail = {
    [Segments.QUERY]: Joi.object().keys({
      token: Joi.string().required(),
    }),
  };

  return {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail,
  };
};

export default authValidation;
