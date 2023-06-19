function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return str; // Empty string, nothing to capitalize
  }

  let firstLetter = str.charAt(0).toUpperCase();
  let restOfString = str.slice(1);

  return firstLetter + restOfString;
}
