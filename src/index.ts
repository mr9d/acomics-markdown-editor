import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  Separator,
  StrikeThroughSupSubToggles,
  UndoRedo,
  diffSourcePlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import { createElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { literalHtmlPlugin } from './literalHtmlPlugin';

// CSS
import '@mdxeditor/editor/style.css';
import './index.css';

// HTML-элемент, по которому происходит инициализация редактора
const EDITOR_TAG: string = 'textarea';

// Класс, по которому происходит инициализация редактора
const EDITOR_CLASS: string = 'acomicsMarkdownEditor';

document.querySelectorAll<HTMLTextAreaElement>(`${EDITOR_TAG}.${EDITOR_CLASS}`).forEach((editorTag) => {
  const editorRoot = document.createElement('div');

  editorTag.insertAdjacentElement('afterend', editorRoot);
  editorTag.hidden = true;

  createRoot(editorRoot).render(createElement(MDXEditor, {
    className: 'acomicsMarkdownEditorRoot',
    contentEditableClassName: 'acomicsMarkdownEditorContent',
    markdown: editorTag.value,
    suppressHtmlProcessing: true,
    onChange: (markdown: string) => {
      editorTag.value = markdown;
    },
    plugins: [
      literalHtmlPlugin(),
      toolbarPlugin({
        toolbarContents: () => createElement(
          DiffSourceToggleWrapper,
          {
            options: ['rich-text', 'source'],
            children: createElement(
              Fragment,
              null,
              createElement(UndoRedo),
              createElement(Separator),
              createElement(BoldItalicUnderlineToggles, { options: ['Bold', 'Italic'] }),
              createElement(StrikeThroughSupSubToggles, { options: ['Strikethrough'] }),
              createElement(Separator),
              createElement(BlockTypeSelect),
              createElement(ListsToggle),
              createElement(Separator),
              createElement(CreateLink),
              createElement(InsertImage),
              createElement(InsertTable),
              createElement(InsertThematicBreak),
            ),
          },
        ),
      }),
      listsPlugin(),
      quotePlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      imagePlugin(),
      tablePlugin(),
      thematicBreakPlugin(),
      diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: editorTag.value }),
      markdownShortcutPlugin(),
    ],
  }));
});
