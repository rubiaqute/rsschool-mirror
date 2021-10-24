console.log(`
Самооценка - 150 баллов
Добрый день!
По пунктам выполнено все.
Из дополнительного функционала:
1) Перевод приложения на испанский язык. (+ подключен файл с цитатами на испанском языке). Язык можно выбрать в настройках.
2) (актуалочка!) Добавлена информация о количестве случаев КОВИД (новых случаев на сегодняшюю дату, всего случаев и количество смертей). В списке можно выбрать три страны (по языкам приложения - Великобритания, Россия и Испания).
Данные подгружаются с помощью асинхронной функции с https://api.covid19api.com. При выборе языка автоматически выбирается соответствующая страна, но пользователь может выбрать и вручную. Перевод блока на три языка также сделан

Также прошу обратить внимание:
1) Должно работать все, но если вдруг какой-то функционал исчез - пожалуйста, сообщите - попробую исправить. Первый раз собирала через webpack - собралось с горем пополам только раза с пятого. Возможно, что-то отвалилось по дороге.
2) Переключение треков по кнопкам-стрелкам реализовано немного не так, как в демо к заданию. Если играла музыка, то переключение трека переключает трек и автоматически его запускает. Но если музыка не играла, то переключение переключает трек, но автоматически его не запускает (в отличие от демо, где трек тут же начинает проигрываться).
Я считаю, что в данном случае это более логично. 
`);
