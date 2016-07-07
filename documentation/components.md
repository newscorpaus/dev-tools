# Front-end Components

## Naming standard ##
All components are named lowercase with dashes, eg:  
* header  
* story-list  
* footer-navigation  

## Rules not to break ##
* All components will have a root level class name matching the name of the component, eg:
```
<div class="story-list"></div>
```

* Class name prefix matches component

* CSS child class names
```
<div class="story-list">
	<div class="story-list_heading-state">
		<a class="story-list_heading_link-state"></a>
	</div>
</div>
```

* Prefer use class selectors not IDs for CSS
[id=something] instead of #id

* Don’t use really generic classes

* Always build minified javascript

* Preferred all components are responsiveness

* Before creating any global/commons js/css - think very carefully!!!

## Directory/File Structure ##

Component structure (Tangram)
```
|--tg-tlc-story-list  
    |-- src  
        |-- assets  
            |-- story-list.scss  
            |-- story-list.js  
        |-- templates  
      |-- index.jade  
    |-- index.js <-- entry point  
    |-- lib  
  |-- test  
  |-- build  
```

Component structure (WordPress)
```
|--story-list
  |-- dist
    |-- all packages js/css files go here
  |-- story-list.html.twig ( <-- Entry point )
  |-- js
    |-- story-list.js
  |-- scss
    |-- story-list.scss
  |-- twig
  	|-- _sub-template.html.twig
    |-- _sub-template-two.html.twig 
  |-- test
    | -- story-list.js
```

Shared component structure (tg-atoms)
```
|--tg-title
  |-- title.html.twig <-- Entry point WordPress
  |-- title.jade <-- Entry point TCOG
  |-- title.js
  |-- title.scss
  |-- fixture.js
  |-- test
    |-- index.js
```
  
## TODO ##
* @todo - look into feasibility of web components
* @todo - look into feasibility of customelements.io
* @todo - accessibility guidelines within components
