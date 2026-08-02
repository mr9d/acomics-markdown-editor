import {
  addBottomAreaChild$,
  realmPlugin,
  viewMode$,
} from '@mdxeditor/editor';
import { useCellValue } from '@mdxeditor/gurx';
import { createElement } from 'react';

import './style.css';

const EditorFooter = () => {
  const viewMode = useCellValue(viewMode$);

  return createElement(
    'footer',
    {
      'aria-label': 'Справка и участие в разработке',
      className: 'acomicsMarkdownEditorFooter',
    },
    viewMode === 'source' && createElement(
      'a',
      {
        href: 'https://github.github.com/gfm/',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
      'Справка по GitHub Flavored Markdown',
    ),
    createElement(
      'a',
      {
        href: 'https://github.com/mr9d/acomics-markdown-editor',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
      'GitHub',
    ),
    createElement(
      'a',
      {
        href: 'https://github.com/mr9d/acomics-public',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
      'Сообщить об ошибке',
    ),
  );
};

export const footerPlugin = realmPlugin({
  init: (realm) => {
    realm.pub(addBottomAreaChild$, EditorFooter);
  },
});
