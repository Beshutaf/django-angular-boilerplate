# Setting up Django
* Set up a virtualenv

    pip install -r requirements.txt

# Setting up Angular
Ensure `npm`, `grunt cli` and `bower` are installed, then install required node packages for Grunt and 
bower components used by the app.

    npm install -g grunt-cli
    
    cd webapp
    sudo npm install
    bower install

# Running the app

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

# Misc
The angular project layout is based on [John Papa's style guide](https://github.com/johnpapa/angularjs-styleguide)


