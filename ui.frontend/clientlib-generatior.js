const path = require('path');
 const defaultModule = 'aemguidesDALP';
 const COMP_DIR = path.join(
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
  function createAssets(name, res, css, js) {
    const assets = {}
    const resources = {
      cwd: `clientlib-${name}`,
      files: ['**/*.*'],
      flatten: false,
      ignore: ['**/*.js', '**/*.css']
    }
    const cssObj = {
      cwd: `clientlib-${name}`,
      files: ['**/*.css'],
      flatten: false
    }
    const jsObj = {
      cwd: `clientlib-${name}`,
      files: ['**/*.js'],
      flatten: false
    }
    if (res) assets['resources'] = resources
    if (!css) assets['css'] = cssObj
    if (!js) assets['js'] = jsObj
    return assets;
  }
  const generateClibs = (libsArr, libsBaseConfig, ...clObj) => {
    clObj.forEach((cl) => {
      let libsBase = libsBaseConfig
      if (cl.libsBaseConfig) libsBase = cl.libsBaseConfig
      else libsBase = libsBaseConfig
      let embed = cl.embed || []
      if (cl.components && Array.isArray(cl.components)) {
        cl.components.forEach((comp) => {
          const libsObj = {
            ...libsBase,
            name: `clientlib-${comp.name || comp}`,
            categories: [`${defaultModule}.${comp.name || comp}`],
            outputPath: path.join(COMP_DIR, cl.module || '', cl.name, comp.name || comp, 'clientlib'),
            assets: createAssets(comp.name || comp, comp.res, comp.noCss, comp.noJs)
          }
          libsArr.push(libsObj)
          embed.push(libsObj.categories[0])
        })
      }
      libsArr.push({
        ...libsBase,
        name: `clientlib-${cl.name}`,
        categories: [`${defaultModule}.${cl.name}`],
        outputPath: path.join(CLIENTLIB_DIR, cl.module || '', `clientlib-${cl.name}`),
        embed: embed,
        dependencies: cl.dependencies ? cl.dependencies : [],
        assets: createAssets(cl.name, cl.res, cl.noCss, cl.noJs)
      })
    })
  }

  module.exports = { generateClibs, CLIENTLIB_DIR }
  