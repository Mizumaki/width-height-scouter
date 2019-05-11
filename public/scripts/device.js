const deviceInfo = window.navigator.userAgent;

const { width } = window.screen;

const isIPhone = /iphone/i.test(deviceInfo);
const isIPad = /ipad/i.test(deviceInfo);
const isIOS = isIPhone || isIPad;

if (isIOS) {
  window.document.getElementById('root').classList.add('ios')
}

const optimizeHeight = () => {
  const height = window.innerHeight;

  document.body.style.height = `${height}px`;
  appliedHeight = height;
};

const optimizeHeightWhenResize = () => {
  // FIXME: これは Android で文字入力を行う際に、height が文字入力セクションを抜いた高さになってしまう！
  const height = window.innerHeight;
  if (appliedHeight === height) {
    return;
  }
  document.body.style.height = `${height}px`;
};

window.onload = optimizeHeight;
window.onresize = optimizeHeightWhenResize;
