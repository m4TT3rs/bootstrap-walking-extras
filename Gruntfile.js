module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * Bootstrap-walking-extras v<%= pkg.version %>\n' +
            ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

    clean: {
      dist: ['dist', 'docs/dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      src: {
        src: 'js/*.js'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      src: [
        'dist/css/Bootstrap-walking-extras.css'
      ]
    },

    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      bootstrapWalkingExtras: {
        src: ['js/breakpoint-events.js','js/modal-responsive.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      bootstrapWalkingExtras: {
        options: {
          banner: '<%= banner %>',
          compress: {
            drop_console: true
          }
        },
        src: '<%= concat_sourcemap.bootstrapWalkingExtras.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },


    less: {
      compileCore: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'less/Bootstrap-walking-extras.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/css/<%= pkg.name %>.css',
            'dist/css/<%= pkg.name %>.min.css'
          ]
        }
      }
    },
      
    styleguide: {
        options: {
            template: {
                src: 'vendor/styleguide'
            },
            framework: {
                name: 'styledocco'
            },
            template: {
                include: ['dist/css/Bootstrap-walking-extras.css']
            }
        },
        all: {
          files: [{
            'docs': 'less/Bootstrap-walking-extras.less'
          }]
        }
    },
      
    'gh-pages': {
        options: {
          base: 'docs'
        },
        src: ['**','.gitignore']
    },

    watch: {
      less: {
        files: 'less/*.less',
        tasks: 'less'
      }
    }


  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});


  grunt.registerTask('test', ['dist-css','csslint','jshint']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat_sourcemap','uglify']);
    
  // JS distribution task.
  grunt.registerTask('dist-styleguide', ['styleguide']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'less:minify', 'usebanner']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);

  // Set default task
  grunt.registerTask('default', ['dist']);
};