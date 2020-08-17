module.exports = {
  client: {
    service: {
      name: 'github',
      url: 'https://api.github.com/graphql',
      // optional headers
      headers: {
        authorization: 'Bearer XXXX-PUT-YOUR-TOKEN-HERE-XXXX',
      },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
