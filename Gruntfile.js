module.exports = function(grunt) {
  require('google-closure-compiler').grunt(grunt);

  const DEPSWRITER = 'node_modules/google-closure-library/closure/bin/' +
      'build/depswriter.py';
  const OUTPUT_WRAPPER_TEMPLATE = '(function(){\n%output%\n}).call(this)';
  const SOURCE_MAPPING_TEMPLATE = '\n//# sourceMappingURL=app.min.js.map';

  // List of source files to compile
  let buildSource = [
    'src/**.js',
    'node_modules/google-closure-templates/javascript/soyutils_usegoog.js',
    'node_modules/google-closure-library/closure/**.js',
    '!node_modules/google-closure-library/closure/**_test.js'
  ];

  // Application entry point
  const entryPoint = 'src/app.js';

  grunt.initConfig({
    'closure-compiler': {
      qa: {
        options: {
          entry_point: entryPoint,
          js: buildSource,
          compilation_level: 'SIMPLE_OPTIMIZATIONS',
          dependency_mode: 'STRICT',
          warning_level: 'VERBOSE',
          output_manifest: 'manifest.MF',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          summary_detail_level: 3,
          create_source_map: 'dist/assets/js/app.min.js.map',
          source_map_location_mapping: [
            "src/|/src/",
            "node_modules/|/node_modules/"
          ],
          output_wrapper: OUTPUT_WRAPPER_TEMPLATE + SOURCE_MAPPING_TEMPLATE,
          js_output_file: 'dist/assets/js/app.min.js',
          assume_function_wrapper: true,
          jscomp_error: '*',
          jscomp_warning: '*',
          hide_warnings_for: [
            'src/views',
            'node_modules/google-closure-library',
            'node_modules/google-closure-templates/javascript/'
            + 'soyutils_usegoog.js',
            'node_modules/material-components-web/dist/'
            + 'material-components-web.js'
          ]
        }
      },
      production: {
        options: {
          entry_point: entryPoint,
          js: buildSource,
          compilation_level: 'ADVANCED',
          dependency_mode: 'STRICT',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          summary_detail_level: 3,
          output_wrapper: OUTPUT_WRAPPER_TEMPLATE,
          js_output_file: 'dist/assets/js/app.min.js',
          assume_function_wrapper: true,
          jscomp_error: '*',
          jscomp_warning: '*',
          hide_warnings_for: [
            'src/views',
            'node_modules/google-closure-library',
            'node_modules/google-closure-templates/javascript/'
            + 'soyutils_usegoog.js',
            'node_modules/material-components-web/dist/'
            + 'material-components-web.js'
          ]
        }
      }
    },
    closureSoys: {
      all: {
        src: './src/views/**/*.soy',
        soyToJsJarPath: './node_modules/google-closure-templates/javascript/SoyToJsSrcCompiler.jar',
        outputPathFormat: '{INPUT_DIRECTORY}/{INPUT_FILE_NAME}.js',
        // Any other parameter included on the options will be added to call.
        options: {
          shouldGenerateJsdoc: true,
          shouldProvideRequireSoyNamespaces: true
        }
      }
    },
    exec: {
      // Build hedgehog-bootstrap theme.
      build_hedgehog_bootstrap: {
        command: [
          'cd vendors/hedgehog-bootstrap',
          'grunt'
        ].join('&&')
      },
      calculate_deps: 'python ' + DEPSWRITER +
          ' --root_with_prefix="src/ ../../../../src/"' +
          ' --path_with_depspath="node_modules/google-closure-templates/' +
          'javascript/soyutils_usegoog.js ../../../../node_modules/' +
          'google-closure-templates/javascript/soyutils_usegoog.js"' +
          ' --output_file=src/deps.js',
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
      src: {
        expand: true,
        cwd: 'src',
        src: '**',
        dest: 'dist/src'
      },
      google_closure_library: {
        expand: true,
        cwd: 'node_modules/google-closure-library',
        src: '**',
        dest: 'dist/node_modules/google-closure-library'
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
  grunt.loadNpmTasks('grunt-closure-soy');

  // Register tasks
  grunt.registerTask('build',
      [
        'clean:dist',
        'clean:ghost_theme',
        // Build theme scripts.
        'closureSoys:all',
        'exec:calculate_deps',
        'closure-compiler:production',
        // Build theme layouts.
        'exec:build_hedgehog_bootstrap',
        'copy:hedgehog_bootstrap_dist',
        'copy:hbs',
        'copy:package_json',
        'copy:theme'
      ]
  );

  grunt.registerTask('build:qa',
      [
        'clean:dist',
        'clean:ghost_theme',
        // Build theme scripts.
        'closureSoys:all',
        'exec:calculate_deps',
        'closure-compiler:qa',
        'copy:src',
        'copy:google_closure_library',
        // Build theme layouts.
        'exec:build_hedgehog_bootstrap',
        'copy:hedgehog_bootstrap_dist',
        'copy:hbs',
        'copy:package_json',
        'copy:theme'
      ]
  );
};