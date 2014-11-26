'use strict';

module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      app: {
        options: {
          paths: ["src/less"]
        },
        files: {
          "build/css/app.css": "src/less/app.less"
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/app/**/*.js'
      ]
    },

    clean: {
      dist: ['dist']
    },

    copy: {
      html: {
        files: [
          {cwd: 'src', src: ['*.html'], dest: 'dist/', expand: true}
        ]
      },
      assets: {
        files: [
          {cwd: 'src', src: ['img/**'], dest: 'dist/', expand: true},
          {cwd: 'src', src: ['data/**'], dest: 'dist/', expand: true}
        ]
      }
    },

    useminPrepare: {
      html: {
        src: ['src/index.html']
      },
      options: {
        dest: 'dist'
      }
    },

    ngtemplates: {
      app: {
        cwd: 'src',
        src: 'app/**/*.html',
        dest: 'dist/js/tpl.js',
        options: {
          usemin: 'js/app.js' // <~~ This came from the <!-- build:js --> block
        },
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true, // Only if you don't use comment directives!
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }
    },

    concat: {},

    cssmin: {},

    uglify: {
      options: {
        mangle: false
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      files: {
        src: [
          'dist/js/**/*.js',
          'dist/css**/*.css'
        ]
      }
    },

    usemin: {
      html: {
        src: ['dist/index.html']
      }
    },

    watch: {
      options: {
        atBegin: true,
        livereload: true
      },
      dev: {
        files: ['Gruntfile.js', 'src/**/*.html', 'src/app/**/*.js', 'src/**/*.less'],
        tasks: ['less']
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          host: 'localhost'
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:8080/src/'
      }
    }
  });

  /**
   * Run jsHint
   * Clean the dist folder.
   * Copy index.html to dist folder
   * Run usemin to replace inline js and css src paths to single files
   *  - compile angular templates into cache as part of usemin
   *  - concat files
   *  - minify css
   *  - uglify js code, but don't mangle as Angular seems to have issues with this.
   *  - add file revisions to new files
   *
   */
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'copy',
    'useminPrepare',
    'ngtemplates',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('dev', ['connect:server', 'open:dev', 'watch:dev']);
  grunt.registerTask('django-dev', ['watch:dev']);

  grunt.registerTask('dist', ['build']);

  grunt.registerTask('default', ['dev']);
};