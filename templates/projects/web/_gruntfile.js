// This file in the main entry point for defining grunt tasks and using grunt plugins.
// Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409

'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: 'app',
        dist: 'dist',

        sass: {<% if (!compass) { %>
            options: {
                includePaths: ['<%%= app %>/bower_components/foundation/scss']
            },
            dist: {
                options: {
                    outputStyle: 'extended'
                },
                files: {
                    '<%%= app %>/css/app.css': '<%%= app %>/scss/app.scss'
                }
            }<% } else { %>
            dist: {
        options: {
                        style: 'expanded', // expanded or nested or compact or compressed
                        loadPath: '<%%= app %>/bower_components/foundation/scss',
                        compass: true,
                        quiet: true
        },
                files: {
                    '<%%= app %>/css/app.css': '<%%= app %>/scss/app.scss'
                }
            }<% } %>
},
		<% if (jade) { %>
    jade: {
		        compile: {
                options: {
		                    pretty: true,
		                    data: {
                        debug: false
		                    }
                },
		            files: [{
		                expand: true,
		                cwd: '<%%= app %>/',
		                src: ['**/*.jade', '!**/header.jade', '!**/footer.jade'],
		                ext: '.html',
		                dest: '<%%= app %>/'
		            }]
		        }
    },<% } %>

bower: {
    install: {
            options: {
                targetDir: "wwwroot/lib",
                layout: "byComponent",
                cleanTargetDir: true
            }
    }
},

jshint: {
        options: {
            jshintrc: '.jshintrc'
        },
    all: [
        'Gruntfile.js',
        '<%%= app %>/js/**/*.js'
    ]
},

clean: {
        dist: {
            src: ['<%%= dist %>/*']
        },
    bower: {
            src: ['app/bower_components/*']
    },
		},
copy: {
        dist: {
            files: [{
                expand: true,
                cwd:'<%%= app %>/',
                src: ['fonts/**', '**/*.html', '**/*.cshtml', '!**/*.scss', '!bower_components/**'],
                dest: '<%%= dist %>/'
            }<% if (fontAwesome) { %> , {
            expand: true,
            flatten: true,
            src: ['<%%= app %>/bower_components/font-awesome/fonts/**'],
            dest: '<%%= dist %>/fonts/',
            filter: 'isFile'
        } <% } %>]
        },
        app_files: {
    files: [{
        expand: true,
        cwd:'<%%= app %>/css',
        src: ['app_override.css'],
        dest: 'wwwroot/css'
    }, {
        expand: true,
        cwd: '<%%= app %>/js',
        src: ['app.js'],
        dest: 'wwwroot/js'
    }]	
        },
bower: {
        files: [{
            expand: true,
            src: ['bower_components/**'],
            dest: 'app/'
        }]
},
},

imagemin: {
        target: {
            files: [{
                expand: true,
                cwd: '<%%= app %>/images/',
                src: ['**/*.{jpg,gif,svg,jpeg,png}'],
                dest: '<%%= dist %>/images/'
            }]
        }
},

uglify: {
        options: {
            preserveComments: 'some',
            mangle: false
        }
},

useminPrepare: {
        html: ['<%%= app %>/index.html', '<%%= app %>/index.cshtml', '<%%= app %>/_Layout.cshtml'],
        options: {
        dest: '<%%= dist %>'
        }
},

usemin: {
        html: ['<%%= dist %>/**/*.html', '<%%= dist %>/**/*.cshtml', '!<%%= app %>/bower_components/**'],
        css: ['<%%= dist %>/css/**/*.css'],
        options: {
        dirs: ['<%%= dist %>']
        }
},

watch: {
        grunt: {
            files: ['Gruntfile.js'],
            tasks: ['sass']
        },
    sass: {
            files: '<%%= app %>/scss/**/*.scss',
            tasks: ['sass']
    },<% if (jade) { %>
        jade: {
            files: '<%%= app %>/**/*.jade',
            tasks: ['jade']
        },<% } %>
    livereload: {
        files: ['<%%= app %>/**/*.html', '!<%%= app %>/bower_components/**', '<%%= app %>/js/**/*.js', '<%%= app %>/css/**/*.css', '<%%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
        options: {
            livereload: true
        }
    }
},

connect: {
        app: {
            options: {
                    port: 9000,
                    base: '<%%= app %>/',
                    open: true,
                    livereload: true,
                    hostname: '127.0.0.1'
            }
        },
    dist: {
            options: {
                port: 9001,
                base: '<%%= dist %>/',
                open: true,
                keepalive: true,
                livereload: false,
                hostname: '127.0.0.1'
            }
    }
},

wiredep: {
        html: {
            src: [<% if (jade) { %>
                '<%%= app %>/**/*.jade'<% } else { %>
                '<%%= app %>/**/*.html'<% } %>
                ],
                exclude: [
					'modernizr',<% if (fontAwesome) { %>
					'font-awesome',<% } %>
					'jquery-placeholder',
					'foundation'
]
},
cshtml: {
        src: [
            '<%%= app %>/**/*.cshtml'
        ],

        fileTypes: {
        html: {
                    block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                js: /<script.*src=['"](.+)['"]>/gi,
                css: /<link.*href=['"](.+)['"]/gi
		                            },
            replace: {
                    js: '<script src="~/lib{{filePath}}"></script>',
                    css: '<link rel="stylesheet" href="~/lib{{filePath}}" />'
            }
        }
        },

    ignorePath: '../bower_components',
    exclude: [
        'modernizr',
        'font-awesome',
        'jquery-placeholder',
        'foundation'
    ]
}

}

});

<% if (jade) { %>grunt.registerTask('compile-jade', ['jade']);<% } %>
grunt.registerTask('compile-sass', ['sass']);
grunt.registerTask('bower-install', ['wiredep', 'clean:bower', 'copy:bower']);
<% if (jade) { %>
grunt.registerTask('default', ['bower:install'], ['bower-install', 'compile-jade', 'compile-sass', 'copy:app_files', 'connect:app', 'watch']);<% } else { %>
grunt.registerTask('default', ['bower:install'], ['bower-install', 'compile-sass', 'copy:app_files', 'connect:app', 'watch']);<% } %>
grunt.registerTask('validate-js', ['jshint']);
grunt.registerTask('server-dist', ['connect:dist']);
grunt.registerTask('bower-copy', ['copy:bower']);
grunt.registerTask('copy-app-files', ['copy:app_files']);
<% if (jade) { %>
    //grunt.registerTask('publish', ['compile-jade', 'compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);<% } else { %>
    //grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);<% } %>

    // The following line loads the grunt plugins.
    // This line needs to be at the end of this this file.
grunt.loadNpmTasks("grunt-bower-task");

};
