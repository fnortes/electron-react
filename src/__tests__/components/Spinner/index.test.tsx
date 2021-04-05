import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Context, { ContextProps } from '../../../contexts/TweetsContext';
import Spinner from '../../../components/Spinner';

const customRender = (ui: ReactNode, contextProps: ContextProps) => {
  return render(<Context.Provider value={contextProps}>{ui}</Context.Provider>);
};

describe('Spinner', () => {
  it('should render OK text', async () => {
    const { findByText } = customRender(<Spinner text="loading ..." />, {
      loading: true,
      lastSearchs: [],
      search: '',
      setSearch: () => {},
      htmlTweets: 'test',
      loadTweets: () => {},
    });

    const text = await findByText(/loading .../i);

    expect(text).toBeVisible();
  });

  it('should render OK without text', async () => {
    const { findByTestId } = customRender(<Spinner />, {
      loading: true,
      lastSearchs: [],
      search: '',
      setSearch: () => {},
      htmlTweets: 'test',
      loadTweets: () => {},
    });

    const loader = await findByTestId('loader-wrapper');

    expect(loader).toBeVisible();
  });

  it('should render OK when not it is loading', async () => {
    const { container } = customRender(<Spinner />, {
      loading: false,
      lastSearchs: [],
      search: '',
      setSearch: () => {},
      htmlTweets: 'test',
      loadTweets: () => {},
    });

    expect(container.innerHTML).toEqual('');
  });
});
