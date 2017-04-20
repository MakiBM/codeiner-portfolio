import VirtualScroll from 'virtual-scroll';
import Navigation from './navigation.js';

// Scope global objects
const win = window;
const doc = document;
const math = Math;

const Scroller = () => {
  const scroller = new VirtualScroll();
  let stages = {};
  let stagesArr = [];
  let onscrollCbArr = [];
  let stagesCbArr = [];
  let ease = 0.1;
  let targetY = 0;
  let globalY = 0;
  let scrollHeight;
  let winH;

  const _setScrollTarget = e => {
    targetY += e.deltaY;
    targetY = math.max((scrollHeight - winH) * -1, targetY);
    targetY = math.min(0, targetY);
  };

  const _getStageOffset = stage => {
    const adjust = (stage === '.js-showcase') ? stages[stage].height * 0.5 : 0;
    return (stages[stage].top - adjust) * -1;
  };

  const _setActiveStage = y => {
    let isSet = false;
    stagesArr.filter((stage, i) => {
      const yp = -y + (winH * 0.7);
      if (!isSet && yp >= -_getStageOffset(stage) && yp < stages[stage].bottom) {
        Navigation.setActive(i);
        isSet = true;
      }
      return null;
    });
  };

  const _progress = (top, bottom) => {
    const y = globalY * -1;
    const isFirstScreen = (top === 0);
    const startPoint = top - (isFirstScreen ? 0 : winH);
    const endPoint = bottom;

    if (y < startPoint) return 0;
    if (y > endPoint) return 1;
    return (y - startPoint) / (endPoint - startPoint);
  };

  const _draw = () => {
    win.requestAnimationFrame(_draw);

    if (-globalY < 0.001) globalY = 0; // break easing
    globalY += (targetY - globalY) * ease;

    _setActiveStage(globalY);

    // Run scroll callbacks
    onscrollCbArr.forEach(cb => {
      const progress = _progress(0, scrollHeight);
      cb(progress, globalY);
    });

    stagesCbArr.forEach(arr => {
      const stage = arr[0];
      const cb = arr[1];
      const s = stages[stage];
      const progress = _progress(s.top, s.bottom);
      const localY = (s.height + (s.top === 0 ? 0 : winH)) * progress;
      cb(s.el, progress, localY);
    });
  };

  const _traverseStages = () => {
    stagesArr.forEach(stage => {
      stages[stage].el = doc.querySelector(stage);
    });
  };

  const _setStagesHeight = () => {
    stagesArr.forEach(stage => {
      stages[stage].height = stages[stage].el.getBoundingClientRect().height;
    });
  };

  const _setStagesOffset = () => {
    let offset = 0;
    stagesArr.forEach(stage => {
      stages[stage].top = offset;
      stages[stage].bottom = offset += stages[stage].height;
    });
  };

  const _setScrollHeight = () => {
    scrollHeight = 0;
    stagesArr.forEach(stage => {
      scrollHeight += stages[stage].height;
    });
  };

  const addStages = arr => {
    stagesArr = arr;
    arr.forEach(stage => {
      stages[stage] = {};
    });
  };

  const update = () => {
    _setStagesHeight();
    _setStagesOffset();
    _setScrollHeight();
    winH = win.innerHeight;
  };

  const onprogress = (stage, fn) => {
    stagesCbArr.push([stage, fn]);
  };

  const onscroll = fn => {
    onscrollCbArr.push(fn);
  };

  const goTo = stage => {
    targetY = _getStageOffset(stage);
  };

  const init = () => {
    _traverseStages();
    update();
    _draw();
    scroller.on(_setScrollTarget);
    win.addEventListener('resize', update);
  };

  return {
    init,
    update,
    onprogress,
    onscroll,
    addStages,
    goTo
  };
};

// Export Singleton so we have an access to the same instantion across the app
export default (new Scroller());
