import https from 'https';
import { TwitterResponse } from '../contexts/interfaces';

/**
 * Function to call the Publish Twitter Api and obtain the html to embed.
 * @param url Is the Twitter URL to send in the request.
 * @returns A promise with the status call and the response html as string.
 */
export default function publish(url: string): Promise<TwitterResponse> {
  return new Promise((resolve) => {
    https.get(url, async (res) => {
      try {
        if (res.statusCode !== 200) throw new Error('Response is NOT ok');

        let body = '';

        res.setEncoding('utf-8');

        // eslint-disable-next-line no-restricted-syntax
        for await (const chunk of res) {
          body += chunk;
        }

        const { html } = JSON.parse(body);

        resolve({
          status: 'ok',
          html: html
            .split('<script')[0]
            .replace(' ', ' style="display:none;" '),
        });
      } catch (e) {
        resolve({
          status: 'ko',
          html: `<span class="error">Sorry, we can't load the information for that. It may have been deleted or made private. Please try again.</span>`,
        });
      }
    });
  });
}
