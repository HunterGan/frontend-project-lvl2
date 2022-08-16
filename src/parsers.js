import yaml from 'js-yaml';

export default (fileData, formatType) => {
  switch (formatType) {
    case '.yaml':
    case '.yml':
      return yaml.load(fileData);
    default:
      break;
  }
  return JSON.parse(fileData);
};
