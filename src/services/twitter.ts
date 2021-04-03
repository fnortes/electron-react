/**
 * Function to call the Publish Twitter Api and obtain the html to embed.
 * @param search Is the Twitter URL to send in the request.
 * @returns A promise with the response html as string.
 */
export default function publish(search: string): Promise<string> {
  const url = `https://publish.twitter.com/oembed?url=${encodeURI(
    search
  )}&partner=&hide_thread=false`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok');

      return res.json();
    })
    .then((res) => {
      const { html }: { html: string } = res;
      return html.split('<script')[0].replace(' ', ' style="display:none;" ');
    });
}
