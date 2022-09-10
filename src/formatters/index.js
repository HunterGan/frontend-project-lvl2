import printPlain from './printPlain.js';
import printStylish from './printStylish.js';
import printJson from './printJson.js';

export default (diffs, format) => {
  switch (format) {
    case ('plain'):
      return printPlain(diffs);
    case ('json'):
      return printJson(diffs);
    case ('stylish'):
      return printStylish(diffs);
    default:
      throw new Error(`Format ${format} is not supported!`);
  }
};
