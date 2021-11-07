const fs = require('fs')
const process = require('process')
const path = require('path')
const { Readable, Writable } = require('stream')
const getInformationFromCLI = require('./getInformationFromCLI')

class StreamRead extends Readable {
  constructor(data) {
    super()
    this.readStream = fs.createReadStream(path.join(__dirname, data.input))
    this.data = ''
  }

  _read() {
    this.readStream.on('data', chunk => {
      new CipherChoice(`${chunk.toString()}\n`, getInformationFromCLI.config)
    })
    this.readStream.on('error', (err) => {
      process.stderr.write(`Упс... Фаила ${getInformationFromCLI.input} не существет. Прошу вас написать ваше сообщение здесь\n`)
      // 
      var rl = require('readline').createInterface({ input: process.stdin, output: process.stdoute });
      rl.on('line', data => {
        if (data == 'exit') {
          process.stdout.write('До свидания');
          process.exit();
        }
        new CipherChoice(`${data.toString()}\n`, getInformationFromCLI.config)
      });

    })
  }

}

class StreamWrite extends Writable {
  constructor(data) {

    super()
    this.data = data

    this.readStream = fs.createReadStream(path.join(__dirname, getInformationFromCLI.output))

    this.readStream.on('data', chunk => {
      this.data += chunk.toString()
    })
    this.readStream.on('end', () => {
      this.writeStream = fs.createWriteStream(path.join(__dirname, getInformationFromCLI.output))
      this._write(this.data.trim())
    })
    this.readStream.on('error', () => {
      process.stderr.write(`Фаила ${getInformationFromCLI.output} не существует. Конечный результат шифрования представлен ниже\n`)
      process.stdout.write(`Результат шифрования: ${this.data.trim()}\n\n`)
      process.stdout.write('Введите сообщение: ');
    })



    // 
  }
  _write(data) {
    this.writeStream.write(data)
    this.writeStream.end()
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
    } else if (this.config[0][0] == 'R') {
      new ROT8Cipher(this.data, this.config)
    } else if (this.config[0][0] == 'A') {
      new AtbashCipher(this.data, this.config)
    } else {
      new StreamWrite(this.data.join(''))
    }
  }
}

class AtbashCipher {
  alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  constructor(data, config) {
    this.encoding(data, config)
  }

  encoding(data, config) {
    let arr = []
    data.forEach(item => {
      if (this.alphabet.includes(item)) {
        arr.push(this.alphabet[(this.alphabet.length - this.alphabet.indexOf(item)) - 1])
      }
      else if (this.ALPHABET.includes(item)) {
        arr.push(this.ALPHABET[(this.ALPHABET.length - this.ALPHABET.indexOf(item)) - 1])
      } else {
        arr.push(item)
      }

    })
    config.shift()
    return new CipherChoice(arr.join(''), config.join('-'))
  }
}

class ROT8Cipher {
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
    let arr = []
    data.forEach(item => {
      if (this.alphabet.includes(item)) {
        if (this.alphabet.indexOf(item) > this.alphabet.length - 9) arr.push(this.alphabet[this.alphabet.indexOf(item) + 8 - this.alphabet.length])
        else arr.push(this.alphabet[this.alphabet.indexOf(item) + 8])
      } else if (this.ALPHABET.includes(item)) {
        if (this.ALPHABET.indexOf(item) > this.ALPHABET.length - 9) arr.push(this.ALPHABET[this.ALPHABET.indexOf(item) + 8 - this.ALPHABET.length])
        else arr.push(this.ALPHABET[this.ALPHABET.indexOf(item) + 8])
      }
      else {
        arr.push(item)
      }
    })
    config.shift()
    return new CipherChoice(arr.join(''), config.join('-'))
  }

  deconding(data, config) {
    let arr = []
    data.forEach(item => {
      if (this.alphabet.includes(item)) {
        if (this.alphabet.indexOf(item) < 8) {
          arr.push(this.alphabet[this.alphabet.indexOf(item) - 8 + this.alphabet.length])
        }
        else {
          arr.push(this.alphabet[this.alphabet.indexOf(item) - 8])
        }

      } else if (this.ALPHABET.includes(item)) {
        if (this.ALPHABET.indexOf(item) < 8) {
          arr.push(this.ALPHABET[this.ALPHABET.indexOf(item) - 8 + this.ALPHABET.length])
        }
        else {
          arr.push(this.ALPHABET[this.ALPHABET.indexOf(item) - 8])
        }
      }

      else {
        arr.push(item)
      }
    })
    config.shift()
    return new CipherChoice(arr.join(''), config.join('-'))
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
    let arr = []
    data.forEach(item => {

      if (this.alphabet.includes(item)) {
        if (item == 'z') arr.push('a')
        else arr.push(this.alphabet[this.alphabet.indexOf(item) + 1])
      } else if (this.ALPHABET.includes(item)) {
        if (item == 'Z') arr.push('A')
        else arr.push(this.ALPHABET[this.ALPHABET.indexOf(item) + 1])
      } else {
        arr.push(item)
      }

    })
    config.shift()
    return new CipherChoice(arr.join(''), config.join('-'))
  }

  deconding(data, config) {
    let arr = []
    data.forEach(item => {

      if (this.alphabet.includes(item)) {
        if (item == 'a') arr.push('z')
        else arr.push(this.alphabet[this.alphabet.indexOf(item) - 1])
      } else if (this.ALPHABET.includes(item)) {
        if (item == 'A') arr.push('Z')
        else arr.push(this.ALPHABET[this.ALPHABET.indexOf(item) - 1])
      } else {
        arr.push(item)
      }

    })
    config.shift()
    return new CipherChoice(arr.join(''), config.join('-'))
  }
}

(new StreamRead(getInformationFromCLI))._read()


