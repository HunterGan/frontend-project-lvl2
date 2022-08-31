import printPlain from './printPlain.js';
import printStylish from './printStylish.js';
import printJson from './printJson.js';

const printOut = (diffs, format = 'stylish') => {
  switch (format) {
    case ('plain'): {
      return printPlain(diffs);
    }
    case ('json'): {
      return printJson(diffs);
    }
    case ('stylish'): {
      return printStylish(diffs);
    }
    default: {
      throw new Error(`Format ${format} is not supported!`);
    }
  }
};
export default printOut;
