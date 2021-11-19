const { Transform } = require('stream');
const { CipherChoice } = require('./cipher1');

class TransformFile extends Transform {
  constructor(options = {}) {
    super(options)
    this.config = options;
  }

  _transform(chunk, enc, callback) {
    const result = new CipherChoice(chunk.toString(), this.config).choise();
    this.push(result)
    callback();
  }

  _flush(callback) {
    this.push('Encryption completed \n')
    callback()
  }
}

module.exports = TransformFile;
