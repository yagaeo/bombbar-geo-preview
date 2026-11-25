# Bombbar — стенд для согласования

Стенд для согласования 4 доработок Bombbar. В трех категориях материалы для выбора продукции размещены после товарной выдачи и пагинации. На странице сертификации можно найти документ по названию, номеру и фильтрам.

| Страница | Оригинал | GitHub Pages |
| --- | --- | --- |
| Протеиновые батончики | [Bombbar.ru](https://www.bombbar.ru/catalog/batonchiki_vafli/proteinovie_batonchiki) | [Батончики](https://yagaeo.github.io/bombbar-geo-preview/protein-bars/) |
| Протеиновое печенье | [Bombbar.ru](https://www.bombbar.ru/catalog/pechene_pankeyki/pechene_proteinovoe) | [Печенье](https://yagaeo.github.io/bombbar-geo-preview/protein-cookies/) |
| Ассорти | [Bombbar.ru](https://www.bombbar.ru/catalog/podborki/assorti) | [Ассорти](https://yagaeo.github.io/bombbar-geo-preview/assorti/) |
| Сертификация | [Bombbar.ru](https://www.bombbar.ru/page/certification) | [Сертификация](https://yagaeo.github.io/bombbar-geo-preview/certification/) |

[Вход на стенд](https://yagaeo.github.io/bombbar-geo-preview/).

Локальный запуск из корня репозитория.

    python3 -m http.server 8000 --directory docs

GitHub Pages публикует каталог /docs ветки main.

Общие стили и демонстрационная логика хранятся в `docs/assets`. Шапка и подвал 4 страниц собираются из шаблонов `templates/header.html` и `templates/footer.html`. После правок шаблонов запускайте `python3 scripts/sync_chrome.py`. Команда `python3 scripts/sync_chrome.py --check` проверяет, совпадает ли разметка в страницах с шаблонами.

Для новых таблиц, предлагаемых для Bombbar.ru, используйте общий класс `geo-table`. На широких экранах держите таблицу в пределах основного текста или допускайте небольшой выход вправо ради читаемости. Ширину столбца названий подбирайте по содержимому. На телефонах проверяйте раскладку на ширине от 320 px.

Open Sans 1.10 (400, 600, 700 и 800) подключен из `docs/assets/fonts`. Это начертания, которые использует магазин. Там же находится текст Apache License 2.0. Логотипы и фирменные пиктограммы используются для согласования оформления. Изображения товаров загружаются с публичного CDN магазина.

Сортировка на стенде охватывает популярность, цену и алфавит. Доступны фильтры по бренду, типу товара, цене и акциям. Поиск по магазину, сравнение, избранное, корзина, личный кабинет, подписка, сортировка по дате и дополнительные фильтры доступны через ссылки на Bombbar.ru. Актуальные цены и остатки указаны на страницах магазина. Фильтры и поиск реестра работают на стенде, ссылки на документы ведут в публичные источники.

Все 5 страниц содержат метатег `noindex, nofollow, noimageindex`. Политика безопасности страниц блокирует фоновые запросы и отправку форм.
