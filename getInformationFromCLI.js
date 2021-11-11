const { argv } = process

class GetInformationFromCLI {

  data = {}

  getInformation() {
    this.data.configFlag = argv[argv.indexOf('-c')]
    this.data.config = argv[argv.indexOf('-c') + 1]
    this.data.inputFlag = argv[argv.indexOf('-i')]
    if (argv[argv.indexOf('-i') + 1]) {
      if (argv[argv.indexOf('-i') + 1][0] != '-') {
        this.data.input = argv[argv.indexOf('-i') + 1].slice(2)
      }
      else {
        this.data.input = ''
      }
    } else {
      this.data.output = ''
    }
    this.data.outputFlag = argv[argv.indexOf('-o')]
    if (argv[argv.indexOf('-o') + 1]) {
      if (argv[argv.indexOf('-o') + 1][0] != '-') {
        this.data.output = argv[argv.indexOf('-o') + 1].slice(2)
      }
      else {
        this.data.output = ''
      }
    } else {
      this.data.output = ''
    }
    console.log(this.data);
    return this.data
  }

}

module.exports = (new GetInformationFromCLI()).getInformation()