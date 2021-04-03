import { INITIAL_STATE } from './constants';
import { Action, State, ACTIONS } from './interfaces';

/**
 * Global function to update any value of the context state.
 * @param state Object with the current state.
 * @param action Object with the info of action to update and the new value.
 * @returns The new state object saved.
 */
export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.ADD_LAST_SEARCH:
      return {
        ...state,
        lastSearchs: action.payload.lastSearchs || INITIAL_STATE.lastSearchs,
      };
    case ACTIONS.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload.loading || INITIAL_STATE.loading,
      };
    case ACTIONS.UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload.search || INITIAL_STATE.search,
      };
    case ACTIONS.UPDATE_HTML_TWEETS:
      return {
        ...state,
        htmlTweets: action.payload.htmlTweets || INITIAL_STATE.htmlTweets,
      };
    default:
      return state;
  }
}
