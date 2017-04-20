// Load modules
import Scroller from './src/scroller.js';
import Animate from './src/animations.js';
import Navigation from './src/navigation.js';
import Fractal from './src/fractal.js';
import {$, $s} from './utils/dom.js';
import Map from './src/map.js';

Scroller.addStages([
  '.js-intro',
  '.js-showcase',
  '.js-about',
  '.js-contact'
]);

const onload = () => {
  Scroller.init();
  Navigation.init($('.js-navigation'));
  Fractal.init($('#fractal'));
  Map.init($('#map'));

  Scroller.onscroll(Animate.page($('.js-bg')));
  Scroller.onprogress('.js-intro', Animate.intro($('.js-page-title')));
  Scroller.onprogress('.js-showcase', Animate.showcase($('.js-showcase__projects'), $('.js-showcase__txt'), $s('.js-showcase__project')));
  Scroller.onprogress('.js-about', Animate.about($('.js-about__txt'), $('#fractal')));
  Scroller.onprogress('.js-contact', Animate.contact());
};

window.onload = onload;
