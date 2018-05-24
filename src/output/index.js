const chalk = require('chalk')

const logo =
`              _
             | |
__      _____| |__  ___ _ __
\\ \\ /\\ / / _ \\ '_ \\/ __| '_ \\
 \\ V  V /  __/ |_) \\__ \\ | | |
  \\_/\\_/ \\___|_.__/|___/_| |_|`

module.exports = {
  printLogo () {
    console.log(chalk.bold.blue(logo))
  },
  printNewProject (project) {
    this.printNewLine()
    console.log(`${chalk.bold('new project:')} ${chalk.green(project)}`)
    this.printNewLine()
  },
  printHelp () {
    this.printNewLine()

    console.log(chalk.bold('commands:'))
    console.log(`new project: ${chalk.green('websn projectName')}`)
    console.log(
      `new project with defaults: ${chalk.green('websn projectName -y')}`
    )
    console.log(`help: ${chalk.green('websn --help')}`)
    console.log(`version: ${chalk.green('websn --version')}`)

    this.printNewLine()

    console.log(
      chalk.bold('project configuration:'),
      chalk.green('<project directory>/websn.config.json')
    )

    this.printNewLine()

    console.log(chalk.bold('project build:'))
    console.log(`production: ${chalk.green('yarn run build')}`)
    console.log(`development: ${chalk.green('yarn run serve')}`)

    this.printNewLine()

    console.log(
      chalk.bold('more information:'),
      chalk.blue('https://github.com/mserajnik/websn')
    )
  },
  printVersion () {
    this.printNewLine()
    console.log(`${chalk.bold('version:')} ${chalk.blue('1.3.0')}`)
  },
  printError (message) {
    this.printNewLine()
    console.error(`${chalk.bold.red('error:')} ${chalk.red(message)}`)
  },
  printSuccess (message) {
    this.printNewLine()
    console.log(`${chalk.bold.green('success:')} ${chalk.green(message)}`)
  },
  printNewLine () {
    console.log('')
  }
}
