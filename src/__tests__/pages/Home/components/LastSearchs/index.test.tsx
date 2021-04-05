import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Context, {
  ContextProps,
  TweetsContextProvider,
} from '../../../../../contexts/TweetsContext';
import LastSearchs from '../../../../../pages/Home/components/LastSearchs';

const customRender = (ui: ReactNode, contextProps: ContextProps) => {
  return render(<Context.Provider value={contextProps}>{ui}</Context.Provider>);
};

const loadTweets = jest.fn();

describe('LastSearchs', () => {
  it('should render OK without searchs', async () => {
    const { findByText } = render(
      <TweetsContextProvider>
        <LastSearchs />
      </TweetsContextProvider>
    );

    const title = await findByText(/Your last 5 searchs/i);
    const content = await findByText(/You do not have saved searches/i);

    expect(title).toBeVisible();
    expect(content).toBeVisible();
  });

  it('should render OK with searchs', async () => {
    const { findByText } = customRender(<LastSearchs />, {
      loading: false,
      lastSearchs: ['url1', 'url2'],
      search: '',
      setSearch: () => {},
      htmlTweets: '',
      loadTweets,
    });

    const searchs = [await findByText(/url1/i), await findByText(/url2/i)];

    expect(searchs[0]).toBeVisible();
    expect(searchs[1]).toBeVisible();

    fireEvent(
      searchs[0],
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );

    expect(loadTweets).toHaveBeenCalledTimes(1);
  });
});
