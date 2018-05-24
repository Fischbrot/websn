#!/usr/bin/env node

const files = require('./src/files')
const inquirer = require('./src/inquirer')
const output = require('./src/output')

output.printLogo()

const argv = require('minimist')(process.argv.slice(2))

if (argv._.length) {
  const projectDir = argv._[0].trim()

  if (files.directoryExists(projectDir)) {
    output.printError('directory already exists.')
    process.exit()
  }

  if (!files.isValidDirectoryName(projectDir)) {
    output.printError(
      'directory name contains invalid characters or is too long.'
    )
    process.exit()
  }

  const run = async () => {
    output.printNewProject(projectDir)

    const projectName = { name: projectDir }

    const projectConfig = (argv.y)
      ? {
        version: '1.0.0',
        description: '',
        keywords: '',
        author: '',
        license: 'MIT'
      }
      : await inquirer.askProjectConfig()

    projectConfig.keywords = projectConfig.keywords.split(',')
    projectConfig.keywords = projectConfig.keywords.map(
      keyword => keyword.trim()
    ).filter(
      keyword => keyword.length
    )

    const packageJsonTemplate = files.readPackageJsonTemplate()

    if (!packageJsonTemplate) {
      output.printError(
        'could not read template file `package.json.template`.'
      )
      process.exit()
    }

    const packageJson = Object.assign(
      projectName, projectConfig, packageJsonTemplate
    )

    if (!files.createDirectory(projectDir)) {
      output.printError(
        'could not create project directory.'
      )
      process.exit()
    }

    if (!files.createPackageJson(packageJson, projectDir)) {
      output.printError(
        'could not create `package.json` in project directory.'
      )
      process.exit()
    }

    if (!files.copyFiles(projectDir)) {
      output.printError(
        'could not copy files to project directory.'
      )
      process.exit()
    }

    output.printSuccess(
      `all done. run \`cd ${projectDir} && yarn install\`. happy coding!`
    )
  }

  run()
} else if (argv.help) {
  output.printHelp()
  process.exit()
} else if (argv.version) {
  output.printVersion()
  process.exit()
} else {
  output.printHelp()
  process.exit()
}
