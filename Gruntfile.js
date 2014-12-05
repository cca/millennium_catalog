module.exports = function(grunt) {
  // load all tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        browser: true,
        laxcomma: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dist: {
        src: [ 'live/*.js' ]
      }
    },
    sass: {
      dist: {
        files: {
          'live/styles.css': 'live/styles.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'compressed',
          trace: true,
          update: true
        }
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        // @todo doesn't work?
        report: 'min'
      },
      dist: {
        files: {
          'live/videosearch.min.js': ['live/videosearch.js']
        }
      }
    },
    watch: {
      sass: {
        files: 'live/*.scss',
        tasks: ['sass']
      },
      jshint: {
        files: [
          'live/*.js'
          , '!live/jquery.*.js'
          ],
        tasks: ['jshint']
      }
    }
  });

  // shortcuts, multi-tasks
  grunt.registerTask('test', ['jshint']); // @todo scss-lint
  grunt.registerTask('build', ['sass']); // @todo uglify JS
  grunt.registerTask('default', ['sass']);

};
