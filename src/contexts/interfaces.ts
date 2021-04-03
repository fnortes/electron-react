/**
 * Define the interface used to the state reducer of the context.
 */
export interface State {
  loading: boolean;
  lastSearchs: string[];
  search: string;
  htmlTweets: string;
}

/**
 * Define the available actions to apply in the context reducer.
 */
export enum ACTIONS {
  ADD_LAST_SEARCH = 'add_last_search',
  UPDATE_LOADING = 'update_loading',
  UPDATE_SEARCH = 'update_search',
  UPDATE_HTML_TWEETS = 'update_html_tweets',
}

/**
 * Define the interface used to the action entry in the context reducers.
 */
export interface Action {
  type: ACTIONS;
  payload: {
    loading?: boolean;
    lastSearchs?: string[];
    search?: string;
    htmlTweets?: string;
  };
}
