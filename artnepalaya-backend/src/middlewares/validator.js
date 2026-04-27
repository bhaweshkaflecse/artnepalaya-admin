export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (error) {
    next(error); // Passes to global error handler
  }
};