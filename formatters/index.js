import printPlain from './printPlain.js';
import printStylish from './printStylish.js';

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
    default: {
      break;
    }
  }
  return printStyle;
};
export default printOut;
