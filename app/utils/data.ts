import * as fs from 'fs';
import TextData from './textData';

const sampleLen = 500;
const sampleStep = 3;

const getTextData = (): TextData => {
  const textPath = '../model/one_to_45.txt';

  const text = fs.readFileSync(textPath, { encoding: 'utf-8' });
  return new TextData(text);
};

export default getTextData;
