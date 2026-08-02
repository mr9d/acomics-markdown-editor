import {
  type CodeBlockEditorProps,
  codeBlockPlugin,
  useCodeBlockEditorContext,
} from '@mdxeditor/editor';
import { type ChangeEvent, createElement, useEffect, useState } from 'react';

import './plainTextCodeBlockPlugin.css';

const PlainTextCodeBlockEditor = ({ code, language }: CodeBlockEditorProps) => {
  const { setCode } = useCodeBlockEditorContext();
  const [value, setValue] = useState(code);

  useEffect(() => {
    setValue(code);
  }, [code]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    setCode(nextValue);
  };

  return createElement(
    'div',
    { className: 'acomicsMarkdownEditorCodeBlock' },
    createElement('span', null, language || 'Code'),
    createElement('textarea', {
      'aria-label': language ? language + ' code' : 'Code block',
      onChange: handleChange,
      spellCheck: false,
      value,
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
