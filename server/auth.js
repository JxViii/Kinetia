const express = require("express");
const { AuthorizationCode } = require("simple-oauth2");
require("dotenv").config();

const router = express.Router();

const client = new AuthorizationCode({
  client: {
    id: process.env.AUTH0_CLIENT_ID,
    secret: process.env.AUTH0_CLIENT_SECRET,
  },
  auth: {
    tokenHost: `https://${process.env.AUTH0_DOMAIN}`,
    authorizePath: "/authorize",
    tokenPath: "/oauth/token",
  },
});

router.get("/auth", (req, res) => {
  const authorizationUri = client.authorizeURL({
    redirect_uri: "https://kinetia.tech/admin/callback",
    scope: "openid profile email",
    state: "secure-random-state", // deberías generar uno real si te preocupa seguridad
  });

  res.redirect(authorizationUri);
});

module.exports = router;
