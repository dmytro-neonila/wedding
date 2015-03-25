module.exports = function(grunt) {

  grunt.initConfig({
    libsass: {
      files: {
        expand: true,
        cwd: 'sass',
        src: ['**/*.scss'],
        dest: 'css',
        ext: '.css'
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['libsass', 'autoprefixer'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: '**/*.html',
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      no_dest: {
        src: 'css/style.css'
      }
    },
    uglify: {
      app: {
        files: {
          'dest/js/wedding.js': [
            'js/jquery.js',
            'js/underscore.js',
            'js/velocity.js',
            'js/jcarousel.js',
            'js/classie.js',
            'js/pathLoader.js',
            'js/main-preloading.js',
            'js/main.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-libsass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['libsass', 'autoprefixer', 'uglify', 'connect', 'watch']);

};
