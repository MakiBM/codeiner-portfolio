import {$} from '../utils/dom.js';

const Section = {
  setActive: className => {
    const $active = $('section.is-active');
    const $current = $('section' + className);
    if ($active === $current) return;
    $active.classList.remove('is-active');
    $current.classList.add('is-active');
  }
};

export default Section;
