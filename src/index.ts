import jsdom from "jsdom";

const fetchOpenGraphImage = async (url: string) => {
  const page = await fetch(url);
  const html = await page.text();

  // needed to fix https://github.com/jsdom/jsdom/issues/2230
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on("error", () => {});

  const dom = new jsdom.JSDOM(html, { virtualConsole });

  const image = dom.window.document.querySelector('meta[property="og:image"]');

  const imageContent = image?.getAttribute("content");

  return imageContent;
};
