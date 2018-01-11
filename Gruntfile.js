module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      // Build hedgehog-bootstrap theme.
      build_hedgehog_bootstrap: {
        command: [
          'cd vendors/hedgehog-bootstrap',
          'grunt'
        ].join('&&')
      }
    },
    // Clean dist folder.
    clean: {
      dist: ['dist/*'],
      ghost_theme: ['vendors/ghost/content/themes/hedgehog/*']
    },
    copy: {
      // Copy all *.hbs templates to `dist` folder.
      hbs: {
        expand: true,
        cwd: 'templates',
        src: '**',
        dest: 'dist/'
      },
      // Copy hedgehog-bootstrap theme to `dist/assets` folder.
      hedgehog_bootstrap_dist: {
        expand: true,
        cwd: 'vendors/hedgehog-bootstrap/dist',
        src: '**',
        dest: 'dist/assets'
      },
      // Cpy package.json to `dist` folder.
      package_json: {
        src: 'package.json',
        dest: 'dist/package.json'
      },
      // Copy complete theme to `ghost/content/themes/` folder.
      theme: {
        expand: true,
        cwd: 'dist',
        src: ['**'],
        dest: 'vendors/ghost/content/themes/hedgehog'
      }
    },
    // Settings for `grunt watch` task.
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
        'copy:package_json',
        'copy:theme'
      ]
  );
};