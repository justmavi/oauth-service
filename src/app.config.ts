export default () => ({
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
});
