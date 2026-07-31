import {
  type CodeBlockEditorProps,
  codeBlockPlugin,
  useCodeBlockEditorContext,
} from '@mdxeditor/editor';
import { type ChangeEvent, createElement } from 'react';

const PlainTextCodeBlockEditor = ({ code, language }: CodeBlockEditorProps) => {
  const { setCode } = useCodeBlockEditorContext();

  return createElement(
    'div',
    { className: 'acomicsMarkdownEditorCodeBlock' },
    createElement('span', null, language || 'Code'),
    createElement('textarea', {
      'aria-label': language ? language + ' code' : 'Code block',
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => setCode(event.target.value),
      spellCheck: false,
      value: code,
    }),
  );
};

export const plainTextCodeBlockPlugin = () => codeBlockPlugin({
  codeBlockEditorDescriptors: [{
    Editor: PlainTextCodeBlockEditor,
    match: () => true,
    priority: 0,
  }],
  defaultCodeBlockLanguage: '',
});
