/**
 * compares two objects. Returns **true** if they're equal.
 * @param {Object} object1
 * @param {Object} object2
 * @returns {boolean}
 */
export default function compareObjects(object1, object2) {
  let equal = true;
  Object.keys(object1).forEach((key) => {
    if (object2[key] !== object1[key]) equal = false;
  });
  return equal;
}
