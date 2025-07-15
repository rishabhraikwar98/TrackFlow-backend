const ValidationMiddleware =(schema) => (req, res, next) => {
  try {
    const parseBody =  schema.parse(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    return res.status(400).json({ message: err?.issues[0]?.message });
  }
};
module.exports = ValidationMiddleware;
