import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const template = '<div id="mce-content">%</div>\n{<CKEditor4 />}';

export default function CKEditor4({doc, direct}) {

  return <CKEditor
    editorUrl={'/lib/ckeditor4/ckeditor.js'}
    config = {{versionCheck: false}}
    onInstanceReady={ (evt) => {
      const {editor} = evt;
      if(direct && doc) {
        editor.setData(doc.content);
      }
      else {
        const {parentNode} = editor.element.$;
        const stored = parentNode.querySelector(`#mce-content`);
        stored.style.display = 'none';
        editor.setData(stored.innerHTML);
      }
    } }
    onAfterCommandExec={(evt) => {
      const {editor, data: {command}} = evt;
      if(evt.data.command.previousState = 1) {
        if(direct && doc) {
          doc.content = editor.getData();
          doc.save();
        }
        else {
          const current = $p.cat.articles.by_id(location.pathname.substring(1));
          current.content = template.replace('%', editor.getData());
          current.save();
        }
      }
    }}
  />;
}
