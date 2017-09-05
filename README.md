# gen-html

Save time building and making changes to static web sites. 

This little tool plays nice with front-end frameworks and helps you stay away from server-side code when all you or your client needs is a simple static site. 

## Features

* Build reusable code snippets 
* Assemble layouts from code snippets
* Insert common site-level variables throughout the site
* Assign layouts and page-level variables to each web page
* Rebuild your site using a single command

## Prerequisites

__gen-html__ requires [node](https://nodejs.org/en/download/)

## Install 

1. Download and extract the __gen-html__ files from this repository. 
2. Create a copy of the extracted files to begin a new project.

## The project folder

In addition to site generation code, your project folder contains a working sample that you can start with immediately to get a feel for how __gen-html__ works.

Here are the key things to know about the contents of the project folder:

* __build/__ - your css, img, and js files along with any auto-generated web pages that are created by __gen-html__
* __layouts/__ - your layout templates
* __pages/__ - your page content (each page should have unique content and is )
* __snippets__ - your reusable HTML snippets
* __gen-html.js__ - your static site generator script (where the magic happens)
* __site-variables.json__ - your rules for site-level and page-level variables and assigned layouts

## Usage

1. In the *layouts* folder, create .html template files for each unique web page layout you are going to use. 

Example file names:

* home-page.html
* layout.html 

__Note:__ You can build complete templates if you prefer, but if you want to include components that would comprise part of the template like menus, head, footer, it's recommended that you create snippets for those components instead. 

layout.html example:

`<!doctype html>
<html>
{{head}}

<body>
{{menu}}
{{common-page-structure}}
{{footer}}
</body>
</html>`

2. Add placeholders for snippets: 

The text in the placeholder should match the file name of the snippet, except for the file extension:

`{{menu}}` 

matches *menu.html*

__Note:__ If you are building a home page layout, you can add the reserved `[[content]]` placeholder in the layout file to indicate to __gen-html__ to insert the unique home page content. You must type it exactly as shown.

3. Create your reusable HTML snippets and save them with the .html extension in the *snippets* folder. __Note:__ These aren't intended to be valid HTML files.

Snippet example: 

`<!-- Begin Nav Snippet -->`
`<div class="row show-for-small-only">`
`    <div class="small-12 columns v-middle"><h2 style="color: white;">{{common.company}}</h2>`
`	<h3 style="color: white;">{{common.soundbite}}</h3></div>`
`</div>`
` `
` <nav class="top-bar home-nav" data-topbar>`
` 	<ul class="title-area">`
` 		<li class="name"><h1><a href="index.html">{{common.copyright}}</a></h1></li>`
` `       
` 		<li class="toggle-topbar menu-icon"><a href="#"><span></span></a></li>`
` 	</ul>`
` 	<section class="top-bar-section">`
` 	<!-- Right Nav Section -->`
`        <ul class="right">`
`            <li class="has-dropdown"><a href="#">About</a>`
`				<ul class="dropdown">`
`					<li><a href="about.html">The Service Provider</a></li>`
`					<li><a href="#">Executive Team</a></li>`
`					<li><a href="#">Careers</a></li>`
`				</ul>`
`			</li>`
`            <li class="has-dropdown"><a href="#">Services</a>`
`				<ul class="dropdown">`
`					<li><a href="services.html">Most requested service</a></li>`
`					<li><a href="#">Placeholder</a></li>`
`					<li><a href="#">Placeholder</a></li>`
`				</ul>`
`			</li>`
`           <li><a href="contact.html">Contact</a></li>`
`        </ul>`
` 	</section>`
` </nav>`
` ` 
`<!-- End Nav Snippet -->`

4. Add variable placeholders in your snippets.

__Note:__ `common`, `data`, `filename`, and `variables` are reserved names

If your variable is a site-level variable, prefix the variable name with `common.` like the following:

`{{common.company}}`

If your variable is a page-level variable, prefix the variable name with `data.` like the following:

`<head>`
`<title>{{data.title}}`

If your snippet will insert the unique content for the web page, add the `[[content]]` placeholder like in the following snippet example:

`<div class="row">`
`    <div class="large-12 columns">`
` `        
`        [[content]]`
` `	
`    </div>`
`</div>`

5. In the *pages* folder, create the unique content files that will replace the `[[content]]` placeholder when processed by __gen-html__. The following is the contents of the sample *about.html* file in the *pages* folder:

`<h1>About the Service Provider</h1>
        	
<p>Jane Doe is a Pellentesque sit amet sodales leo. Proin rutrum tellus quis vestibulum dignissim. Suspendisse potenti. In hac habitasse platea dictumst. Mauris at facilisis est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas id dolor quis facilisis.</p>

<p>Proin id pellentesque justo. Etiam vehicula nibh ut pellentesque iaculis. Donec varius elit sed facilisis aliquet. Suspendisse erat risus, sollicitudin sit amet finibus quis, dignissim vitae sem. Proin ut euismod erat. Nulla lectus sem, pharetra et consequat vel, suscipit at purus. Donec posuere dui a leo finibus, at egestas metus commodo.</p> 

<p>Donec ac risus vitae tortor tincidunt ultrices at ullamcorper augue. Donec commodo vel neque sed accumsan. Praesent nec elit malesuada, molestie metus semper, elementum lorem. Sed faucibus risus et malesuada ullamcorper. Nulla scelerisque interdum tellus, a lobortis urna tempor ut. Donec eleifend arcu quis ex condimentum, non cursus mauris volutpat.</p>`

6. Edit the *site-variables.json* file to include all of the site-level (common) variable names and values and the page-level file names, assigned layouts, and variables.

*site-variables.json* example with common variables only:

`var site_variables = {`
`	"common" : {`
`		"copyright" : "&copy; 2017 A Great Company",`
`		"add_yours_here" : "your value here",`
`		"company" : "A Great Company",`
`		"soundbite" : "We strive to do awesome things"`
`	}`
`}`

*site-variables.json* example with layouts added: 

`var site_variables = {`
`	"common" : {`
`		"copyright" : "&copy; 2017 A Great Company",`
`		"add_yours_here" : "your value here",`
`		"company" : "A Great Company",`
`		"soundbite" : "We strive to do awesome things"`
`	},`
`	"data" : [`
`		{`
`			"filename" : "about.html",`
`			"layout" : "layout.html"`
`		},`
` `
`		{`
`			"filename" : "contact.html",`
`			"layout" : "contact-layout.html"`
`		},`
` `
`		{`
`			"filename" : "index.html",`
`			"layout" : "home-page.html"`
`		},`
` `
`		{`
`			"filename" : "services.html",`
`			"layout" : "layout.html"`
`		}`
` `
`	]`
`}`
`// common, data, filename, and variables are reserved names`

*site-variables.json* example with page-level variables added: 

`var site_variables = {`
`	"common" : {`
`		"copyright" : "&copy; 2017 A Great Company",`
`		"add_yours_here" : "your value here",`
`		"company" : "A Great Company",`
`		"soundbite" : "We strive to do awesome things"`
`	},`
`	"data" : [`
`		{`
`			"filename" : "about.html",`
`			"layout" : "layout.html",`
`			"variables" : {`
`				"title" : "About A Great Company"`
`			}`
`		},`
` `
`		{`
`			"filename" : "contact.html",`
`			"layout" : "contact-layout.html",`
`			"variables" : {`
`				"title" : "Contact Jane Doe"`
`			}`
`		},`
` `
`		{`
`			"filename" : "index.html",`
`			"layout" : "home-page.html",`
`			"variables" : {`
`				"title" : "A Great Company"`
`			}`
`		},`
` `
`		{`
`			"filename" : "services.html",`
`			"layout" : "layout.html",`
`			"variables" : {`
`				"title" : "Services Offered"`
`			}`
`		}`
` `
`	]`
`}`
`// common, data, filename, and variables are reserved names`

## Potential issues

* Subfolders in the *layouts*, *pages*, and *snippets* folders have not been tested 
* __gen-html__ has not been stress-tested with hundreds or thousands of pages

## Author

Benjamin Dorge [bendorge@gmail.com](bendorge@gmail.com)

## License

* __MIT__ : [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)
