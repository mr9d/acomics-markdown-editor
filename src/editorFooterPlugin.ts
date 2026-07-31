import {
  addBottomAreaChild$,
  realmPlugin,
  viewMode$,
} from '@mdxeditor/editor';
import { useCellValue } from '@mdxeditor/gurx';
import { createElement } from 'react';

const EditorFooter = () => {
  const viewMode = useCellValue(viewMode$);

  if (viewMode !== 'source') {
    return null;
  }

  return createElement(
    'footer',
    {
      'aria-label': 'Справка и участие в разработке',
      className: 'acomicsMarkdownEditorFooter',
    },
    createElement(
      'a',
      {
        href: 'https://github.github.com/gfm/',
        rel: 'noopener noreferrer',
        target: '_blank',
      },
      'Справка по GitHub Flavored Markdown',
    ),

  );
};

export const editorFooterPlugin = realmPlugin({
  init: (realm) => {
    realm.pub(addBottomAreaChild$, EditorFooter);
  },
});
