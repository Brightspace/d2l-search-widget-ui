import '@polymer/polymer/polymer-legacy.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-fetch/d2l-fetch.js';
import SirenParse from 'siren-parser';
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
		// ARIA label used for the search input. Should be localized by element consumer.
		searchLabel: {
			type: String
		},
		_searchAction: {
			type: String
		},
		_searchUrl: {
			type: String,
			observer: '_onSearchUrlChanged'
		}
	},

	ready: function() {
		this._handleSearch = this._handleSearch.bind(this);
	},

	attached: function() {
		afterNextRender(this, function() {
			this._getSearchInput().addEventListener('d2l-input-search-searched', this._handleSearch);
		}.bind(this));
	},

	detached: function() {
		this._getSearchInput().removeEventListener('d2l-input-search-searched', this._handleSearch);
	},

	// Trigger the search manually, e.g. via an external "Search" button
	search: function() {
		this._getSearchInput().search();
	},

	// Clears search text and triggers search
	clear: function() {
		const searchInput = this._getSearchInput();
		searchInput.value = '';
		searchInput.search();
	},

	_getSearchInput: function() {
		return this.shadowRoot.querySelector('d2l-input-search');
	},

	_handleSearch: function(e) {
		this._setSearchUrl(e.detail.value.trim());
	},

	_setSearchUrl: function(searchValue) {
		if (!this._searchAction) {
			return;
		}

		var query = {};
		query[this.searchFieldName] = encodeURIComponent(searchValue);

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

	_onSearchActionChanged: function(searchAction) {
		if ('string' === typeof searchAction) {
			searchAction = JSON.parse(searchAction);
		}

		// Siren parser can only parse entities, so make a fake one with the given action
		var entity = SirenParse({
			actions: [ searchAction ]
		});
		var parsedSearchAction = entity.actions[0];
		this.set('_searchAction', parsedSearchAction);

		var searchField = parsedSearchAction.getFieldByName(this.searchFieldName);
		if (searchField && searchField.value) {
			const searchInput = this._getSearchInput();
			searchInput.value = searchField.value;
		}
	},

	_onSearchResponse: function(searchResponse) {
		this.set('searchResults', searchResponse || {});
		this.fire('d2l-search-widget-results-changed', this.searchResults);
	},

	_onSearchUrlChanged: function(url) {
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
			.then(SirenParse)
			.then(this._onSearchResponse.bind(this));
	}

};
