function getPosition(element) {
  return element.style.position || window.getComputedStyle(element).position || 'static';
}

export function getOffsetTop(element, offset = 0) {
  const position = getPosition(element);
  if (element.tagName === 'BODY') {
    return offset;
  }
  if (position === 'static') {
    element.style.position = 'relative';
  }
  offset += element.offsetTop;
  return getOffsetTop(element.parentNode, offset);
}

export function getOffsetLeft(element, offset = 0) {
  const position = getPosition(element);
  if (element.tagName === 'BODY') {
    return offset;
  }
  if (position === 'static') {
    element.style.position = 'relative';
  }
  offset += element.offsetLeft;
  return getOffsetLeft(element.parentNode, offset);
}

export default function getOffset(element, offset = { left: 0, top: 0 }) {
  const position = getPosition(element);
  if (element.tagName === 'BODY') {
    return offset;
  }
  if (position === 'static') {
    element.style.position = 'relative';
  }
  offset = {
    left: offset.left + element.offsetLeft,
    top: offset.top + element.offsetTop
  };

  return getOffset(element.parentNode, offset);
}
