// Load modules
import Fractal from './fractal.js';
import prefix from '../utils/prefix.js';

const math = Math;
const transform = prefix.css + 'transform';
const gpu = ' translateZ(0)';

const keyframes = (prog, frames) => {
  for (let i = 0, l = frames.length - 1; i < l; i++) {
    const frStart = frames[i][0];
    const frEnd = frames[i + 1][0];
    const startValue = frames[i][1];
    const endValue = frames[i + 1][1];
    if (i === 0 && prog <= frStart) return startValue;
    if (i === l && prog >= frEnd) return endValue;
    if (prog >= frStart && prog <= frEnd) {
      const currentIteration = prog - frStart;
      const totalIterations = frEnd - frStart;
      const changeInValue = startValue + ((endValue - startValue) * (currentIteration / totalIterations));
      return changeInValue;
    }
  }
};

const Animations = {
  page: $bg => (prog, y) => {
    $bg.style[transform] = 'translateY(' + -100 * prog + 'px)' + gpu;
  },

  intro: $pageTitle => (stage, prog, y) => {
    stage.style[transform] = 'translateY(' + -(y * 0.7) + 'px)' + gpu;
    stage.style.opacity = math.max(0, 1 - (prog * 3));
    $pageTitle.style[transform] = 'translateY(' + -y + 'px)' + gpu;
    $pageTitle.style.opacity = math.max(0, 1 - (prog * 20));
  },

  showcase: ($projectsWrap, $showcaseDesc, $projects) => (_, prog, y) => {
    $projectsWrap.style[transform] = 'translateY(' + -y + 'px)' + gpu;
    $showcaseDesc.style[transform] = 'translateY(' + -(200 * prog) + 'px)' + gpu;
    $showcaseDesc.style.opacity = prog < 0.5 ? 0 + math.min(1, (prog - 0.125) * 8) : 1 - ((prog - 0.5) * 4);
    [].forEach.call($projects, (project, id) => {
      project.style[transform] = 'translateY(' + -(y / id) + 'px) rotate(90deg)' + gpu;
    });
  },

  about: ($aboutDesc, $fractal) => (_, prog, y) => {
    const aboutYVal = (200 * prog) * -1;
    const aboutOpacityVal = keyframes(prog, [[0.125, 0], [0.25, 1], [0.8, 1], [0.95, 0]]);
    $aboutDesc.style[transform] = 'translateY(' + aboutYVal + 'px)' + gpu;
    $aboutDesc.style.opacity = aboutOpacityVal;
    const fractalScaleVal = keyframes(prog, [[0, 0.5], [0.5, 1]]);
    const fractalOpacityVal = keyframes(prog, [[0.025, 0], [0.3, 1], [0.6, 1], [0.8, 0]]);
    const fractalProgVal = keyframes(prog, [[0, 0], [0.025, 0.2], [0.5, 0.5], [1, 1]]);
    $fractal.style[transform] = 'scale(' + fractalScaleVal + ')' + gpu;
    $fractal.style.opacity = fractalOpacityVal;
    Fractal.draw(fractalProgVal);
  },

  contact: () => (stage, prog, y) => {
    stage.style[transform] = 'translateY(' + -y + 'px)' + gpu;
  }
};

// Export Singleton so we have an access to the same instantion across the app
export default Animations;
