/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const path = require('path');
const { generateClibs } = require('./clientlib-generatior');
const BUILD_DIR = path.join(__dirname, 'dist');
const CLIENTLIB_DIR = path.join(
  __dirname,
  '..',
  'ui.apps',
  'src',
  'main',
  'content',
  'jcr_root',
  'apps',
  'aemguidesDALP',
  'clientlibs'
);

const libsBaseConfig = {
  allowProxy: true,
  serializationFormat: 'xml',
  cssProcessor: ['default:none', 'min:none'],
  jsProcessor: ['default:none', 'min:none']
};

const clientlibArr = [

  //common
  {name : 'guides-footer', module: 'common'},
  {name : 'guides-header', module: 'common'},

  {name : 'content-feedback', module: 'feedback'},
  

  //automotive
  {name : 'automotive_global', module: 'automotive'},
  {name : 'automotive-footer', module: 'automotive'},
  {name : 'automoitve_toc', module: 'automotive'},
  {name : 'automotive_topic-body', module: 'automotive'},
  {name : 'automative_toc-banner', module: 'automotive'},
  {name: 'automotive_landing', module: 'automotive'},
  {name: 'automotive_filter', module: 'automotive'},

  //fsi
  {name : 'fsi_topic-body' , module: 'fsi'},
  {name : 'fsi_global' , module: 'fsi'},
  {name : 'fsi_toc' , module: 'fsi'},
  {name : 'fsi_mini-toc' , module: 'fsi'},
  {name : 'fsi_landing' , module: 'fsi'},
  
  {name : 'fsi-landing-banner' , module: 'fsi'},



  // hi-tec
  {name : 'hi-tech_topic-body', module: 'hi-tech'},
  {name : 'hi-tech_global', module: 'hi-tech'},
  {name : 'hi-tech_toc', module: 'hi-tech'},
  {name : 'hi-tech_mini_toc', module: 'hi-tech'},
  {name : 'landing-banner', module: 'hi-tech'},
  {name : 'hi-tech-landing-list', module: 'hi-tech'},
]

const libsArr = [];
generateClibs(libsArr, libsBaseConfig, ...clientlibArr)

 // Config for `aem-clientlib-generator`
 module.exports = {
   context: BUILD_DIR,
   clientLibRoot: CLIENTLIB_DIR,
   libs: libsArr
 };