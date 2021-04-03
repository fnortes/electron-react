import React, { useReducer } from 'react';
import publish from '../services/twitter';
import injectTwitterScript from '../utils/scripts';
import { CONTEXT_CONFIG, INITIAL_STATE } from './constants';
import { ACTIONS } from './interfaces';
import reducer from './reducer';

/**
 * Define the interface of the context.
 */
export interface ContextProps {
  loading: boolean;
  lastSearchs: string[];
  search: string;
  setSearch: (search: string) => void;
  htmlTweets: string;
  loadTweets: (newSearch: string | null) => void;
}

const Context = React.createContext({} as ContextProps);

/**
 * Define the interface of the context provider.
 */
interface Props {
  children: React.ReactNode;
}

/**
 * Define the context provider (data and functionality).
 * @param props Object of the Props interface
 * @returns The context provider, with the exposed data and functionality.
 */
export const TweetsContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { loading, lastSearchs, search, htmlTweets } = state;

  /**
   * Function to show the loadding spinner.
   */
  const show = () => {
    dispatch({
      type: ACTIONS.UPDATE_LOADING,
      payload: { loading: true },
    });
  };

  /**
   * Function to hide the loading spinner.
   */
  const hide = () => {
    dispatch({
      type: ACTIONS.UPDATE_LOADING,
      payload: { loading: false },
    });
  };

  /**
   * Function to add a new user search to the last searches.
   * @param searchToAdd Is the search value to save.
   */
  const addLastSearch = (searchToAdd: string) => {
    const alreadyExist = lastSearchs.find((s) => s === searchToAdd);

    if (alreadyExist === undefined) {
      lastSearchs.unshift(searchToAdd);
      const newLastSearchs = lastSearchs.slice(0, CONTEXT_CONFIG.MAX_STORE);

      localStorage.setItem(
        CONTEXT_CONFIG.STORE_KEY,
        JSON.stringify(newLastSearchs)
      );

      dispatch({
        type: ACTIONS.ADD_LAST_SEARCH,
        payload: { lastSearchs: newLastSearchs },
      });
    }
  };

  /**
   * Function to update the state search value.
   * @param newSearch Is the new search value to save.
   */
  const setSearch = (newSearch: string) => {
    dispatch({
      type: ACTIONS.UPDATE_SEARCH,
      payload: { search: newSearch },
    });
  };

  /**
   * Function to update the state htmlTweets value
   * @param newHtmlTweets Is the new htmlTweets to save.
   */
  const setHtmlTweets = (newHtmlTweets: string) => {
    dispatch({
      type: ACTIONS.UPDATE_HTML_TWEETS,
      payload: { htmlTweets: newHtmlTweets },
    });
  };

  /**
   * Handler executed when the call to Publish Twitter Api work fine.
   * @param res The response return by the service.
   * @param searchToUse Search value sended to the service.
   * @returns The same entried response object.
   */
  const onSuccessSearch = (res: string, searchToUse: string): string => {
    setHtmlTweets(res);
    addLastSearch(searchToUse);

    const script = injectTwitterScript('article');
    if (script !== null) {
      script.addEventListener('load', () => {
        hide();
      });
    } else {
      hide();
    }

    return res;
  };

  /**
   * Function to load the new Tweets on screen.
   * @param newSearch Value of the new search if a last user search is clicked. Else null.
   */
  const loadTweets = (newSearch: string | null) => {
    show();

    let searchToUse = search;

    if (newSearch !== null) {
      setSearch(newSearch);
      searchToUse = newSearch;
    }

    publish(searchToUse)
      .then((res) => onSuccessSearch(res, searchToUse))
      .catch(() => {
        setHtmlTweets(
          `<span class="error">Sorry, we can't load the information for that. It may have been deleted or made private. Please try again.</span>`
        );
        hide();
      });
  };

  return (
    <Context.Provider
      value={{
        loading,
        lastSearchs,
        htmlTweets,
        search,
        loadTweets,
        setSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
