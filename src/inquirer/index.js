const inquirer = require('inquirer')

module.exports = {
  askProjectConfig: () => {
    const questions = [
      {
        name: 'version',
        type: 'input',
        message: 'version:',
        default: '1.0.0',
        validate: value => {
          if (value.length) {
            return true
          } else {
            return 'please enter the version of your project.'
          }
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'description:'
      },
      {
        name: 'keywords',
        type: 'input',
        message: 'keywords (split with comma):'
      },
      {
        name: 'author',
        type: 'input',
        message: 'author:'
      },
      {
        name: 'license',
        type: 'input',
        message: 'license:',
        default: 'MIT',
        validate: value => {
          if (value.length) {
            return true
          } else {
            return 'please enter the license of your project.'
          }
        }
      },
      {
        name: 'srcTemplateDir',
        type: 'input',
        message:
          'source template directory path (leave empty to use built-in ' +
          'example):'
      },
      {
        name: 'installCritical',
        type: 'confirm',
        default: false,
        message:
          'do you want to be able to generate critical inline css (not ' +
          'installing it significantly reduces `node_modules` size)?'
      }
    ]

    return inquirer.prompt(questions)
  }
}
