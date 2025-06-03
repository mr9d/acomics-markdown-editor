import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from "prosemirror-markdown";
import { exampleSetup } from "prosemirror-example-setup";

import './index.css';

import editorHtml from './editor.html';

// HTML-элемент, по которому происходит инициализация редактора
const EDITOR_TAG: string = 'textarea';

// Класс, по которому происходит инициализация редактора
const EDITOR_CLASS: string = 'acomicsMarkdownEditor';

// Класс-обертка редактора
const WRAPPER_CLASS: string = 'acomicsMarkdownEditorWrapper';


class MarkdownView {
  private container: HTMLDivElement;
  private textarea: HTMLTextAreaElement;

  constructor(wrapper: HTMLDivElement) {
    this.container = wrapper.querySelector('.markdown');
    this.textarea = this.container.querySelector('textarea');
  }

  get content() {
    return this.textarea.value;
  }

  show() {
    this.container.style.display = 'flex';
    this.textarea.focus();
  }

  hide() {
    this.container.style.display = 'none';
  }
}


class ProseMirrorView {
  private container: HTMLDivElement;
  private textarea: HTMLTextAreaElement;
  private view: EditorView;

  constructor(wrapper: HTMLDivElement) {
    this.textarea = wrapper.querySelector('.markdown textarea');
    this.container = wrapper.querySelector('.visual');
  }

  get content() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }

  show() {
    this.view = new EditorView(this.container, {
      state: EditorState.create({
        doc: defaultMarkdownParser.parse(this.textarea.value),
        plugins: exampleSetup({ schema })
      }),
    });
    this.container.style.display = 'flex';
    this.view.focus();
  }

  hide() {
    this.view.destroy();
    this.textarea.value = this.content;
    this.container.style.display = 'none';
  }
}

// Элементы, на которых нужно инициализировать редактор
const markdownTextareas: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll(`${EDITOR_TAG}.${EDITOR_CLASS}`);

// Инициализация всех редакторов на странице
markdownTextareas.forEach((textarea: HTMLTextAreaElement, key: number) => {

  // Добавляет HTML-обертку редактора
  textarea.insertAdjacentHTML('afterend', editorHtml);
  const wrapper: HTMLDivElement = textarea.parentNode.querySelector(`.${WRAPPER_CLASS}`);

  // Кладем элемент textarea внутрь обертки
  wrapper.querySelector('.markdown').append(textarea);

  // Инициализируем View
  const markdownView = new MarkdownView(wrapper);
  markdownView.hide();
  const proseMirrorView = new ProseMirrorView(wrapper);
  proseMirrorView.show();

  const viewInputChangeListener = (evt: Event) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    if (target.checked) {
      if (target.value === 'visual') {
        markdownView.hide();
        proseMirrorView.show();
      } else {
        proseMirrorView.hide();
        markdownView.show();
      }
    }
  };

  // Переключатель View
  wrapper.querySelectorAll('.switcher input[name="view"]').forEach(
    (input: HTMLInputElement) => {
      // Обновляем name для поддержки нескольких редакторов на странице
      input.name = `view${key}`;

      // Добавляем обработчик переключения
      input.addEventListener('change', viewInputChangeListener);
    }
  );
});
