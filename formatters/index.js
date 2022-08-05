import printPlain from './printPlain.js';
import printStylish from './printStylish.js';
import printJson from './printJson.js';

const printOut = (diffs, format = 'stylish') => {
  let printStyle;
  switch (format) {
    case ('stylish'): {
      printStyle = printStylish(diffs);
      break;
    }
    case ('plain'): {
      printStyle = printPlain(diffs);
      break;
    }
    case ('json'): {
      printStyle = printJson(diffs);
      break;
    }
    default: {
      break;
    }
  }
  return printStyle;
};
export default printOut;
