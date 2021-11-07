const fs = require('fs')
const path = require('path')
const { config } = require('process')
const { Readable, Writable } = require('stream')
const getInformationFromCLI = require('./getInformationFromCLI')

class streamRead extends Readable {
  constructor(data) {
    super()
    this.readStream = fs.createReadStream(path.join(__dirname, data.input))
    this.data = ''
  }

  _read() {
    this.readStream.on('data', chunk => {
      new CipherChoice(chunk.toString(), getInformationFromCLI.config)
    })
  }

}

class CipherChoice {
  constructor(data, config) {
    this.data = data.split('')
    this.config = config.split('-')
    this.choise()
  }

  choise() {
    if (this.config[0][0] == 'C') {
      new CaesarCipher(this.data, this.config)
    } else {
      console.log('enen')
    }
  }
}

class CaesarCipher {

  alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  constructor(data, config) {
    if (config[0][1] == '1') {
      this.encoding(data, config)
    } else if (config[0][1] == '0') {
      this.deconding(data, config)
    }
  }

  encoding(data, config) {
    data.forEach(item => {

      if (this.alphabet.includes(item)) {
        if (item == 'z') data.splice(data.indexOf(item), 1, 'a')
        else data.splice(data.indexOf(item), 1, this.alphabet[this.alphabet.indexOf(item) + 1])
      } else if (this.ALPHABET.includes(item)) {
        if (item == 'Z') data.splice(data.indexOf(item), 1, 'A')
        else data.splice(data.indexOf(item), 1, this.ALPHABET[this.ALPHABET.indexOf(item) + 1])
      }

    })
    config.shift()
    return new CipherChoice(data.join(''), config.join('-'))
  }

  deconding(data, config) {
    data.forEach(item => {

      if (this.alphabet.includes(item)) {
        if (item == 'a') data.splice(data.indexOf(item), 1, 'z')
        else data.splice(data.indexOf(item), 1, this.alphabet[this.alphabet.indexOf(item) - 1])
      } else if (this.ALPHABET.includes(item)) {
        if (item == 'A') data.splice(data.indexOf(item), 1, 'Z')
        else data.splice(data.indexOf(item), 1, this.ALPHABET[this.ALPHABET.indexOf(item) - 1])
      }

    })
    config.shift()
    return new CipherChoice(data.join(''), config.join('-'))
  }
}

(new streamRead(getInformationFromCLI))._read()


