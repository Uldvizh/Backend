# Бекенд

**Backend отвечает за:**
- получение мероприятий
- создание и редактирование мероприятий
- удаление мероприятий
- модерацию мероприятий
- взаимодействие с базой данных Supabase
- авторизацию админов
## .env

Для работы backend необходимо создать переменные окружения:

```env
SUPABASE_URL=
SUPABASE_KEY=
```

## Запуск локально

 1. git clone https://github.com/Uldvizh/Backend.git 
  2. npm install npm
  3. install -g netlify-cli
  4. netlify dev 

## Список функций

|Метод|Функция|Что делает |Нужна ли авторизация |
|-|-|-|-|
|`GET`|`/api/events/approved`|Получить только одобренные мероприятия|-|
|``GET``|`/api/events`|Получить все мероприятия|+|
|`POST`|`/api/events`|Создать мероприятие|+|
|`PUT`|``/api/events/:id``|Изменить мероприятие|+|
|`DELETE`|``/api/events/:id``|Удалить мероприятие|+|



# База данных

**Таблица, показывающая возвращаемые данные от бекенда, (которые берутся от базы данных)**



|Обозначение в json |Тип данных|Пример|Описание|
|-------------------|----------|-------------------------------|-----------------------------|
|`id`		 |int|       `138`             |Номер "строки" на которую ссылается база данных, база данных автоматически задаёт её           |
|`title`	|text|          `«Фестиваль Наше время» `      |Название мероприятия             |
|`status`	|text|     `approved`            |Статус модерации approved, end, pending, rejected, suggest         |
|`description`	|text|    `Фестиваль, объединяющий мотоспорт, музыку, спорт и гастрономию`         |Описание          |
|`start_date`	|timestamp|   ` 2026-08-08 10:00:00+00 `            |Время начала мероприятия, указывается в UTS+0          |
|`end_date`	|timestamp|    `2026-08-08 10:18:00+00`              |Время конца мероприятия (примерное, если не указано, то база данных сама прибавляет к start_date 12 часов и присваивает это значине в end_date)         |
|`image_url`	|text|     [Ссылка](https://ulpressa.ru/wp-content/uploads/2026/06/m_fktibkcgpcyfamieplesudpktfdig-bv0itlhws3zpnnokkesnrdt6anjszqlsmzlqvdlktmp-vjcqxdhllomd-724x1024.jpg)           |Ссылка на любой медиафайл           |
|`price`	|int|  ` 0 `            |Цена входа, билета           |
|`source`	|text|  `УлПресса`         |Названия 1 источника           |
|`source_url`	|text|  [ссылка1](https://ulpressa.ru/event/2026-08-08-festival-nashe-vremya/)                |Ссылка на 1 источник          |
|`source2`	|text|       `Комсомольская правда`         |Название 2 источника           |
|`source2_url`	|text|   [ссылка2](https://www.ul.kp.ru/online/news/7134128/)              |  Ссылка на 1 источник            |
|`warning`	|text|      `Проверьте источник! Мероприятие может быть отменено`          |Содержит в себе строку с вероятными опасностями, например отмена концерта и тд `         |
|`broadcaster`	|text|  `Название`     |Название вещателя      | 
|`broadcaster_url`	|text|       [ссылка](https://silka.dopizza)              |Ссылка на вещателя - например ссылка на покупку билетов яндекс афиш            |
|`age`	|int|     `18`       |(возраст+ , т.е 0+ , 6+ , 12+, 16+ , 18+        |
|`type`	|text| `Фестиваль`               |Тип мероприятия, например стендап, концерт, мастер-класс и тд)          |
|`address`	|text|  `Ул. Пушкина дом Черепушкина`           |Адрес, где проходит мероприятие           |
|`external_id`	|text|  `ticketsteam-9145@63950069`            |Любые данные для облегчения работы парсера, обычно это какие то уникальные элементы по типу даты, номера мерпориятия и тд         |



## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Текст2

текст3




## текст4

текст5

|0|0 |0 |
|-|-|-|
|1|11|44|
|2|22|55|
|3|33|66|



