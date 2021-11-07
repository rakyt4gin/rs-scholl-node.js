const { argv } = process

class GetInformationFromCLI {

  data = {}

  exportInformation() {
    this.data.config = argv[argv.indexOf('-c') + 1]
    this.data.input = argv[argv.indexOf('-i') + 1].slice(2)
    this.data.output = argv[argv.indexOf('-o') + 1].slice(2)
    return this.data
  }

}

module.exports = (new GetInformationFromCLI()).exportInformation()