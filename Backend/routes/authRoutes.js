const express =
  require("express");

const passport =
  require("passport");

const jwt =
  require("jsonwebtoken");

const router =
  express.Router();

const DEFAULT_CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

const allowedClientUrls = () =>
  [
    DEFAULT_CLIENT_URL,
    ...(process.env.CLIENT_URLS || "")
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean),
  ];

const isLocalDevUrl = (url) => {
  try {
    const parsed = new URL(url);

    return ["localhost", "127.0.0.1"].includes(parsed.hostname);
  } catch {
    return false;
  }
};

const safeClientUrl = (url) => {
  if (allowedClientUrls().includes(url) || isLocalDevUrl(url)) {
    return url;
  }

  return DEFAULT_CLIENT_URL;
};

const encodeState = (value) =>
  Buffer.from(JSON.stringify({ returnTo: safeClientUrl(value) })).toString(
    "base64url"
  );

const decodeState = (state) => {
  try {
    if (!state) return DEFAULT_CLIENT_URL;

    const parsed = JSON.parse(
      Buffer.from(String(state), "base64url").toString("utf8")
    );

    return safeClientUrl(parsed.returnTo);
  } catch {
    return DEFAULT_CLIENT_URL;
  }
};

const {
  register,
  login,
} = require(
  "../controllers/authController"
);

router.get(

  "/google",

  (req, res, next) => {
    const returnTo =
      typeof req.query.returnTo === "string"
        ? req.query.returnTo
        : DEFAULT_CLIENT_URL;

    passport.authenticate("google", {

      scope: [
        "profile",
        "email",
      ],

      prompt:
        "select_account",

      state:
        encodeState(returnTo),

    })(req, res, next);
  }
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(

  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false,
    }
  ),

  async (req, res) => {

    try {

      const token =
        jwt.sign(

          {

            id:
              req.user.id,

            email:
              req.user.email,

            role:
              req.user.role,

          },

          process.env
            .JWT_SECRET,

          {

            expiresIn:
              "7d",

          }
        );
      const clientUrl =
        decodeState(req.query.state);

      if (
        req.user.role ===
        "admin"
      ) {

        return res.redirect(

          `${clientUrl}/google-success?token=${encodeURIComponent(token)}&role=admin&username=${encodeURIComponent(req.user.username)}`
        );
      }

      return res.redirect(

        `${clientUrl}/google-success?token=${encodeURIComponent(token)}&role=user&username=${encodeURIComponent(req.user.username)}`
      );

    } catch (error) {

      res.status(500).json({

        message:
          "Google login failed",

      });
    }
  }
);

module.exports =
  router;
