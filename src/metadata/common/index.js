// общие модули

// строки интернационализации
import i18ru from "./i18n.ru";
import scale_svg from "./scale_svg";
import superlogin from "./superlogin";

export default function ($p) {
  i18ru($p);
  Object.assign($p.utils, {scale_svg});
  superlogin($p);
}
