module.exports = {
  client: {
    service: {
      name: 'github',
      url: 'https://api.github.com/graphql',
      // optional headers
      headers: {
        authorization: 'Bearer fdc6f1774bcba44c96a7446fe06dd60a8d4ba535',
      },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
