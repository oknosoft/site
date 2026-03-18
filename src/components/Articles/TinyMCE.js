import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const template = '<div id="mce-content" style="display: none;">%</div> {<TinyMCE />}';

export default function TinyMCE(props) {

  return <Editor
    apiKey='b9fcflo4o7emc6bh26g5qxbgw0t8z67glb818ye2bwx3kvjn'
    onInit={ (_evt, editor) => {
      let {parentNode} = editor.contentAreaContainer;
      while (!parentNode.className.includes('MuiBox-root')) {
        parentNode = parentNode.parentNode;
      }
      const stored = parentNode.querySelector(`#mce-content`);
      setTimeout(() => editor.setContent(stored.innerHTML), 100);
    } }
    init={{
      //height: 500,
      //initialValue: props.content,
      onboarding: false,
      menu: {
        //file: { title: 'File', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
        edit: { title: 'Редактор', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace | save' },
        view: { title: 'Вид', items: 'code suggestededits revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
        insert: { title: 'Вставить', items: 'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
        //format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
        //tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
        table: { title: 'Таблица', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
        //help: { title: 'Help', items: 'help' }
      },
      setup: (editor) => {
        editor.ui.registry.addMenuItem('save', {
          text: 'Сохранить',
          icon: 'save',
          onAction() {
            const current = $p.cat.articles.by_id(location.pathname.substring(1));
            current.content = template.replace('%', editor.getContent());
            current.save();
          },
        });
      },
      //menubar: false,
      menubar: 'edit view insert table', //favs file format tools help
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      //content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
  />;
}
