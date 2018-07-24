import check from 'Root/utils/check';

export default (...requirements) => (req, res, next) => {
  for (const requirement of requirements) {
    if (requirement.required && !(requirement.value in req.body)) {
      return res.json({
        statusCode: 417,
        requirement: requirement.value,
        description: `The server needs parameter *${requirement.value}* to be sent from the client.`,
      });
    }

    req.body[requirement.value] = check(req.body[requirement.value]);
  }

  return next();
};
