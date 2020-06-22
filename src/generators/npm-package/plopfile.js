module.exports = function (plop) {
  const templateFiles = [
    'templates/**/*'
  ]

  const changed = 'h'

  plop.setGenerator('NPM package', {
    description: 'Creates boiler-plate project for publishing to NPM',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name (@saeon/<name>): ',
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Package description: ',
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../../packages/{{dashCase packageName}}',
        base: 'templates',
        templateFiles,
      },
    ],
  })
}
