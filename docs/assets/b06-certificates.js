const b06Register = document.querySelector('.b06-register');

if (b06Register) {
  const panel = b06Register.querySelector('.b06-controls');
  const search = panel.querySelector('input');
  const filters = Array.from(panel.querySelectorAll('select'));
  const count = panel.querySelector('.b06-count');
  const empty = b06Register.querySelector('.b06-empty');
  const archive = b06Register.querySelector('.b06-archive');
  const sections = Array.from(b06Register.querySelectorAll('.b06-group'));
  const width = window.matchMedia('(min-width: 691px)');

  function normalize(value) {
    return value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
  }

  function compactNumber(value) {
    return normalize(value)
      .replace(/[авекмнорстух]/g, letter => ({
        а: 'a', в: 'b', е: 'e', к: 'k', м: 'm', н: 'h', о: 'o',
        р: 'p', с: 'c', т: 't', у: 'y', х: 'x',
      })[letter])
      .replace(/[^\p{L}\p{N}]+/gu, '');
  }

  const cards = Array.from(b06Register.querySelectorAll('.b06-card'), card => ({
    card,
    number: compactNumber(card.querySelector('.b06-number')?.textContent ?? ''),
    text: normalize(card.textContent).replace(/\s+/g, ' '),
  }));

  function redraw() {
    const query = normalize(search.value);
    const words = query.split(/\s+/).filter(Boolean);
    const registration = compactNumber(query);
    const active = query || filters.some(field => field.value);
    let results = 0;
    for (const {card, number, text} of cards) {
      const fieldMatch = filters.every(field => !field.value || card.dataset[field.name] === field.value);
      const queryMatch = words.every(word => text.includes(word)) ||
        (/\d/.test(query) && registration && number.includes(registration));
      card.hidden = !(fieldMatch && queryMatch);
      if (!card.hidden) results += 1;
    }
    for (const section of sections) {
      section.hidden = !section.querySelector('.b06-card:not([hidden])');
    }
    if (archive) {
      archive.hidden = !archive.querySelector('.b06-card:not([hidden])');
      if (active && !archive.hidden) archive.open = true;
    }
    count.textContent = `Найдено документов: ${results}`;
    empty.hidden = results > 0;
  }

  function setDisclosureLayout() {
    for (const menu of document.querySelectorAll('.b06-service, .b06-filter-options')) {
      menu.open = width.matches;
    }
  }

  panel.hidden = false;
  search.addEventListener('input', redraw);
  for (const filter of filters) filter.addEventListener('change', redraw);
  panel.querySelector('.b06-reset').addEventListener('click', () => {
    search.value = '';
    for (const filter of filters) filter.value = '';
    if (archive) archive.open = false;
    redraw();
    search.focus();
  });
  width.addEventListener('change', setDisclosureLayout);
  setDisclosureLayout();
  redraw();
}
