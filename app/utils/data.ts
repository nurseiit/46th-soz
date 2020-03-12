import * as fs from 'fs';
import TextData from './textData';

const getTextData = (): TextData => {
  const textPath = 'models/one_to_45.txt';

  const text = fs.readFileSync(textPath, { encoding: 'utf-8' });
  return new TextData(text);
};

export default getTextData;
