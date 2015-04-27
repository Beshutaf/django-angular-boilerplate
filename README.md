django-angular-boilerplate
==========================

The purpose of this boilerplate project is to show how to set up a Django project with a Single Page Angular app. 
The idea is try not to mix the front-end HTML with server-side Django templates.

#Aims
* Front end build should be separate from Django. The front-end app uses Grunt to build the app and dependent assets.
There should be no need to use libraries such as django compressor to concat, minimise and version assets, 
as this is all done by Grunt.

* In development, JS libraries need to be called without concat/minification, for debug purposes.

* In production, the JS libraries are prepared for distribution including conversion of templates to JS

* In both development and production environments, the JS app assets must be on Django's static path.

* Django URL routing needs to allow static assets to be served correctly

* Django URL routing needs to allow the HTML5 history API to work correctly - 
i.e. all URL slugs still serve the main Single Page App HTML file.

* To link Grunt with runserver during development


#Setting up Django
Set up a virtualenv
pip install -r requirements.txt

#Setting up Angular
Ensure npm package manager, grunt cli and bower are installed, then install required node packages for Grunt and 
bower components used by the app.

    npm install -g grunt-cli
    
    cd webapp
    sudo npm install
    bower install

#Running the app

The front-end app uses Grunt to build the app and dependent assets. In development mode, run:

    grunt dev
    
This will start a local server and load assets without minification. Good for development and debugging. This task also
watches for changes to JS, HTML and LESS files. LESS files are converted to CSS on change and placed in a 'build' folder
which is referenced in development.

To package the front-end app for distribution run:

    grunt dist
    
This will, amongst other things, concat, minify and version the assets. It will also re-write the HTML replacing the
exhaustive list of JS files in index.html with a minified version.
 

A management command has been added that allows runserver to integrate with Grunt build/watch. Rather than using the 
standard 'runserver' command, use 'gruntserver'. This will build assets when initialised, 
and whenever watch detects a change. e.g.

    python manage.py gruntserver 0.0.0.0:8000
    
The management command determines where to find the Gruntfile from settings.WEBAPP_NAME. When Django's server starts,
another process is spawned to run a Grunt task (django-dev) to watch for changes to front-end files. In this boilerplate,
this will result in LESS files being re-compiled and livereload reloading the page.

#Misc
The angular project layout is based on [John Papa's style guide](https://github.com/johnpapa/angularjs-styleguide)


