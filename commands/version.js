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
const cliVersion = require('../package.json').version
const enforcerPath = require.resolve('openapi-enforcer')
const path = require('path')

const enforcerVersion = require(path.resolve(path.dirname(enforcerPath), 'package.json')).version

module.exports = function (program) {
  program
    .command('version')
    .description('Get the installed version number')
    .action(() => {
      console.log('CLI v' + cliVersion)
      console.log('OpenAPI Enforcer v' + enforcerVersion)
    })
}
