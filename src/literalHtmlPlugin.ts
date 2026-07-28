import {
  addImportVisitor$,
  MdastImportVisitor,
  realmPlugin,
} from '@mdxeditor/editor';
import { Html } from 'mdast';
import {
  $createParagraphNode,
  $createTextNode,
  $isRootNode,
} from 'lexical';

const literalHtmlVisitor: MdastImportVisitor<Html> = {
  testNode: 'html',
  visitNode: ({ actions, lexicalParent, mdastNode }) => {
    const textNode = $createTextNode(mdastNode.value);

    if ($isRootNode(lexicalParent)) {
      const paragraphNode = $createParagraphNode();

      paragraphNode.append(textNode);
      lexicalParent.append(paragraphNode);
    } else {
      actions.addAndStepInto(textNode);
    }
  },
};

export const literalHtmlPlugin = realmPlugin({
  init: (realm) => {
    realm.pubIn({
      [addImportVisitor$]: literalHtmlVisitor,
    });
  },
});
