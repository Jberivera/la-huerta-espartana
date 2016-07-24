function getPosition(element) {
  return element.style.position || window.getComputedStyle(element).position || 'static';
}

function setRelative(element) {
  const position = getPosition(element);
  if (element.tagName === 'BODY') {
    return;
  }
  if (position === 'static') {
    element.style.position = 'relative';
  }
  return setRelative(element.parentNode);
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

export function getOffsetTop(element, offset = 0) {
  setRelative(element);
  return getOffsetTopRecursion(element, offset);
}

export function getOffsetLeft(element, offset = 0) {
  setRelative(element);
  return getOffsetLeftRecursion(element, offset);
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

export default function getOffset(element, offset = { left: 0, top: 0 }) {
  setRelative(element);
  return getOffsetRecursion(element, offset);
}
