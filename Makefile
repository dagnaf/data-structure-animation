SHELL := /bin/bash

PATH := node_modules/.bin:$(PATH)

JS_FILES := $(shell glob-cli src/models/*.js src/*.js)

JSX_FILES := $(shell glob-cli src/components/*.jsx)

JSC_FILES := $(shell glob-cli src/codes/*)

build: bundle.js bundle.css

bundle.js: $(JS_FILES) $(JSX_FILES) $(JSC_FILES)
	browserify -t reactify -t brfs src/index.js > bundle.js

bundle.css: src/index.css
	autoprefixer src/index.css -o bundle.css

clean:
	rm bundle.*

