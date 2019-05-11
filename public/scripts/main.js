let prevSizes;

const getSizes = () => {
  const w = window
  const s = w.screen
  const d = document.documentElement;
  const r = document.getElementById('root');

  return {
    docElem: {
      client: [d.clientWidth, d.clientHeight],
      offset: [d.offsetWidth, d.offsetHeight],
      scroll: [d.scrollWidth, d.scrollHeight],
    },
    rootElem: {
      client: [r.clientWidth, r.clientHeight],
      offset: [r.offsetWidth, r.offsetHeight],
      scroll: [r.scrollWidth, r.scrollHeight],
    },
    screen: {
      normal: [s.width, s.height],
      avail: [s.availWidth, s.availHeight]
    },
    window: {
      outer: [w.outerWidth, w.outerHeight],
      inner: [w.innerWidth, w.innerHeight]
    }
  }
}

// https://gist.github.com/Yimiprod/7ee176597fef230d1451
function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}

const addHistory = (contents) => {
  const h = document.querySelector('#modal .histories')
  const element = document.createElement('p')
  element.textContent = contents
  h.appendChild(element)
}

const appendContents = () => {
  const sizes = getSizes();
  const {
    rootElem: { client: rc, offset: roff, scroll: rs },
    docElem: { client: dc, offset: doff, scroll: ds },
    screen: { normal, avail },
    window: { outer, inner }
  } = sizes;
  document.querySelector("#rootElem .client .width").textContent = rc[0];
  document.querySelector("#rootElem .client .height").textContent = rc[1];
  document.querySelector("#rootElem .offset .width").textContent = roff[0];
  document.querySelector("#rootElem .offset .height").textContent = roff[1];
  document.querySelector("#rootElem .scroll .width").textContent = rs[0];
  document.querySelector("#rootElem .scroll .height").textContent = rs[1];
  document.querySelector("#docElem .client .width").textContent = dc[0];
  document.querySelector("#docElem .client .height").textContent = dc[1];
  document.querySelector("#docElem .offset .width").textContent = doff[0];
  document.querySelector("#docElem .offset .height").textContent = doff[1];
  document.querySelector("#docElem .scroll .width").textContent = ds[0];
  document.querySelector("#docElem .scroll .height").textContent = ds[1];

  document.querySelector("#screen .normal .width").textContent = normal[0];
  document.querySelector("#screen .normal .height").textContent = normal[1];
  document.querySelector("#screen .avail .width").textContent = avail[0];
  document.querySelector("#screen .avail .height").textContent = avail[1];
  document.querySelector("#window .outer .width").textContent = outer[0];
  document.querySelector("#window .outer .height").textContent = outer[1];
  document.querySelector("#window .inner .width").textContent = inner[0];
  document.querySelector("#window .inner .height").textContent = inner[1];

  !!prevSizes && addHistory(JSON.stringify(difference(sizes, prevSizes)));

  prevSizes = sizes;
}

const showModal = () => {
  document.getElementById("modal").classList.add('shown')
}

const hideModal = () => {
  document.getElementById("modal").classList.remove('shown')
}

// device

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

const onload = () => {
  appendContents();
  optimizeHeight();
}

const resize = () => {
  appendContents();
  optimizeHeightWhenResize();
}

window.onresize = resize;
window.onload = onload;
