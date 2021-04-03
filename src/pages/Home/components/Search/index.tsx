import React, { useContext } from 'react';
import { CONTEXT_CONFIG } from '../../../../contexts/constants';
import TweetsContext from '../../../../contexts/TweetsContext';
import SearchForm from './SearchForm';

/**
 * Function to define the Serach component. It is used to display the main content of the Home page.
 * @returns The React component.
 */
export default function Search() {
  const { htmlTweets } = useContext(TweetsContext);

  return (
    <div>
      <h2>What would you like to search on Twitter?</h2>
      <p>You can try entering any of these:</p>
      <ul>
        <li>
          <strong>A profile:</strong> {`${CONTEXT_CONFIG.TWITTER_URL}/axosoft`}
        </li>
        <li>
          <strong>A tweet:</strong>{' '}
          {`${CONTEXT_CONFIG.TWITTER_URL}/axosoft/status/1270055551226036224`}
        </li>
        <li>
          <strong>A list:</strong>{' '}
          {`${CONTEXT_CONFIG.TWITTER_URL}/i/lists/92285840`}
        </li>
      </ul>
      <SearchForm />
      {htmlTweets !== '' && (
        <article dangerouslySetInnerHTML={{ __html: htmlTweets }} />
      )}
    </div>
  );
}
