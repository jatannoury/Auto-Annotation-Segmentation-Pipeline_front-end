function camelCaseToUnderscore(inputString) {
  return inputString.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}
function camelCaseToSpaceSeparated(camelCaseString) {
  camelCaseString = camelCaseString.replace(/^./, (firstChar) =>
    firstChar.toUpperCase()
  );

  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2");
}

module.exports = {
  camelCaseToUnderscore,
  camelCaseToSpaceSeparated,
};
