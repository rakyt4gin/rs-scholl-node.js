const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');
const TransformFile = require('./transform');
const { argv } = require('process');

class StreamRead extends Readable {
  constructor(filename) {
    super()
    this.filename = filename;
    this.fd = null;
    // this.readStream = fs.createReadStream(path.join(__dirname, data.input))
    // this.data = ''
  }

  _construct(callback) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }

}

module.exports = { StreamRead }


// const read = new StreamRead(path.join(__dirname, './input.txt'));
// read.setEncoding('utf8');
// read.on('data', chunk => {
//   console.log(chunk);
// })
// _read() {
//   this.readStream.on('data', chunk => {
//     new CipherChoice(`${chunk.toString()}\n`, getInformationFromCLI.config)
//   })
//   this.readStream.on('error', (err) => {
//     process.stderr.write(`Упс... Фаила для чтения ${getInformationFromCLI.input} не существует. Прошу вас написать ваше сообщение здесь\n`)
//     // 
//     var rl = require('readline').createInterface({ input: process.stdin, output: process.stdoute });
//     rl.on('line', data => {
//       if (data == 'exit') {
//         process.stdout.write('До свидания');
//         process.exit();
//       }
//       new CipherChoice(`${data.toString()}\n`, getInformationFromCLI.config)
//     });

//   })
// }

// process.stdout.write(`File output not found. Please write message to encrypt\n`)
// process.stdout.write(`For finishing press Ctrl + C\n`);
// const transform = new TransformFile(argv[3]);
// process.stdin.pipe(transform).pipe(process.stdout);