function reduceTotal(array) {
  return array.reduce((a, b) => {
    return a + b.count * b.price;
  }, 0);
}

export default reduceTotal;
