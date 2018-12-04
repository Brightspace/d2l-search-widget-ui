/**
`d2l-search-widget`
Polymer-based web component that searches things.

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-fetch/d2l-fetch.js';
import 'd2l-icons/d2l-icons.js';
import '@polymer/iron-input/iron-input.js';
import './localize-behavior.js';
import './d2l-search-widget-behavior.js';
import './d2l-search-widget-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-search-widget">
	<template strip-whitespace="">
		<style include="d2l-search-widget-styles"></style>
		<iron-input bind-value="{{_searchInput}}">
			<input value="{{_searchInput}}" placeholder="[[placeholderText]]" on-keydown="_onSearchInputKeyPressed">
			
		</iron-input>
		<button type="button" on-tap="_onButtonClick" aria-label$="[[searchButtonLabel]]">
			<d2l-icon icon="d2l-tier1:search"></d2l-icon>
		</button>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-search-widget',
	behaviors: [
		D2L.PolymerBehaviors.SearchWidget.LocalizeBehavior,
		D2L.PolymerBehaviors.SearchWidgetBehavior
	]
});
