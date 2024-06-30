import rateLimit from "express-rate-limit";

// Rate Limit to handle login request from each IP

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // Time : 1 Minute (1000 milliseconds)
  max: 5, // Limit each IP to 5 login per window per minute
  message: {
    message:
      "Too many attempts try after 1 min",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default loginLimiter;
