import yaml from 'js-yaml';

export default (fileData, formatType) => {
  let result;
  switch (formatType) {
    case '.yaml':
    case '.yml':
      result = () => yaml.load(fileData);
      break;
    case '.json':
      result = () => JSON.parse(fileData);
      break;
    default:
      result = () => console.log('wrong file type.');
      break;
  }
  return result();
};
