import printPlain from './printPlain.js';
import printStylish from './printStylish.js';
import printJson from './printJson.js';

const printOut = (diffs, format = 'stylish') => {
  switch (format) {
    case ('plain'): {
      return (printPlain(diffs));
    }
    case ('json'): {
      return (printJson(diffs));
    }
    default: {
      break;
    }
  }
  return (printStylish(diffs));
};
export default printOut;
