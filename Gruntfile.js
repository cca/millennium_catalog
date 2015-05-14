module.exports = function(grunt) {
	// load all tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			options: {
				asi: true,
				browser: true,
				laxcomma: true,
				globals: {}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			dist: {
				src: ['js/*.js', '!js/*.min.js', 'js/ga.js', '!js/*.pack.js']
			}
		},
		sass: {
			dist: {
				files: {
					'css/styles.css': 'css/styles.scss',
					'css/styles_s6.css': 'css/styles_s6.scss'
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
					// @todo these should end up in a build or dist folder
					// rather than sitting alongside the uncompressed files
					'js/videosearch.min.js': 'js/videosearch.js',
					'js/thesis.min.js': 'js/thesis.js',
					'js/nml-adv.min.js': 'js/nml-adv.js',
					'js/nml.min.js': [
						'js/nml-images.js'
						, 'js/fancybox-init.js'
						, 'js/note.js'
						, 'js/ga.js'
					],
					'js/catalog.min.js': [
						'js/cca-webpac.js'
						, 'js/fancybox-init.js'
						, 'js/note.js'
						, 'js/ga.js'
					]
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
					'js/*.js', '!js/jquery.*.js'
				],
				tasks: ['jshint']
			}
		}
	});

	// shortcuts, multi-tasks
	grunt.registerTask('test', ['jshint']); // @todo scss-lint
	grunt.registerTask('build', ['sass', 'uglify']);
	grunt.registerTask('default', ['sass', 'uglify']);
};
