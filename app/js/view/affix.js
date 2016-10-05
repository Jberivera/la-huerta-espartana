import { getOffsetTop } from './getOffset';
import resetInlineStyles from './resetInlineStyles';

/**
 * Place the element fixed to the window from a defined offset top
 * @param  {Object} elem DOM node element
 * @param  {Object} options Options described in an object
 * @return {Function} affixHandler The Affix handler set on the window scroll event listener
 */
export default function affix(element, options) {
  if (!element) { return };

  let toggle = true,
    opt = typeof options === 'object' ? options : {},
    offsetTop = opt.offsetTop || getOffsetTop(element),
    topReset = opt.topReset || offsetTop,
    fixTop = opt.fixTop || '0';

  window.addEventListener('scroll', affixHandler);

  function affixHandler (e) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollTop >= offsetTop && toggle) {
      toggle = false;
      element.style.position = 'fixed';
      element.style.top = `${fixTop}px`;
      element.classList.add('affix');
    } else if (scrollTop <= topReset && !toggle) {
      toggle = true;
      resetInlineStyles(element);
      element.classList.remove('affix');
    }
  }

  return affixHandler;
}
