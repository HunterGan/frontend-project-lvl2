import yaml from 'js-yaml';

export default (fileData, formatType) => {
  switch (formatType) {
    case 'yaml':
      return yaml.load(fileData);
    default:
      break;
  }
  return JSON.parse(fileData);
};
