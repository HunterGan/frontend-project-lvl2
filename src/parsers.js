import yaml from 'js-yaml';

export default (fileData, formatType) => {
  const result = {};
  switch (formatType) {
    case '.yaml':
    case '.yml':
      result.parser = yaml.load(fileData);
      break;
    case '.json':
      result.parser = JSON.parse(fileData);
      break;
    default:
      console.log('wrong file type.');
      break;
  }
  return result.parser;
};
