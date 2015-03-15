module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['compass', 'autoprefixer'],
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

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['compass', 'connect', 'watch']);

};
