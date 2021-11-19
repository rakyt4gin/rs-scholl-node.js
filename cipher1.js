class CipherChoice {
  constructor(data, config) {
    this.data = data
    this.config = config
  }

  choise() {
    if (!this.config) {
      return this.data
    }
    else {
      if (this.config[0] == 'C') {
        return new CipherChoice(caesarCipher(this.data, this.config).data, caesarCipher(this.data, this.config).config).choise()
      }
      if (this.config[0] == 'A') {
        return new CipherChoice(atbashCipher(this.data, this.config).data, atbashCipher(this.data, this.config).config).choise()
      }
      if (this.config[0] == 'R') {
        return new CipherChoice(ROT8Cipher(this.data, this.config).data, ROT8Cipher(this.data, this.config).config).choise()
      }
    }
  }
}

alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function caesarCipher(dataa, configg) {
  if (configg) {
    let data = dataa.split('')
    let config = configg.split('-')
    if (config[0][1] == '1') {
      return encoding(data, config)
    } else if (config[0][1] == '0') {
      return decoding(data, config)
    }
  }
  else {
    return {
      data: dataa,
      config: configg
    }
  }

  function encoding(data, config) {
    let arr = []
    data.forEach(item => {
      if (alphabet.includes(item)) {
        if (item == 'z') arr.push('a')
        else arr.push(alphabet[alphabet.indexOf(item) + 1])
      } else if (ALPHABET.includes(item)) {
        if (item == 'Z') arr.push('A')
        else arr.push(ALPHABET[ALPHABET.indexOf(item) + 1])
      } else {
        arr.push(item)
      }
    })
    config.shift()
    return {
      data: arr.join(''),
      config: config.join('-')
    }
  }

  function decoding(data, config) {
    let arr = []
    data.forEach(item => {
      if (alphabet.includes(item)) {
        if (item == 'a') arr.push('z')
        else arr.push(alphabet[alphabet.indexOf(item) - 1])
      } else if (ALPHABET.includes(item)) {
        if (item == 'A') arr.push('Z')
        else arr.push(ALPHABET[ALPHABET.indexOf(item) - 1])
      } else {
        arr.push(item)
      }
    })
    config.shift()
    return {
      data: arr.join(''),
      config: config.join('-')
    }
  }

}


function atbashCipher(dataa, configg) {
  if (configg) {
    let data = dataa.split('')
    let config = configg.split('-')
    return encoding(data, config)
  }
  else {
    return {
      data: dataa,
      config: configg
    }
  }

  function encoding(data, config) {
    let arr = []
    data.forEach(item => {
      if (alphabet.includes(item)) {
        arr.push(alphabet[(alphabet.length - alphabet.indexOf(item)) - 1])
      }
      else if (ALPHABET.includes(item)) {
        arr.push(ALPHABET[(ALPHABET.length - ALPHABET.indexOf(item)) - 1])
      } else {
        arr.push(item)
      }
    })
    config.shift()
    return {
      data: arr.join(''),
      config: config.join('-')
    }
  }
}

function ROT8Cipher(dataa, configg) {
  if (configg) {
    let data = dataa.split('')
    let config = configg.split('-')
    if (config[0][1] == '1') {
      return encoding(data, config)
    } else if (config[0][1] == '0') {
      return decoding(data, config)
    }
  }
  else {
    return {
      data: dataa,
      config: configg
    }
  }

  function encoding(data, config) {
    let arr = []
    data.forEach(item => {
      if (alphabet.includes(item)) {
        if (alphabet.indexOf(item) > alphabet.length - 9) arr.push(alphabet[alphabet.indexOf(item) + 8 - this.alphabet.length])
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
    return {
      data: arr.join(''),
      config: config.join('-')
    }
  }

  function decoding(data, config) {
    let arr = []
    data.forEach(item => {
      if (alphabet.includes(item)) {
        if (alphabet.indexOf(item) < 8) {
          arr.push(alphabet[alphabet.indexOf(item) - 8 + alphabet.length])
        }
        else {
          arr.push(alphabet[alphabet.indexOf(item) - 8])
        }

      } else if (ALPHABET.includes(item)) {
        if (ALPHABET.indexOf(item) < 8) {
          arr.push(ALPHABET[ALPHABET.indexOf(item) - 8 + ALPHABET.length])
        }
        else {
          arr.push(ALPHABET[ALPHABET.indexOf(item) - 8])
        }
      }

      else {
        arr.push(item)
      }
    })
    config.shift()
    return {
      data: arr.join(''),
      config: config.join('-')
    }
  }

}



module.exports = { CipherChoice }