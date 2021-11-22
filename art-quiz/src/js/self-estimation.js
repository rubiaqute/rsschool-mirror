const selfEstimation = `
1. Стартовая страница и навигация +20
Верстка +10;
Навигация +10

2. Настройки +40
Звук, громкость, разные звуки для правильных.неправильных ответов и при окончании раунда +10;
Игра на время с таймером +10
Выбор времени на ответ от 5 до 30 секунд +10;
Сохранение настроек +10;

3. Страница категорий +30
Верстка +10
Карточки сыгранного и несыгранного раунда разные +10 (НЕсыгранные - черно-белые, без кнопки на страницу с результатами) +10;
Отображение результата прохождения раунда +10;

4.Страница с вопросами +50
Верстка +10;
Варианты случайны, не повторяются, на разных местах +10
Индикаторы ответа (панель буллетов сверху, закрашиваются зеленым или красным, варианты по игре Художники подсвечиваются) +10;
Модальное окно с кнопкой продолжить +10;
Уведомление по окончании раунда с результатом +10

5. Страница с результатами +50
Верстка +10;
Превью всех картин +10;
Правильные - цветные с зеленой границей, неправильные - чб с красной +10;
При клике по картине выводится информация  +10
Изменения результов при переигрывании +10

6. Картинки отображаются целиком +10

7. Анимация +20 (по факту +30)
Выдвижение снизу секции с выбором категорий +5;
Выдвижение слева секции настроек +5;
Варианты ответов и картинки в секции с вопросом появляются с масштабирование от 0 до 1 +5;
Секция с результатом раунда выдвигается сверху +5;
Превью картинок в секции с результатми прыгают как теннисные мячики при наведении мышки (доступно только в десктопной версии) +5;
Модальные окна появляются с анимацией "переворота карты" + 5;

8. Доп функционал +16;
фоновая музыка и отдельный пункт в настройках (вкл/выкл и громкость) для неё +2
выбор трека фоновой музыки (настройки сохраняются) +2
(про фоновую музыку: по умолчанию она отключена, но если вы включите ее и перезагрузите страницу, то имейте в виду - настройка сохранится, но музыка не заиграет сразу, так как все браузеры запрещают автопроигрывание, а заиграет по первому щелчку мышки)
разные уведомления по окончанию раунда в зависимости от результата (разные картинки, звук и надпись, если ответите правильно на все) +2
(кроме того, если вы ответите правильно на все вопросы категории, то кнопка с результатом на карточке будет зеленая)
перевод приложения на два языка +5
возможность скачать картину на компьютер (из секции с результатами на модально окне) +5

Итого балл за задание +220 (236)

Для ментора:
1. Репозиторий +20
pull request выполнен в соответствии с требованиями +10
ведётся история коммитов, названия коммитов даются согласно гайдлайну +10
2. Качество кода +150
правильное именование переменных и функций +10
используется prettier, код отформатирован, хорошо читается +10
нет дублирования кода, повторяющиеся фрагменты кода вынесены в функции, оптимальный размер функций, выполняется рекомендация: одна функция – одна задача +5(?)
нет глубокой вложенности циклов, нет магических чисел +10
используется делегирование +10
используются фичи ES6 и выше: let, const для объявления переменных, стрелочные функции, Spread/Rest операторы, деструктуризация, async/await и т.д +10
код разбит на модули +10
для сборки кода используется webpack. +10
eslint +8
в качестве источника данных используется JSON-файл, данные из которого получаются асинхронно +10
для написания компонентов приложения используются классы +10
создано одностраничное (SPA) приложение +10
html-код генерируется при помощи JavaScript +10
у ментора нет замечаний к качеству кода, либо все замечания ментора исправлены +20(?)
Оформление и функционал приложения +50(?)
  }
}`;
export default selfEstimation;
