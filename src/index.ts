import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from "prosemirror-markdown";
import { exampleSetup } from "prosemirror-example-setup";

import './index.css';

// HTML-элемент, по которому происходит инициализация редактора
const EDITOR_TAG: string = 'textarea';

// Класс, по которому происходит инициализация редактора
const EDITOR_CLASS: string = 'acomicsMarkdownEditor';


class MarkdownView {
  private textarea: HTMLTextAreaElement;

  constructor(textarea: HTMLTextAreaElement, content: string) {
    this.textarea = textarea;
    this.textarea.style.display = 'block';
    this.textarea.value = content;
  }

  get content() {
    return this.textarea.value;
  }

  focus() {
    this.textarea.focus();
  }

  destroy() {
    this.textarea.style.display = 'none';
  }
}


class ProseMirrorView {
  private view: EditorView;
  private target: HTMLDivElement;

  constructor(textarea: HTMLTextAreaElement, content: string) {
    this.target = document.createElement('div');
    textarea.after(this.target);
    this.view = new EditorView(this.target, {
      state: EditorState.create({
        doc: defaultMarkdownParser.parse(content),
        plugins: exampleSetup({ schema })
      }),
    });
  }

  get content() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }

  focus() {
    this.view.focus();
  }

  destroy() {
    this.view.destroy();
    this.target.remove();
  }
}


const markdownTextareas: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll(`${EDITOR_TAG}.${EDITOR_CLASS}`);

markdownTextareas.forEach((textarea: HTMLTextAreaElement) => {
  const value = textarea.value;
  textarea.style.display = 'none';
  let view = new ProseMirrorView(textarea, value);
});
