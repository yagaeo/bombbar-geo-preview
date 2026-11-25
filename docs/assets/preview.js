const smallScreen = window.matchMedia('(max-width: 1024px)');
if (smallScreen.matches) {
  for (const section of document.querySelectorAll('.category-nav, .footer-group')) {
    section.open = false;
  }
}
for (const disclosure of document.querySelectorAll('.main-menu, .info-menu')) {
  disclosure.addEventListener('keydown', event => {
    if (event.key === 'Escape' && disclosure.open) {
      disclosure.open = false;
      disclosure.querySelector('summary').focus();
    }
  });
}

const catalog = document.querySelector('.catalog');
if (catalog) {
  const size = 30;
  const list = catalog.querySelector('.products');
  const cards = Array.from(list.children);
  const pagination = catalog.querySelector('.pagenav');
  const more = catalog.querySelector('.more');
  const empty = catalog.querySelector('.empty');
  const sort = catalog.querySelector('select[name=sort]');
  const fields = catalog.querySelectorAll('input');
  let activePage = 1;
  let startPage = 1;

  function selected(name) {
    return Array.from(catalog.querySelectorAll('input[name="' + name + '"]:checked'), input => input.value);
  }

  function bound(name, fallback) {
    const value = catalog.querySelector('input[name="' + name + '"]').value;
    return value === '' ? fallback : Number(value);
  }

  function matching(card, brands, types, min, max, sale) {
    const price = Number(card.dataset.price);
    return (!brands.length || brands.includes(card.dataset.brand)) &&
      (!types.length || types.includes(card.dataset.type)) &&
      price >= min && price <= max && (!sale || card.dataset.sale === '1');
  }

  function redraw() {
    const brands = selected('brand');
    const types = selected('type');
    const min = bound('min-price', 0);
    const max = bound('max-price', Infinity);
    const sale = catalog.querySelector('input[name=sale]').checked;
    const visible = cards.filter(card => matching(card, brands, types, min, max, sale));
    const mode = sort.value;
    if (mode === 'asc' || mode === 'desc') {
      const multiplier = mode === 'asc' ? 1 : -1;
      visible.sort((a, b) => multiplier * (Number(a.dataset.price) - Number(b.dataset.price)));
    }
    if (mode === 'alpha') {
      visible.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name, 'ru'));
    }
    const pageCount = Math.ceil(visible.length / size);
    for (const card of cards) card.hidden = true;
    for (const card of visible.slice((startPage - 1) * size, activePage * size)) {
      card.hidden = false;
      list.append(card);
    }
    empty.hidden = visible.length > 0;
    more.hidden = activePage >= pageCount;
    pagination.replaceChildren();
    for (let page = 1; pageCount > 1 && page <= pageCount; page += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(page);
      if (page === activePage) button.setAttribute('aria-current', 'page');
      button.addEventListener('click', () => {
        startPage = activePage = page;
        redraw();
        list.querySelector('.card:not([hidden]) a')?.focus();
      });
      pagination.append(button);
    }
    return visible;
  }

  function restart() {
    activePage = startPage = 1;
    redraw();
  }
  more.addEventListener('click', () => {
    const next = activePage * size;
    activePage += 1;
    const visible = redraw();
    visible[next]?.querySelector('a')?.focus();
  });
  for (const field of fields) field.addEventListener('input', restart);
  sort.addEventListener('change', () => {
    if (sort.value === 'new') {
      window.location.assign(catalog.dataset.original);
      return;
    }
    restart();
  });
  catalog.querySelector('.reset').addEventListener('click', () => {
    for (const field of fields) {
      if (field.type === 'checkbox') field.checked = false;
      else field.value = '';
    }
    sort.value = 'popular';
    restart();
  });
  redraw();
}
