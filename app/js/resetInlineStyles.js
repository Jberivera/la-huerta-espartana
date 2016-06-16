export default function resetInlineStyles(...args) {
  args.forEach(({ style }) => {
    Object.keys(style).forEach((key) => {
      style.removeProperty(key);
    });
  });
}
