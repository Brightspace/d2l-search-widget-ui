# d2l-search-widget-ui

A [Polymer](https://www.polymer-project.org/1.0/)-based web component that searches things.

## Building

Install dependencies via NPM:

```shell
npm install
```

## Running Locally

To run the application locally, run the following from within the project:

```shell
npm run serve
```

This will start a local server using `polymer-cli` which you can use to explore
the demo for the component.

## Using it

The `d2l-search-widget` takes a Siren Hypermedia action as a `search-action`
attribute, and will perform this action whenever the search is triggered. The
`search-field-name` attribute should be set to the name of the Siren Field that
the search field text should correspond to. `placeholder-text` will set the
placeholder text on the input element.

The widget will have a default height of 60px; this can be overridden with
`--d2l-search-widget-height`.

```html
<link rel="import" href="../d2l-search-widget/d2l-search-widget">

<style>
d2l-search-widget {
	--d2l-search-widget-height: 50px;
}
</style>

<d2l-search-widget
	search-action='{
		"name": "do-a-thing",
		"method": "GET",
		"href": "http://example.com",
		"fields": [{
			"name": "search-parameter",
			"type": "text",
			"value": ""
		}]
	}'
	search-field-name="search-parameter"
	placeholder-text="Search for things here!">
</d2l-search-widget>
```

## Coding styles

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on VUI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.
