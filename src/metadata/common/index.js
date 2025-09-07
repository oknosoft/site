// общие модули

// строки интернационализации
import i18ru from "./i18n.ru";
import scale_svg from "./scale_svg";
import superlogin from "./superlogin";

function loadScript(src, type) {
  for(const elm of document.head.children) {
    if(elm.tagName.toLowerCase() === type) {
      const {value} = elm.attributes[type === 'script' ? 'src' : 'href'];
      if(value === src) {
        return Promise.resolve();
      }
    }
  }
  return this.load_script(src, type);
}

export default function ($p) {
  i18ru($p);
  Object.assign($p.utils, {scale_svg, loadScript});
  superlogin($p);
}
