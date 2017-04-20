import Styles from './map-styles.js';

const Map = () => {
  let map;

  const loadGoogleMaps = function() {
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=false&callback=initMap");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
  };

  // Attach to window to expose it for google api loader callback
  window.initMap = () => {
    const mapOptions = {
      center: new google.maps.LatLng(49.6887611, 21.7520208),
      scrollwheel: false,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: Styles
    };

    return new google.maps.Map(map, mapOptions);
  };

  const init = el => {
    map = el;
    loadGoogleMaps();
  };

  return {
    init
  };
};

export default (new Map());
