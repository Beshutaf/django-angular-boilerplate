'use strict';

module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    concat: {
      options: {
        sourceMap: true
      }
    },
    copy: {
      index: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      },
      env: {
        cwd: 'src/assets/css',
        expand: true,
        src: 'env/*',
        dest: 'dist/css'
      },
      img: {
        cwd: 'src/assets/img',
        expand: true,
        src: ['*', '*/**'],
        dest: 'dist/img'
      },
      fonts: {
        cwd: 'src/assets/fonts',
        expand: true,
        src: '*',
        dest: 'dist/fonts'
      },
      other: {
        cwd: 'src',
        src: ['robots.txt', 'favicon.ico'],
        expand: true,
        dest: 'dist'
      }
    },
    uglify: {
      options: {
        mangle: false
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    less: {
      app: {
        options: {
          paths: ["src/assets/less"]
        },
        files: {
          "src/assets/css/app.css": "src/assets/less/theme.less"
        }
      }
    },
    cssmin: {
      app: {
        src: 'src/assets/css/app.css',
        dest: 'dist/css/app.css'
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
          'dist/css/*.css'
        ]
      }
    },
    clean: {
      dist: ['dist']
    },
    watch: {
      options: {
        atBegin: true,
        livereload: true
      },
      dev: {
        files: ['Gruntfile.js', 'src/*.html', 'src/app/**/*.html', 'src/app/**/*.js',
          'src/assets/less/**/*.less'],
        tasks: ['less']
      }
    },
    rewrite: {
      index: {
        src: 'dist/index.html',
        editor: function(contents, filePath) {
          return contents.replace(/(assets)/g, 'static').replace(/("js)/g, '"static/js').replace(/("css)/g, '"static/css');
        }
      }
    }
  });

  /**
   * Clean the dist folder.
   * Compile the Less files
   * Copy index.html to dist folder
   * Run usemin to replace inline js and css src paths to single files
   *  - compile angular templates into cache as part of usemin
   *  - concat files
   *  - minify css
   *  - uglify js code, but don't mangle as Angular seems to have issues with this.
   *  - and file revisions to new files
   *
   */
  grunt.registerTask('build_dist', [
    'clean',
    'less',
    'copy_assets',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'rewrite'
  ]);

  grunt.registerTask('copy_assets', ['copy:index', 'copy:img', 'copy:fonts', 'copy:other']);

  grunt.registerTask('dev', ['watch:dev']);
  grunt.registerTask('dist', ['build_dist']);
  grunt.registerTask('default', ['dev']);
};