export default function resetInlineStyles(...args) {
  args.forEach((element) => {
    element.removeAttribute('style');
  });
}
