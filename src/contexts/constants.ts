import { State } from './interfaces';

/**
 * Define a constants values, to the context.
 */
export const CONTEXT_CONFIG = {
  // Name of the local storage key, used to save the latest user searches.
  STORE_KEY: 'lastSearchs',
  // Maximum allowed number of user searches to save in the local storage.
  MAX_STORE: 5,
  // Pattern Twitter URL
  TWITTER_URL: 'https://twitter.com',
};

/**
 * Define de initial state values to the context
 */
export const INITIAL_STATE: State = {
  loading: false,
  // By default, it try to get the last searches from local storage, if exist them.
  lastSearchs: JSON.parse(
    localStorage.getItem(CONTEXT_CONFIG.STORE_KEY) || '[]'
  ),
  search: '',
  htmlTweets: '',
};
