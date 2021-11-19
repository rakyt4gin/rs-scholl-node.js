const { StreamRead } = require('./read');
const path = require('path');
const { argv } = require('process');
const { CipherChoice } = require('./cipher1');
const { pipeline } = require('stream');
const { WriteFile } = require('./write');
const getInformationFromCLI = require('./getInformationFromCLI')
const TransformFile = require('./transform');
// if (getInformationFromCLI.output != 'output.txt') {
//   const write = new WriteFile(path.join(__dirname, getInformationFromCLI.output));
// }

if (getInformationFromCLI.input == 'input.txt') {
  const read = new StreamRead(path.join(__dirname, getInformationFromCLI.input))
  if (getInformationFromCLI.output == 'output.txt') {
    const write = new WriteFile(path.join(__dirname, getInformationFromCLI.output));
    read.on('data', chunk => {
      const result = new CipherChoice(chunk.toString(), getInformationFromCLI.config).choise()
      pipeline(result, write, err => console.log(err));
    })
    process.stdout.write('Шифрование произведено в фаил')
  } else {
    read.on('data', chunk => {
      const result = new CipherChoice(chunk.toString(), getInformationFromCLI.config).choise()
      pipeline(result, process.stdout, err => console.log(err));
    })
  }

} else {
  process.stderr.write(`Фаила ${getInformationFromCLI.input} не существует\n`)
  process.stdout.write(`Напишите ваше сообщение здесь: `)
  const transform = new TransformFile(getInformationFromCLI.config);
  if (getInformationFromCLI.output == 'output.txt') {
    const write = new WriteFile(path.join(__dirname, getInformationFromCLI.output));
    process.stdin.pipe(transform).pipe(write);
  } else {
    process.stdin.pipe(transform).pipe(process.stdout);
  }
}

