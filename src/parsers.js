import yaml from 'js-yaml';

export default (initialData, formatType) => {
  switch (formatType) {
    case 'yaml':
    case 'yml':
      return yaml.load(initialData);
    case 'json':
      return JSON.parse(initialData);
    default:
      throw new Error(`Unknown type of file - ${formatType}`);
  }
};
