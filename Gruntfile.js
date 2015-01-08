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
        src: [ 'js/*.js' ]
      }
    },
    sass: {
      dist: {
        files: {
          'css/styles.css': 'css/styles.scss'
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
        }
      },
      dist: {
        files: {
          'js/videosearch.min.js': ['js/videosearch.js'],
          'js/thesis.min.js': ['js/thesis.js'],
          'js/nml-adv.min.js': ['js/nml-adv.js']
        }
      }
    },
    watch: {
      sass: {
        files: 'css/*.scss',
        tasks: ['sass']
      },
      jshint: {
        files: [
          'js/*.js'
          , '!js/jquery.*.js'
          ],
        tasks: ['jshint']
      }
    }
  });

  // shortcuts, multi-tasks
  grunt.registerTask('test', ['jshint']); // @todo scss-lint
  grunt.registerTask('build', ['sass', 'uglify']);
  grunt.registerTask('default', ['sass']);

};
