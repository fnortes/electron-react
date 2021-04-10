import React from 'react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ipcRenderer } from 'electron';
import Context, {
  ContextProps,
  TweetsContextProvider,
} from '../../contexts/TweetsContext';

import * as scripts from '../../utils/scripts';

const mockResponse = {
  status: 'ok',
  html: '<a style="display:none;">Test link</a>',
};

const invoke = (channel: string, ...args: any[]) =>
  Promise.resolve(mockResponse);

jest.mock(
  'electron',
  () => {
    const mElectron = {
      ipcRenderer: {
        on: jest.fn(),
        send: jest.fn(),
        invoke,
      },
    };
    return mElectron;
  },
  { virtual: true }
);

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

    jest
      .spyOn(scripts, 'default')
      .mockImplementation((selector: string) => null);

    await act(async () => {
      contextData.loadTweets('http://www.test.com');
    });

    expect(contextData.htmlTweets).toEqual(
      '<a style="display:none;">Test link</a>'
    );
    expect(contextData.lastSearchs.length).toEqual(1);
    expect(contextData.search).toEqual('http://www.test.com');
    expect(contextData.loading).toBeFalsy();

    mockResponse.status = 'ko';
    mockResponse.html = `<span class="error">Sorry, we can't load the information for that. It may have been deleted or made private. Please try again.</span>`;

    await act(async () => {
      contextData.loadTweets('http://www.test.com');
    });

    expect(contextData.htmlTweets.indexOf('class="error"')).toBeGreaterThan(-1);
  });
});
