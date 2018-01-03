module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      build_hedgehog_bootstrap: {
        command: [
          'cd vendors/hedgehog-bootstrap',
          'grunt'
        ].join('&&')
      }
    },
    clean: {
      dist: ['dist/*'],
      ghost_theme: ['vendors/ghost/content/themes/hedgehog/*']
    },
    copy: {
      hbs: {
        expand: true,
        cwd: '.',
        src: '*.hbs',
        dest: 'dist'
      },
      hbs_partials: {
        expand: true,
        cwd: 'partials',
        src: '**',
        dest: 'dist/partials/'
      },
      hedgehog_bootstrap_dist: {
        expand: true,
        cwd: 'vendors/hedgehog-bootstrap/dist',
        src: ['**'],
        dest: 'dist/assets'
      },
      package_json: {
        src: 'package.json',
        dest: 'dist/package.json'
      },
      theme: {
        expand: true,
        cwd: 'dist',
        src: ['**'],
        dest: 'vendors/ghost/content/themes/hedgehog'
      }
    },
    watch: {
      files: ['**.js', '**.hbs'],
      tasks: ['build']
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('build',
      [
        'clean:dist',
        'clean:ghost_theme',
        'exec:build_hedgehog_bootstrap',
        'copy:hedgehog_bootstrap_dist',
        'copy:hbs',
        'copy:hbs_partials',
        'copy:package_json',
        'copy:theme'
      ]
  );
};