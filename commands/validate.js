'use strict'
const Enforcer = require('openapi-enforcer')
const path = require('path')

module.exports = function (program) {
  program
    .command('validate <oas-doc>')
    .description('Validate an Open API Specification document')
    .option('-c, --clean-exit', 'If the OpenAPI document is not valid, do not throw an exception.')
    .action((oasDoc, command) => {
      const fullPath = path.resolve(process.cwd(), oasDoc)
      Enforcer(fullPath, { fullResult: true })
        .then(({ error, warning }) => {
          if (!error) {
            console.log('Document is valid')
            if (warning) console.warn(warning)
          } else {
            console.error(error)
          }

          if (!command.cleanExit && error) process.exit(1)
        })
        .catch(err => {
          console.log(err.message)
          if (!command.cleanExit) process.exit(1)
        })
    })
}
