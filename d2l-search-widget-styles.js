import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-search-widget-styles">
	<template>
		<style>

			:host {
				position: relative;
				display: block;
				padding: 0;
				margin: 0;
			}

			:host iron-input {
				display: block;
			}

			input {
				color: var(--d2l-color-ferrite);
				font-family: inherit;
				font-size: calc(var(--d2l-search-widget-height, 60px) / 3) !important;
				width: 100%;
				height: var(--d2l-search-widget-height, 60px);
				border: 1px solid var(--d2l-color-titanius);
				border-radius: .3rem;
				box-shadow: inset 0 2px 0 0 rgba(185,194,208,.2);
				box-sizing: border-box;
				transition: background-color 0.5s ease, border-color 0.5s ease;
				-webkit-transition: background-color 0.5s ease, border-color 0.5s ease;
				padding-left: calc(var(--d2l-search-widget-height, 60px) / 6);
				padding-right: var(--d2l-search-widget-height, 60px);
			}

			input:focus,
			input:hover {
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				outline: 0;
				/* Subtract 1px for increased border width */
				padding-left: calc(var(--d2l-search-widget-height, 60px) / 6 - 1px);
				padding-right: calc(var(--d2l-search-widget-height, 60px) - 1px);
			}

			input::-ms-clear {
				display: none;
			}

			:host button {
				position: absolute;
				top: 0px;
				right: 0px;
				margin: calc(var(--d2l-search-widget-height, 60px) / 6);
				background: none;
				border: 1px solid transparent;
				cursor: pointer;
				height: calc(2 * var(--d2l-search-widget-height, 60px) / 3);
				width: calc(2 * var(--d2l-search-widget-height, 60px) / 3);
			}

			:host button:hover,
			:host button:focus {
				border-color: var(--d2l-color-pressicus);
				border-radius: 0.3rem;
			}

			d2l-icon {
				--d2l-icon-height: calc(var(--d2l-search-widget-height, 60px) / 3);
				--d2l-icon-width: calc(var(--d2l-search-widget-height, 60px) / 3);
				color: var(--d2l-color-ferrite);
			}

		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
