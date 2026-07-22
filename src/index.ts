import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import { createElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

// HTML-элемент, по которому происходит инициализация редактора
const EDITOR_TAG: string = 'textarea';

// Класс, по которому происходит инициализация редактора
const EDITOR_CLASS: string = 'acomicsMarkdownEditor';

// Класс-обертка редактора
const WRAPPER_CLASS: string = 'acomicsMarkdownEditorWrapper';

document.querySelectorAll<HTMLTextAreaElement>(`${EDITOR_TAG}.${EDITOR_CLASS}`).forEach((editorTag) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(WRAPPER_CLASS);

  editorTag.insertAdjacentElement('afterend', wrapper);
  editorTag.hidden = true;

  createRoot(wrapper).render(createElement(MDXEditor, {
    markdown: editorTag.value,
    onChange: (markdown: string) => {
      editorTag.value = markdown;
    },
    plugins: [
      toolbarPlugin({
        toolbarContents: () => createElement(
          Fragment,
          null,
          createElement(UndoRedo),
          createElement(Separator),
          createElement(BoldItalicUnderlineToggles),
          createElement(CodeToggle),
          createElement(Separator),
          createElement(BlockTypeSelect),
          createElement(ListsToggle),
          createElement(Separator),
          createElement(CreateLink),
        ),
      }),
      listsPlugin(),
      quotePlugin(),
      headingsPlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      markdownShortcutPlugin(),
    ],
  }));
});
