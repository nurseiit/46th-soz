/* eslint no-underscore-dangle: 0 */
export default class TextData {
  textString_: string;

  textLen_: number;

  charSetSize_: number;

  charSet_: string[];

  indices_: Uint16Array;

  constructor(textString) {
    this.textString_ = textString;
    this.textLen_ = textString.length;

    this.getCharSet_();
    this.convertAllTextToIndices_();
  }

  // Get length of the training text data.
  textLen(): number {
    return this.textLen_;
  }

  // Get the size of the character set.
  charSetSize(): number {
    return this.charSetSize_;
  }

  // Get the unique character at given index from the character set.
  getFromCharSet(index: number): string {
    return this.charSet_[index];
  }

  // Convert text string to integer indices.
  textToIndices(text): number[] {
    const indices = [];
    for (let i = 0; i < text.length; i += 1) {
      indices.push(this.charSet_.indexOf(text[i]));
    }
    return indices;
  }

  // Get the set of unique characters from text.
  getCharSet_(): void {
    this.charSet_ = [];
    for (let i = 0; i < this.textLen_; i += 1) {
      if (this.charSet_.indexOf(this.textString_[i]) === -1) {
        this.charSet_.push(this.textString_[i]);
      }
    }
    this.charSet_.sort();
    this.charSetSize_ = this.charSet_.length;
  }

  // Convert all training text to integer indices.
  convertAllTextToIndices_(): void {
    this.indices_ = new Uint16Array(this.textToIndices(this.textString_));
  }
}
