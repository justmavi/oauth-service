export default () => ({
  app: {
    port: process.env.PORT || 8080,
  },
  oauth: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    vkontakte: {
      clientID: process.env.VKONTAKTE_CLIENT_ID,
      clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
      callbackURL: process.env.VKONTAKTE_CALLBACK_URL,
    },
    odnoklassniki: {
      clientID: process.env.ODNOKLASSNIKI_CLIENT_ID,
      clientPublic: process.env.ODNOKLASSNIKI_CLIENT_PUBLIC,
      clientSecret: process.env.ODNOKLASSNIKI_CLIENT_SECRET,
      callbackURL: process.env.ODNOKLASSNIKI_CALLBACK_URL,
    },
  },
});
