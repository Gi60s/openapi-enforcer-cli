/**
 *  @license
 *    Copyright 2019 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/
'use strict'
const Builder = require('../controllers/editor/builder')
const fs = require('fs')
const path = require('path')

module.exports = async function (program) {
  program
    .command('build <oas-doc> <out-path>')
    .description('Dereference and build a single OpenAPI file from multiple sources')
    .action(async (oasDoc, outPath) => {
      oasDoc = path.resolve(process.cwd(), oasDoc)
      outPath = path.resolve(process.cwd(), outPath)
      try {
        if (!/\.json$/.test(outPath)) {
          console.log('The output path must be a JSON file.')
        } else {
          const builder = Builder(oasDoc)
          builder.build()
            .then(data => {
              if (data.error) {
                console.error(data.error)
              } else if (data.warning) {
                console.warn(data.warning)
              } else {
                const outFile = path.resolve(process.cwd(), outPath)
                fs.writeFile(outFile, JSON.stringify(data.value, null, 2), function (err) {
                  if (err) {
                    console.error(err.stack)
                  } else {
                    console.log('Build saved to: ' + outFile)
                  }
                })
              }
            })
            .catch(e => {
              console.error(e)
            })
        }
      } catch (err) {
        console.error(err.message)
        process.exit(1)
      }
    })
}
