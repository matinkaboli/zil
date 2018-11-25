import check from 'Root/utils/check';

export default (...requirements) => (req, res, next) => {
  for (const requirement of requirements) {
    if (requirement.required && !(requirement.value in req.params)) {
      return res.status(417).json({
        requirement: requirement.value,
        description: `The server needs parameter *${requirement.value}* to be sent from the client.`,
      });
    }

    req.params[requirement.value] = check(req.params[requirement.value]);
  }

  return next();
};
