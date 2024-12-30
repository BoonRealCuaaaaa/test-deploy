const enumToArray = (enumObject) => {
  return Object.keys(enumObject).map((key) => enumObject[key]);
};

const EnumUtils = {
  enumToArray: enumToArray,
};

export default EnumUtils;
