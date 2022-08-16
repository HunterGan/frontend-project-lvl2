import yaml from 'js-yaml';

export default (fileData, formatType) => {
  switch (formatType) {
    case '.yaml':
    case '.yml':
      return yaml.load(fileData);
    case '.json':
      return JSON.parse(fileData);
    default:
      console.log('wrong file type.');
      break;
  }
};
