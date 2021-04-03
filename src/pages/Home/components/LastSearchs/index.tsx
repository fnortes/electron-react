import React, { BaseSyntheticEvent, useContext } from 'react';
import { CONTEXT_CONFIG } from '../../../../contexts/constants';
import TweetsContext from '../../../../contexts/TweetsContext';

/**
 * Function to define the LastSearchs component. It is used to display and manage the last user searches.
 * @returns The React component.
 */
export default function LastSearchs() {
  const { lastSearchs, loadTweets } = useContext(TweetsContext);

  /**
   * Handler executed when a last search is clicked.
   * @param event Is the button click event.
   */
  const handleClick = (event: BaseSyntheticEvent) => {
    loadTweets(`${CONTEXT_CONFIG.TWITTER_URL}${event.target.innerHTML}`);
  };

  return (
    <div>
      <h2>Your last {CONTEXT_CONFIG.MAX_STORE} searchs</h2>
      {lastSearchs.length > 0 ? (
        <ul>
          {lastSearchs.map((s, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <button type="button" onClick={handleClick}>
                {s.replace(CONTEXT_CONFIG.TWITTER_URL, '')}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You do not have saved searches</p>
      )}
    </div>
  );
}
