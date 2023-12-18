const Joi = require('joi');

const validatePostData = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    latitude: Joi.number(),
    longitude: Joi.number(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = { validatePostData };
