function getPosition(element) {
  return element.style.position || window.getComputedStyle(element).position || 'static';
}

function setRelative(element, callback, offset) {

  return setRelativeRecursion(element);

  function setRelativeRecursion(e) {
    const position = getPosition(e);
    if (e.tagName === 'BODY') {
      return callback(element, offset);
    }
    if (position === 'static') {
      e.style.position = 'relative';
    }
    return setRelativeRecursion(e.parentNode);
  }
}

function getOffsetTopRecursion(element, offset) {
  if (element.tagName === 'BODY') {
    return offset;
  }
  offset += element.offsetTop;
  return getOffsetTopRecursion(element.parentNode, offset);
}

function getOffsetLeftRecursion(element, offset) {
  if (element.tagName === 'BODY') {
    return offset;
  }
  offset += element.offsetLeft;
  return getOffsetLeftRecursion(element.parentNode, offset);
}

function getOffsetRecursion(element, offset) {
  if (element.tagName === 'BODY') {
    return offset;
  }
  offset = {
    left: offset.left + element.offsetLeft,
    top: offset.top + element.offsetTop
  };
  return getOffsetRecursion(element.parentNode, offset);
}

export function getOffsetTop(element, offset = 0) {
  return setRelative(element, getOffsetTopRecursion, offset);
}

export function getOffsetLeft(element, offset = 0) {
  return setRelative(element, getOffsetLeftRecursion, offset);
}

export default function getOffset(element, offset = { left: 0, top: 0 }) {
  return setRelative(element, getOffsetRecursion, offset);
}
