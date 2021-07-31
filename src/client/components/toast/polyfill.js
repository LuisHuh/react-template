/**
 * Polyfill remove() method in Internet Explorer 9 and higher.
 * @memberof Polyfill
 * @see <https://gist.github.com/MTco/23c94affcd4ecd5d42b06a2155285078#file-polyfill-dom-childnode-remove>
 */

const remove = (function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty("remove")) {
			return;
		}
		Object.defineProperty(item, "remove", {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				this.parentNode.removeChild(this);
			},
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

export default remove;