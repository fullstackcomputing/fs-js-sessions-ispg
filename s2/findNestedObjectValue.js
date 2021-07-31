function findNestedObjectValue(obj, keyChain) {
  if (!obj) return;
  const key = keyChain.shift();
  const keyValue = obj[key];
  if (!keyChain.length) return keyValue;
  return findNestedObjectValue(keyValue, keyChain);
}

module.exports = findNestedObjectValue;