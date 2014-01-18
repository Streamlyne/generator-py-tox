'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PyToxGenerator = module.exports = function PyToxGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    //this.installDependencies({ skipInstall: options['skip-install'] });
  });

  //this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PyToxGenerator, yeoman.generators.Base);

PyToxGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    //console.log(this.yeoman);
    console.log('Welcome to the Tox Yeoman generator!\n\n' + 
            'This utility will ask you a few questions and then generate ' +
            'a simple tox.ini file to help get you started using tox.')

    var prompts = [
        {
            type: 'checkbox',
            name: 'pyEnvs',
            message: 'Which Python versions do you want to test against?',
            choices: ['py24', 'py25', 'py26', 'py27', 'py30', 'py31', 'py32', 'py33', 'pypy', 'jython']
        }, {
            type: 'input',
            name: 'testCmd',
            message: 'Command to run to test project?',
            default: '{envpython} setup.py test'
        }, {
            type: 'input',
            name: 'deps',
            message: 'What dependencies does your project have? (comma-seperated)',
            default: '-rrequirements.txt'
        }
    ];

    this.prompt(prompts, function (props) {
        this.pyEnvs = props.pyEnvs;
        this.testCmd = props.testCmd;
        this.deps = props.deps.split(',');

        cb();
    }.bind(this));
};

PyToxGenerator.prototype.app = function app() {
};

PyToxGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_tox.ini', 'tox.ini');
};
