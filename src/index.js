import _ from 'lodash';
export default (fileData1, fileData2) => {
    const file1Keys = Object.keys(fileData1);
    const file2Keys = Object.keys(fileData2);
    const commonKeys = _.sortedUniq(file1Keys.concat(file2Keys).sort());
    const diffs = commonKeys.reduce((acc, key) => {
        if (!Object.hasOwn(fileData2, key)) {
            acc.push(toString(fileData1, key, '-'));
            return acc;
        }
        if (!Object.hasOwn(fileData1, key)) {
            acc.push(toString(fileData2, key, '+'));
            return acc; 
        }
        if (fileData1[key] === fileData2[key]) {
            acc.push(toString(fileData1, key));
            return acc;
        }
        acc.push(toString(fileData1, key, '-'));
        acc.push(toString(fileData2, key, '+'));
        return acc;
    }, [])
    .join('\n');
    return diffs;
}

const toString = (currentObject, key, sign = ' ') => {
    return `${sign} ${key}: ${currentObject[key]}`;
}