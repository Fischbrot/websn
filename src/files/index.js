const fs = require('fs-extra')
const path = require('path')
const sanitize = require('sanitize-filename')

module.exports = {
  directoryExists (dirName) {
    try {
      return fs.statSync(dirName).isDirectory()
    } catch (err) {
      return false
    }
  },
  isValidDirectoryName (dirName) {
    return ((dirName === sanitize(dirName)) && !dirName.includes('.'))
  },
  createDirectory (dirName) {
    try {
      fs.mkdirSync(dirName)

      return true
    } catch (err) {
      return false
    }
  },
  readPackageJsonTemplate () {
    try {
      return JSON.parse(
        fs.readFileSync(
          path.resolve(
            __dirname, '../../template/config/package.json.template'
          )
        )
      )
    } catch (err) {
      return false
    }
  },
  createPackageJson (packageJson, targetDir) {
    try {
      fs.writeFileSync(
        path.join(targetDir, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      )

      return true
    } catch (err) {
      return false
    }
  },
  copyFiles (targetDir, srcTemplateDir) {
    try {
      fs.copySync(path.resolve(__dirname, '../../template/config'), targetDir)
      fs.removeSync(path.resolve(targetDir, 'package.json.template'))
    } catch (err) {
      return false
    }

    try {
      fs.copySync(srcTemplateDir, `${targetDir}/src`)
    } catch (err) {
      return false
    }

    try {
      const files = fs.readdirSync(targetDir).filter(
        file => file.includes('.template')
      )

      for (const file of files) {
        fs.renameSync(
          path.resolve(targetDir, file),
          path.resolve(targetDir, file.replace('.template', ''))
        )
      }

      return true
    } catch (err) {
      return false
    }
  }
}
