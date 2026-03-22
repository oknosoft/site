import React from 'react';
//import { Editor } from '@tinymce/tinymce-react';
import { CKEditor } from 'ckeditor4-react';

const template = '<div id="mce-content" style="display: none;">%</div>\n{<TinyMCE />}';

export default function TinyMCE(props) {

  return <CKEditor
    editorUrl={'/imgs/ckeditor4/ckeditor.js'}
    config = {{versionCheck: false}}
    onInstanceReady={ (evt) => {
      const {editor} = evt;
      const {parentNode} = editor.element.$;
      const stored = parentNode.querySelector(`#mce-content`);
      editor.setData(stored.innerHTML);
    } }
    onAfterCommandExec={(evt) => {
      const {editor, data: {command}} = evt;
      if(evt.data.command.previousState = 1) {
        const current = $p.cat.articles.by_id(location.pathname.substring(1));
        current.content = template.replace('%', editor.getData());
        current.save();
      }
    }}
  />;
}
