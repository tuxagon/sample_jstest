module.exports = function (grunt) {
	var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
	banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
	banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			dev: ['gruntfile.js', 'test/*.js'],
			app: ['app/*.js'],
			options: {
				maxlen: 120
			}
		},
		concat: {
			options: {
				separator: ';\n',
				banner: banner
			},
			build: {
				files: [{
					src: ['app/*.js'],
					dest: 'build/<%= pkg.name %>.js'
				}]
			}
		},
		uglify: {
			options: {
				banner: banner
			},
			build: {
				files: {
					'build/<%= pkg.name %>.min.js': 
						['build/<%= pkg.name %>.js']
				}
			}
		},
		simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['test/*.js']
            }
        },
        watch: {
        	scripts: {
        		files: ['gruntfile.js','app/*.js','test/**/*.js'],
        		tasks: ['development']
        	}
        }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint','simplemocha','concat','uglify']);
	grunt.registerTask('development', ['jshint','simplemocha']);
};