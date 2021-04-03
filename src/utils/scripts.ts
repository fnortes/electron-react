/**
 * Define constants values used to embedded tweets process.
 */
const TWITTER_CONFIG = {
  // Id attribute of the script element added to DOM.
  ID: 'twitter-wjs',
  // Twitter script source URL of the script element added to DOM.
  SRC: 'https://platform.twitter.com/widgets.js',
};

/**
 * Function to inject the Twitter script in the DOM.
 * @param selector Is the document selector value to inject the Twitter script.
 * @returns The script element injected or null if it was injected previously.
 */
const injectTwitterScript = (selector: string): HTMLScriptElement | null => {
  const twitterscript = document.querySelector(
    `script[id="${TWITTER_CONFIG.ID}"]`
  );

  if (twitterscript === null) {
    const newTwitterscript = document.createElement('script');
    newTwitterscript.src = TWITTER_CONFIG.SRC;
    newTwitterscript.async = true;
    newTwitterscript.id = TWITTER_CONFIG.ID;
    const article = document.querySelector(selector);
    article?.appendChild(newTwitterscript);

    return newTwitterscript;
  }

  return null;
};

export default injectTwitterScript;
