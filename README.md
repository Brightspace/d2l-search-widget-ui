# d2l-search-widget-ui

A [Polymer][polymer]-based web component that searches things via a [Siren Hypermedia][siren] action.

## Building and Running Locally

Install npm and bower dependencies:

```shell
npm install
```

Run tests:

```shell
npm test
```

To run the application locally, run the following from within the project:

```shell
polymer serve
```

This will start a local server using `polymer-cli` which you can use to explore the demo for the component at http://localhost:8000/components/d2l-search-widget/demo/.

## Using it

The `d2l-search-widget` takes a Siren Hypermedia action as a `search-action` attribute, and will perform this action whenever the search is triggered. The `search-field-name` attribute should be set to the name of the Siren Field that the search field text should correspond to. `placeholder-text` will set the placeholder text on the input element.

`d2l-search-widget` uses [`d2l-fetch`][d2lfetch] to actually fetch data. When using the `d2l-search-widget`, we strongly recommend also using the [`d2l-simple-cache`][d2lfetchsimplecache] and [`d2l-auth`][d2lfetchauth] middlewares for this as well, and `use` them in your app.

A `d2l-search-widget-results-changed` event is fired when the search completes. The event's `value` will contain the response, parsed with `node-siren-parser`.

The widget will have a default height of 60px; this can be overridden with `--d2l-search-widget-height`.

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

## Contributing

1. **Fork** the repository. Committing directly against this repository is highly discouraged.

2. Make your modifications in a branch, updating and writing new tests.

3. Ensure that all tests pass.

4. `rebase` your changes against master. *Do not merge*.

5. Submit a pull request to this repository. Wait for tests to run and someone to chime in.

[polymer]: https://www.polymer-project.org/
[siren]: https://github.com/kevinswiber/siren
[d2lfetch]: https://github.com/Brightspace/d2l-fetch
[d2lfetchsimplecache]: https://github.com/Brightspace/d2l-fetch-simple-cache
[d2lfetchauth]: https://github.com/Brightspace/d2l-fetch-auth
