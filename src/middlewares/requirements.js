import sanitize from 'mongo-sanitize';

export default (...requirements) => (req, res, next) => {
  for (const requirement of requirements) {
    if (requirement.required && !(requirement.value in req.body)) {
      return res.json({ statusCode: 417, requirement: requirement.value });
    }

    const value = sanitize(req.body[requirement.value]);

    if (typeof value === 'object') {
      req.body[requirement.value] = JSON.stringify(value);
    }
  }

  return next();
};
