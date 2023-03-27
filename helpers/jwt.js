const expressJwt = require("express-jwt");

//making sure that whether a user can use the api based on their token
function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
 
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
      `${api}/users/login`,
      `${api}/users/register`
     // To allow allow URL to be called to the back end with out authentication
     //{ url: /(.*)/ },
    ],
  });
}

async function isRevoked(req, payload, done) {
  console.log('Payload:', payload);
  console.log("isRevoked called!"); 
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
