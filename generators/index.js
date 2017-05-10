const Generator = require('yeoman-generator')
const glob = require('glob')

module.exports = class extends Generator {

  writing() {
    this.writeRawFiles('basic')
  }

  writeRawFiles(templateName) {
    const templateFiles = glob.sync(
      `${templateName}/**/[!_]*`,
      {
        nodir: true,
        cwd: __dirname,
        dot: true
      }
    )

    templateFiles.forEach(filePath => {
      const templatePath = this.templatePath(filePath).replace('templates', '')
      const destPath = this.destinationPath(filePath).replace('basic', '')

      this.fs.copy(
        templatePath,
        destPath,
        this.props
      )
    })
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    })
  }

}