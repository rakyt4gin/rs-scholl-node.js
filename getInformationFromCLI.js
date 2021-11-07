const { argv } = process

class GetInformationFromCLI {

  data = {}


  getInformation() {

    this.data.configFlag = argv[argv.indexOf('-c')]
    this.data.config = argv[argv.indexOf('-c') + 1]
    this.data.inputFlag = argv[argv.indexOf('-i')]
    this.data.input = argv[argv.indexOf('-i') + 1].slice(2)
    this.data.outputFlag = argv[argv.indexOf('-o')]
    this.data.output = argv[argv.indexOf('-o') + 1].slice(2)
    return this.data

  }

}

module.exports = (new GetInformationFromCLI()).getInformation()