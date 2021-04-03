import React, {
  BaseSyntheticEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useContext,
} from 'react';
import TweetsContext from '../../../../contexts/TweetsContext';

/**
 * Function to define the SearchForm component. It is used to display and manage the search Tweets form.
 * @returns The React component.
 */
export default function SearchForm() {
  const { search, setSearch, loadTweets } = useContext(TweetsContext);

  /**
   * Handler executed when user type in the input text field.
   * @param event Is the input event.
   */
  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    event: BaseSyntheticEvent
  ) => {
    setSearch(event.target.value);
  };

  /**
   * Handler executed when the form is submitted.
   * @param event Is the form event
   */
  const handleSubmit: FormEventHandler = (event: FormEvent) => {
    event.preventDefault();
    loadTweets(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchField">
        <input
          type="text"
          name="search"
          id="searchField"
          placeholder="Enter a Twitter URL"
          value={search}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
