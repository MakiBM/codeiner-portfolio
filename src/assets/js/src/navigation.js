import Scroller from './scroller.js';
import Section from './section.js';

const Navigation = () => {
  let $nav;
  let $navLinks;
  let currentActive = 0;

  const _onclick = e => Scroller.goTo(e.target.dataset.section);

  const setActive = id => {
    if (id === currentActive) return;
    $navLinks[currentActive].classList.remove('is-active');
    $navLinks[id].classList.add('is-active');
    currentActive = id;
    Section.setActive($navLinks[id].dataset.section);
  };

  const init = $el => {
    $nav = $el;
    $navLinks = $nav.querySelectorAll('a');
    $nav.addEventListener('click', _onclick);
  };

  return {
    init,
    setActive
  };
};

// Export Singleton so we have an access to the same instantion across the app
export default (new Navigation());
