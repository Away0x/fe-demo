const es = document.createElement('div').style;

const vendor = (() => {
  // 通过 transition 属性判断是何种浏览器
  const transformNames: any = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'Transform',
  };

  for (const key in transformNames) {
    if (es[transformNames[key]]) {
      return key;
    }
  }

  return '';
})();

export function prefixStyle(style: string) {
  if (!vendor) return style;
  if (vendor === 'standard') return style;
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export function windowOpen(url: string) {
  const $a = document.createElement('a');
  document.body.appendChild($a);
  $a.href = url;
  $a.rel = 'noopener noreferrer';
  $a.target = '_blank';
  $a.click();
  
  setTimeout(() => {
    try {
      if ($a.remove) {
        $a.remove();
      } else if (($a as any).removeNode) {
        ($a as any).removeNode();
      }
    } catch (e) {}
  }, 5000);
}