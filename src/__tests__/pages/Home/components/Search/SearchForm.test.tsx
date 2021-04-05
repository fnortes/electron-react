import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Context, {
  ContextProps,
  TweetsContextProvider,
} from '../../../../../contexts/TweetsContext';
import SearchForm from '../../../../../pages/Home/components/Search/SearchForm';

const customRender = (ui: ReactNode, contextProps: ContextProps) => {
  return render(<Context.Provider value={contextProps}>{ui}</Context.Provider>);
};

const setSearch = jest.fn();
const loadTweets = jest.fn();

describe('SearchForm', () => {
  it('should render OK', async () => {
    const { findByRole } = render(
      <TweetsContextProvider>
        <SearchForm />
      </TweetsContextProvider>
    );

    const searchButton = await findByRole('button');

    expect(searchButton).toBeVisible();
  });

  it('should work fine when input text change', async () => {
    const { findByRole } = customRender(<SearchForm />, {
      loading: false,
      lastSearchs: ['url1', 'url2'],
      search: '',
      setSearch,
      htmlTweets: '',
      loadTweets: () => {},
    });

    const input = await findByRole('textbox');

    fireEvent.change(input, { target: { value: 'http://www.test.com' } });

    expect(setSearch).toHaveBeenCalledTimes(1);
  });

  it('should work fine when form is submitted', async () => {
    const { findByRole } = customRender(<SearchForm />, {
      loading: false,
      lastSearchs: ['url1', 'url2'],
      search: '',
      setSearch: () => {},
      htmlTweets: '',
      loadTweets,
    });

    const searchButton = await findByRole('button');

    fireEvent(
      searchButton,
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );

    expect(loadTweets).toHaveBeenCalledTimes(1);
  });
});
