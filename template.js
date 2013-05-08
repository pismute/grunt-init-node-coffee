/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Node.js module in Coffeescript, including Mocha unit tests using Should assertion.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node-coffee'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('node_version'),
    init.prompt('main', function(value, data, done) {
      done(null, 'out/lib/' + data.name);
    }),
    init.prompt('npm_test', 'grunt simplemocha')
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      'grunt-contrib-jshint': '~0.4.3',
      'grunt-contrib-watch': '~0.4.0',
      'grunt-contrib-coffee': '~0.7.0',
      'grunt-contrib-clean': '~0.4.1',
      'grunt-contrib-copy': '~0.4.1',
      'grunt-coffeelint': '~0.0.6',
      'grunt-simple-mocha': '~0.4.0',
      'should': '~1.2.2',
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
