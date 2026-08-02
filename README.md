> English version below

# [RU] Визуальный редактор Markdown для Авторского Комикса

Визуальный Markdown-редактор для сайта [«Авторский Комикс»](https://acomics.ru/). Редактор работает в визуальном режиме и в режиме исходного кода. Он поддерживает заголовки, списки, цитаты, ссылки, изображения, таблицы, разделители и базовое форматирование текста.

Редактор встраивается поверх `<textarea>` с классом `acomicsMarkdownEditor`. Исходное содержимое поля открывается в редакторе, а изменения автоматически записываются обратно:

```html
<textarea name="..." class='acomicsMarkdownEditor'>**Текст для редактирования**</textarea>
```

## Локальный запуск

Для локального запуска потребуется [Node.js](https://nodejs.org/) 20 (рекомендуемая версия — 20.13.1).

1. Клонируйте репозиторий и перейдите в его каталог:

   ```shell
   git clone https://github.com/mr9d/acomics-markdown-editor.git
   cd acomics-markdown-editor
   ```

2. Установите зависимости: `npm ci`.
3. Соберите редактор: `npm run build`.
4. Откройте `demo/dev.html` в браузере. Для автоматической пересборки используйте `npm run watch`.

Перед отправкой изменений выполните проверки: `npm run lint`, `npm test` и `npm run build`.

## Используемые технологии

- TypeScript 5.8 ([документация](https://www.typescriptlang.org/docs/))
- React 19.2.8 ([документация](https://react.dev/))
- MDXEditor 4.1.0 ([документация](https://mdxeditor.dev/))
- Webpack 5.99.6 ([документация](https://webpack.js.org/concepts/))
- ESLint 9.25.1 ([документация](https://eslint.org/docs/latest/))

## Сообщить об ошибке

Если вы обнаружили ошибку в работе редактора, создайте обращение в репозитории [acomics-public](https://github.com/mr9d/acomics-public/issues). Опишите проблему, ожидаемый результат и шаги для её воспроизведения.

# [EN] Acomics Markdown visual editor

A visual Markdown editor for the [Acomics](https://acomics.ru/) website. The editor supports both visual and source-code modes, including headings, lists, blockquotes, links, images, tables, horizontal rules, and basic text formatting.

The editor is mounted over a `<textarea>` element with the `acomicsMarkdownEditor` class. The field's initial content is loaded into the editor, and changes are automatically written back to it:

```html
<textarea name="..." class="acomicsMarkdownEditor">**Text to edit**</textarea>
```

## Local development

[Node.js](https://nodejs.org/) 20 is required for local development (version 20.13.1 is recommended).

1. Clone the repository and enter its directory:

   ```shell
   git clone https://github.com/mr9d/acomics-markdown-editor.git
   cd acomics-markdown-editor
   ```

2. Install the dependencies: `npm ci`.
3. Build the editor: `npm run build`.
4. Open `demo/dev.html` in your browser. Use `npm run watch` to rebuild automatically when files change.

Before submitting changes, run the checks: `npm run lint`, `npm test`, and `npm run build`.

## Technologies

- TypeScript 5.8 ([documentation](https://www.typescriptlang.org/docs/))
- React 19.2.8 ([documentation](https://react.dev/))
- MDXEditor 4.1.0 ([documentation](https://mdxeditor.dev/))
- Webpack 5.99.6 ([documentation](https://webpack.js.org/concepts/))
- ESLint 9.25.1 ([documentation](https://eslint.org/docs/latest/))

## Reporting bugs

If you find a bug in the editor, open an issue in the [acomics-public repository](https://github.com/mr9d/acomics-public/issues). Describe the problem, the expected result, and the steps needed to reproduce it.
