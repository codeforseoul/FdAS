module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	  loopback_sdk_angular: {
	    services: {
	      options: {
	        input: 'server/server.js',
	        output: 'client/js/lb-services.js'
	      }
	    }
	  },
	  docular: {
	    groups: [
	      {
	        groupTitle: 'LoopBack',
	        groupId: 'loopback',
	        sections: [
	          {
	            id: 'lbServices',
	            title: 'LoopBack Services',
	            scripts: [ 'client/js/lb-services.js' ]
	          }
	        ]
	      }
	    ]
	  },
	  // config of other tasks
	});

  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
	grunt.loadNpmTasks('grunt-docular');

  // Default task(s).
  grunt.registerTask('default', ['loopback_sdk_angular', 'docular']);

};