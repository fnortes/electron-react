import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Context, {
  ContextProps,
  TweetsContextProvider,
} from '../../../../../contexts/TweetsContext';
import Search from '../../../../../pages/Home/components/Search';

const customRender = (ui: ReactNode, contextProps: ContextProps) => {
  return render(<Context.Provider value={contextProps}>{ui}</Context.Provider>);
};

describe('Search', () => {
  it('should render OK without tweets', async () => {
    const { findByText } = render(
      <TweetsContextProvider>
        <Search />
      </TweetsContextProvider>
    );

    const title = await findByText(
      /What would you like to search on Twitter?/i
    );
    const content = await findByText(/You can try entering any of these:/i);

    expect(title).toBeVisible();
    expect(content).toBeVisible();
  });

  it('should render OK with tweets', async () => {
    const { findByText } = customRender(<Search />, {
      loading: false,
      lastSearchs: [],
      search: '',
      setSearch: () => {},
      htmlTweets: 'test',
      loadTweets: () => {},
    });

    const tweets = await findByText(/test/i);

    expect(tweets).toBeVisible();
  });
});
