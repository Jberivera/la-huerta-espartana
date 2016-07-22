import { getOffsetTop } from './getOffset';
import resetInlineStyles from './resetInlineStyles';

/**
 * Place the element fixed to the window from a defined offset top
 * @param  {Object} elem  DOM node element
 * @param  {Number} top   optional offset top
 * @return {void}
 */
export default function affix(element, topReset, top) {
  if (!element) { return };

  let toggle = true,
    offsetTop = top || getOffsetTop(element);

  topReset = topReset || offsetTop;

  window.addEventListener('scroll', function() {
    if (document.body.scrollTop >= offsetTop && toggle) {
      toggle = false;
      element.style.position = 'fixed';
      element.style.top = 0;
      element.classList.add('affix');
    } else if (document.body.scrollTop <= topReset && !toggle) {
      toggle = true;
      resetInlineStyles(element);
      element.classList.remove('affix');
    }
  });
}