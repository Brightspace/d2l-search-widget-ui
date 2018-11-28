import '../@polymer/polymer/polymer-legacy.js';
import '../siren-parser/siren-parser.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};

/** @polymerBehavior */
D2L.PolymerBehaviors.SearchWidgetBehavior = {

	properties: {
		// Placeholder text that appears in the search field
		placeholderText: {
			type: String,
			value: ''
		},
		// Hypermedia Entity that contains search Action
		searchAction: {
			type: Object,
			observer: '_onSearchActionChanged'
		},
		// Name of the Hypermedia Field that typing into the search field mutates
		searchFieldName: {
			type: String,
			value: 'search'
		},
		// The Entity returned by the search Action
		searchResults: Object,
		// ARIA label used for search button. Should be localized by element consumer.
		searchButtonLabel: {
			type: String,
			value: 'Search'
		},
		// ARIA label used for clear button. Should be localized by element consumer.
		clearButtonLabel: {
			type: String,
			value: 'Clear Search'
		},
		_searchUrl: {
			type: String,
			observer: '_onSearchUrlChanged'
		},
		_searchInput: {
			type: String,
			observer: '_onSearchInputChanged'
		},
		_showClearIcon: {
			type: Boolean,
			observer: '_onShowClearIconChanged'
		}
	},

	// Trigger the search manually, e.g. via an external "Search" button
	search: function() {
		this._setSearchUrl();
	},

	// Clears search text and triggers search
	clear: function() {
		// Triggers _onSearchInputChanged to call _setSearchUrl with empty query
		this.set('_searchInput', '');
	},

	_getSearchInput: function() {
		return (this._searchInput ? this._searchInput.trim() : '');
	},

	_setSearchUrl: function() {
		if (!this._searchAction) {
			return;
		}

		var query = {};
		query[this.searchFieldName] = encodeURIComponent(this._getSearchInput());

		this.set('_searchUrl', this._createActionUrl(this._searchAction, query));
	},

	// Creates a URL with a query from an Action and an object of required parameters
	_createActionUrl: function(action, parameters) {
		parameters = parameters || {};
		action.fields = action.fields || [];
		var query = {};

		action.fields.forEach(function(field) {
			if (parameters.hasOwnProperty(field.name)) {
				query[field.name] = parameters[field.name];
			} else {
				query[field.name] = field.value;
			}
		});

		var queryString = Object.keys(query).map(function(key) {
			return key + '=' + query[key];
		}).join('&');

		return queryString ? action.href + '?' + queryString : action.href;
	},

	_onButtonClick: function() {
		if (this._showClearIcon) {
			this.clear();
		} else {
			this.search();
		}
	},

	_onShowClearIconChanged: function(showClearIcon) {
		if (showClearIcon) {
			// Set clear icon
			this.$$('button > d2l-icon').setAttribute('icon', 'd2l-tier1:close-default');
			this.$$('button').setAttribute('aria-label', this.clearButtonLabel);
		} else {
			// Set search icon
			this.$$('button > d2l-icon').setAttribute('icon', 'd2l-tier1:search');
			this.$$('button').setAttribute('aria-label', this.searchButtonLabel);
		}
	},

	_onSearchActionChanged: function(searchAction) {
		if ('string' === typeof searchAction) {
			searchAction = JSON.parse(searchAction);
		}

		// Siren parser can only parse entities, so make a fake one with the given action
		var entity = window.D2L.Hypermedia.Siren.Parse({
			actions: [ searchAction ]
		});
		var parsedSearchAction = entity.actions[0];
		this.set('_searchAction', parsedSearchAction);

		var searchField = parsedSearchAction.getFieldByName(this.searchFieldName);
		if (searchField && searchField.value) {
			this.set('_searchInput', searchField.value);
			// If we've applied a search, by default we want to show the clear button
			this.set('_showClearIcon', true);
		}
	},

	_onSearchInputChanged: function(newSearchString) {
		if (newSearchString.length === 0) {
			this._setSearchUrl();
		} else {
			this.set('_showClearIcon', false);
		}
	},

	_onSearchInputKeyPressed: function(e) {
		if (e.keyCode === 13) {
			// If Enter key pressed, do the search
			this.search();
		}
	},

	_onSearchResponse: function(searchResponse) {
		this.set('searchResults', searchResponse || {});
		this.fire('d2l-search-widget-results-changed', this.searchResults);
	},

	_onSearchUrlChanged: function(url) {
		this.set('_showClearIcon', this._getSearchInput() !== '');

		// Using an observer means if search button is clicked multiple times with
		// the same query, only the first time generates a call
		return window.d2lfetch
			.fetch(new Request(url, {
				headers: { Accept: 'application/vnd.siren+json' }
			}))
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				return Promise.reject(response.status + ' ' + response.statusText);
			})
			.then(window.D2L.Hypermedia.Siren.Parse)
			.then(this._onSearchResponse.bind(this));
	}

};