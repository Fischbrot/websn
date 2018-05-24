const path = require('path')
const { spawnSync } = require('child_process')
const { test } = require('ava')
const fse = require('fs-extra')

test.serial('project generation: create project', t => {
  const websn = spawnSync(
    `cd ${__dirname} && ` +
      `node ${path.resolve(__dirname, '..', 'generator.js')} test-project -y`,
    { shell: true }
  )

  if (websn.stderr.toString() !== '') {
    t.fail(websn.stderr.toString())
  }

  t.truthy(
    fse.existsSync(path.resolve(__dirname, 'test-project/websn.config.json'))
  )
})

test('project generation: exit on project with invalid name', t => {
  const invalidProjectNames = [
    '/project',
    '\\project',
    '|project',
    '.project',
    '..project',
    ':project',
    '?project',
    '<project',
    '>project',
    '*project',
    '\\"project'
  ]

  for (const projectName of invalidProjectNames) {
    const websn = spawnSync(
      `cd ${__dirname} && ` +
        `node ${path.resolve(__dirname, '..', 'generator.js')} ` +
        `"${projectName}"`,
      { shell: true }
    )

    t.is(
      websn.stderr.toString().trim(),
      'error: directory name contains invalid characters or is too long.'
    )
  }
})

test('project generation: generate package.json', t => {
  try {
    const packageJson = require(
      path.resolve(__dirname, 'test-project/package.json')
    )

    const defaultPackageJson = require(
      path.resolve(__dirname, 'assets/default.package.json')
    )

    t.deepEqual(packageJson, defaultPackageJson)
  } catch (err) {
    t.fail()
  }
})

test.after.always(() => {
  fse.removeSync(path.resolve(__dirname, 'test-project'))
})
