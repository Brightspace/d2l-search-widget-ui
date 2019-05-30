/**
`d2l-search-widget`
Polymer-based web component that searches things.

@demo demo/index.html
*/

import '@polymer/polymer/polymer-legacy.js';

import 'd2l-inputs/d2l-input-search.js';
import './d2l-search-widget-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-search-widget">
	<template strip-whitespace="">
		<d2l-input-search label="[[searchLabel]]" placeholder="[[placeholderText]]"></d2l-input-search>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-search-widget',
	behaviors: [
		D2L.PolymerBehaviors.SearchWidgetBehavior
	]
});
