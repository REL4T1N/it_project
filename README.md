внизу там, не важно сейчас.


Разбор заголовка сайта:
Заголовок сайта включает в себя 5 разделов:
1)иконка
2)Главное
3)Избранное
4)Поиск
5)Иконка профиля

Во первых, пользователь может быть как авторизован, так и нет. Поэтому нужно 2 разных страницы, которые будут отличаться только заголовком (на данном этапе).
Разберём авторизованого пользователя.

ИКОНКА САЙТА:
1)в данный момент просто заглушка
2)нужно сделать её кликабельной, при нажатии на которую вызывается ссылка "/" (<a href="/" /a>)

Кнопка ГЛАВНОЕ
1)удаляется, т.к. на старотовую страницу теперь ведёт иконка сайта
2)вместо ней добавляется "Буду смотреть", который ведёт на "/users/{user_id}/watchlist"
На front при загрузке стартовой страницы отправляется кортеж значение user, который содержит в себе user.id, user.name, user.password. 
В таком случае ссылка будет: <a href="/users/{{ user.id }}/watchlist"

Кнопка ИЗБРАННОЕ
Аналогично кнопке "Буду смотреть", только ведёт на страницу "/users/{user_id}/favorite", а значит ссылка будет <a href="/users/{{ user.id }}/favorite"

Кнопка ПОИСК
Остаётся такой же заглушкой, как и сейчас

Иконка ПРОФИЛЯ
Аналогично кнопкам "Избранное" и "Буду смотреть", только ведёт на "/users/{user_id}", ссылка <a href="/users/{{ user.id }}"

ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗОВАН, ТО ЕМУ ПОКАЗЫВАЕТСЯ ДРУГОЙ HTML, пусть будет index1.html
В нём в заголовке нет икноки пользователь, а расположены слова login/register, которые ведут на соответствующие странички
Так сделано в моих тестовах файлах:
        <div>
            <a href="/login" class="text-blue-500 hover:underline">Login</a> /
            <a href="/register" class="text-blue-500 hover:underline">Register</a>
        </div>


Оставшуюся часть стартовой странички обсуждать пока не будем.
Нейронкой потыкал, вот кликабельная иконка через JS
<div className="px-0 float-left table h-full m:px-10">
  <Link to="/">
    <img src={logopic} className={styles.logo} alt="Логотип" />
  </Link>
</div>






























# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
