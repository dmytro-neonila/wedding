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
      options: {
        mangle: false
      },
      files: [{
          expand: true,
          cwd: 'js/',
          src: '**/*.js',
          dest: 'js/minified'
      }]
    },
    concat: {
      dist: {
        src: [
          'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
          'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js',
          'js/minified/classie.min.js',
          'js/minified/jacrousel.min.js',
          'js/minified/main-preloading.min.js',
          'js/minified/pathLoader.min.js',
          'js/minified/touchwipe.min.js',
          'js/minified/velocity.min.js',
          'js/minified/main.min.js'
        ],
        dest: 'js/scripts.min.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-libsass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['libsass', 'autoprefixer', 'connect', 'uglify', 'watch']);

};
