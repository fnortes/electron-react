import React from 'react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Context, {
  ContextProps,
  TweetsContextProvider,
} from '../../contexts/TweetsContext';

import * as scripts from '../../utils/scripts';

let contextData: ContextProps;
describe('TweetsContextProvider', () => {
  it('should render OK', async () => {
    render(
      <TweetsContextProvider>
        <Context.Consumer>
          {(values: ContextProps) => {
            contextData = values;
            return <div />;
          }}
        </Context.Consumer>
      </TweetsContextProvider>
    );

    expect(contextData.loading).toBeFalsy();
    expect(contextData.lastSearchs.length).toEqual(0);
    expect(contextData.htmlTweets).toEqual('');
    expect(contextData.search).toEqual('');

    await act(async () => {
      contextData.setSearch('test');
    });

    expect(contextData.search).toEqual('test');

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ html: '<a>Test link</a><script></script>' }),
      } as Response)
    );

    jest
      .spyOn(scripts, 'default')
      .mockImplementation((selector: string) => null);

    await act(async () => {
      contextData.loadTweets('http://www.test.com');
    });

    expect(contextData.htmlTweets).toEqual(
      '<a>Test style="display:none;" link</a>'
    );
    expect(contextData.lastSearchs.length).toEqual(1);
    expect(contextData.search).toEqual('http://www.test.com');
    expect(contextData.loading).toBeFalsy();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({ html: '<a>Test link</a><script></script>' }),
      } as Response)
    );

    await act(async () => {
      contextData.loadTweets('http://www.test.com');
    });

    expect(contextData.htmlTweets.indexOf('class="error"')).toBeGreaterThan(-1);
  });
});
