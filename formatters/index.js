import printPlain from './printPlain.js';
import printStylish from './printStylish.js';
import printJson from './printJson.js';

const printOut = (diffs, format = 'stylish') => {
  switch (format) {
    case ('stylish'): {
      return (printStylish(diffs));
    }
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
  return "Can't define output format";
};
export default printOut;
