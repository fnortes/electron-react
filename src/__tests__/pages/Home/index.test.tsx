import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TweetsContextProvider } from '../../../contexts/TweetsContext';
import Home from '../../../pages/Home';

describe('Home', () => {
  it('should render OK', async () => {
    const { findByText } = render(
      <TweetsContextProvider>
        <Home />
      </TweetsContextProvider>
    );

    const title = await findByText(/Axosoft Technical Test/i);

    expect(title).toBeVisible();
  });
});
