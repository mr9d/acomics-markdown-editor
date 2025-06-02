import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from "prosemirror-markdown";
import { exampleSetup } from "prosemirror-example-setup";

import './index.css';

import editorHtml from './editor.html';
console.log(editorHtml);

// HTML-элемент, по которому происходит инициализация редактора
const EDITOR_TAG: string = 'textarea';

// Класс, по которому происходит инициализация редактора
const EDITOR_CLASS: string = 'acomicsMarkdownEditor';

// Класс-обертка редактора
const WRAPPER_CLASS: string = 'acomicsMarkdownEditorWrapper';

// Класс-переключатель режима редактора
const SWITCHER_CLASS: string = 'acomicsMarkdownEditorSwitcher';


class MarkdownView {
  private textarea: HTMLTextAreaElement;

  constructor(textarea: HTMLTextAreaElement) {
    this.textarea = textarea;
  }

  get content() {
    return this.textarea.value;
  }

  show() {
    this.textarea.style.display = 'block';
    this.textarea.focus();
  }

  hide() {
    this.textarea.style.display = 'none';
  }
}


class ProseMirrorView {
  private view: EditorView;
  private target: HTMLDivElement;

  constructor(textarea: HTMLTextAreaElement) {
    this.target = document.createElement('div');
    textarea.after(this.target);
    this.view = new EditorView(this.target, {
      state: EditorState.create({
        doc: defaultMarkdownParser.parse(textarea.value),
        plugins: exampleSetup({ schema })
      }),
    });
  }

  get content() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }

  show() {
    this.target.style.display = 'block';
    this.view.focus();
  }

  hide() {
    this.target.style.display = 'none';
  }
}

// Элементы, на которых нужно инициализировать редактор
const markdownTextareas: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll(`${EDITOR_TAG}.${EDITOR_CLASS}`);

// Инициализация всех редакторов на странице
markdownTextareas.forEach((textarea: HTMLTextAreaElement) => {

  // Создаем обертку
  const wrapper = document.createElement('div');
  wrapper.classList.add(WRAPPER_CLASS);

  // Размещаем обертку и кладем элемент textarea в него
  textarea.after(wrapper);
  wrapper.append(textarea);

  // Инициализируем View
  const markdownView = new MarkdownView(textarea);
  markdownView.hide();
  const proseMirrorView = new ProseMirrorView(textarea);
  proseMirrorView.show();

  // Переключатель View
  const switcher = document.createElement('div');
  switcher.classList.add(SWITCHER_CLASS);
  wrapper.after(switcher);
});
