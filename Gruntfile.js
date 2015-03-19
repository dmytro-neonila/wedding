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
    }
  });

  grunt.loadNpmTasks('grunt-libsass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['libsass', 'autoprefixer', 'connect', 'watch']);

};
