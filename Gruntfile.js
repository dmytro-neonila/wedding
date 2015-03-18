module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: '../css',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer'],
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['sass', 'connect', 'watch']);

};
