export const requireProPlan = (req, res, next) => {
  if (req.user?.plan === 'pro') {
    return next();
  }

  return res.status(403).json({
    message: 'This feature is available on the Pro plan. Please upgrade to continue.'
  });
};
