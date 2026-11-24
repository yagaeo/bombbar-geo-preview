# Bombbar — стенд для согласования

Статические редактируемые страницы по состоянию публичного сайта для Москвы на 24 ноября 2026 года. Исходный текст сохранен для следующего этапа редакции.

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

Общие стили и демонстрационная логика хранятся в docs/assets. Стили воссозданы по публичной отрисовке. Логотип и иконки раздела документов взяты из оригинала. Изображения товаров загружаются с публичного CDN магазина. Локальная сортировка включает популярность, цену и алфавит. Фильтры включают бренд, тип продукции, цену и акционные позиции. Для сортировки по дате, желтых ценников, фильтров маркировки, поиска, подписки, покупки, избранного и сравнения доступны переходы в магазин. Свежесть цен и остатков проверяйте на карточке товара. Ссылки раздела сертификации открывают публичные источники. Все 5 страниц закрыты от индексации метатегом, фоновые запросы и отправка форм заблокированы политикой страницы.
