/* eslint-disable */

import * as tf from '@tensorflow/tfjs-node';

export default class TextData {
  constructor(textString) {
    this.textString_ = textString;
    this.textLen_ = textString.length;

    this.getCharSet_();
    this.convertAllTextToIndices_();
  }

  /**
   * Get length of the training text data.
   *
   * @returns {number} Length of training text data.
   */
  textLen() {
    return this.textLen_;
  }

  /**
   * Get the size of the character set.
   *
   * @returns {number} Size of the character set, i.e., how many unique
   *   characters there are in the training text data.
   */
  charSetSize() {
    return this.charSetSize_;
  }

  /**
   * Get the unique character at given index from the character set.
   *
   * @param {number} index
   * @returns {string} The unique character at `index` of the character set.
   */
  getFromCharSet(index) {
    return this.charSet_[index];
  }

  /**
   * Convert text string to integer indices.
   *
   * @param {string} text Input text.
   * @returns {number[]} Indices of the characters of `text`.
   */
  textToIndices(text) {
    const indices = [];
    for (let i = 0; i < text.length; ++i) {
      indices.push(this.charSet_.indexOf(text[i]));
    }
    return indices;
  }

  /**
   * Get the set of unique characters from text.
   */
  getCharSet_() {
    this.charSet_ = [];
    for (let i = 0; i < this.textLen_; ++i) {
      if (this.charSet_.indexOf(this.textString_[i]) === -1) {
        this.charSet_.push(this.textString_[i]);
      }
    }
    this.charSet_.sort();
    this.charSetSize_ = this.charSet_.length;
  }

  /**
   * Convert all training text to integer indices.
   */
  convertAllTextToIndices_() {
    this.indices_ = new Uint16Array(this.textToIndices(this.textString_));
  }
}
