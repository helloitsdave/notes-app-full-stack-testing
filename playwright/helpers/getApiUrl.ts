import playwrightConfig from '../playwright.config';

const getApiUrl = async () => {
  const baseURL = playwrightConfig.use?.baseURL;

  const apiURL = baseURL?.includes('localhost')
    ? 'http://localhost:5000'
    : 'https://www.noteapp.co.uk';

  if (!baseURL) {
    throw new Error('Base URL is required to make API requests');
  }

  return apiURL;
};

export default getApiUrl;
