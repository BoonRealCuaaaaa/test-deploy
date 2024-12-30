export function convertResponseFormatForLiveChat(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const anchorTags = doc.querySelectorAll('a');

  anchorTags.forEach((a) => {
    if (a.textContent) {
      a.textContent = `${a.textContent.trim()} - ${a.href}`;
    }
  });

  const unorderedLists = doc.querySelectorAll('ul');
  const orderedLists = doc.querySelectorAll('ol');

  orderedLists.forEach((ol) => {
    const listItems = ol.querySelectorAll('li');
    listItems.forEach((li, index) => {
      if (li.textContent) {
        li.textContent = `${index + 1}. ${li.textContent.trim()}`;
      }
    });
  });

  unorderedLists.forEach((ul) => {
    const listItems = ul.querySelectorAll('li');
    listItems.forEach((li) => {
      if (li.textContent) {
        li.textContent = `+ ${li.textContent.trim()}`;
      }
    });
  });

  const processedHtml = doc.body.innerHTML;
  const textContentOnly = processedHtml.replace(/<[^>]*>/g, '').trim();

  return textContentOnly;
}
