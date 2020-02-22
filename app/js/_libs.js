// Lazy loading img & background images using intersection observer
// Reference: https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
// Using example: <img class="lazy" src="thumb.gif" data-src="real-img.jpg" data-srcset="real-img@1x.jpg 1x, real-img@2x.jpg 2x">
// Background image class usign example: <div class="lazy-background"> with added class ".visible" for styling
// Background image style attribute lazy loading example: <div data-bg="image.jpg">

document.addEventListener('DOMContentLoaded', function () {

	var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
	var lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-background'));
	var lazyBackgroundsData = [].slice.call(document.querySelectorAll('[data-bg]'));

	if ('IntersectionObserver' in window) {

		let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove('lazy');
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});
		lazyImages.forEach(function (lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});

		let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					lazyBackgroundObserver.unobserve(entry.target);
				}
			});
		});
		lazyBackgrounds.forEach(function (lazyBackground) {
			lazyBackgroundObserver.observe(lazyBackground);
		});

		let lazyBackgroundDataObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					let lazyBackgroundData = entry.target;
					lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
					lazyBackgroundDataObserver.unobserve(lazyBackgroundData);
				}
			});
		});
		lazyBackgroundsData.forEach(function (lazyBackgroundData) {
			lazyBackgroundDataObserver.observe(lazyBackgroundData);
		});

	} else {

		// Fallback

		lazyImages.forEach(function (lazyImage) {
			lazyImage.src = lazyImage.dataset.src;
			lazyImage.srcset = lazyImage.dataset.srcset;
		});
		lazyBackgrounds.forEach(function (lazyBackground) {
			lazyBackground.classList.add('visible');
		});
		lazyBackgroundsData.forEach(function (lazyBackgroundData) {
			lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
		});

	}

});

/**
 * Minified by jsDelivr using UglifyJS v3.4.1.
 * Original file: /npm/idb@2.1.3/lib/idb.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict"; !function () { function u(n) { return new Promise(function (e, t) { n.onsuccess = function () { e(n.result) }, n.onerror = function () { t(n.error) } }) } function i(n, o, r) { var i, e = new Promise(function (e, t) { u(i = n[o].apply(n, r)).then(e, t) }); return e.request = i, e } function e(e, n, t) { t.forEach(function (t) { Object.defineProperty(e.prototype, t, { get: function () { return this[n][t] }, set: function (e) { this[n][t] = e } }) }) } function t(t, n, o, e) { e.forEach(function (e) { e in o.prototype && (t.prototype[e] = function () { return i(this[n], e, arguments) }) }) } function n(t, n, o, e) { e.forEach(function (e) { e in o.prototype && (t.prototype[e] = function () { return this[n][e].apply(this[n], arguments) }) }) } function o(e, o, t, n) { n.forEach(function (n) { n in t.prototype && (e.prototype[n] = function () { return e = this[o], (t = i(e, n, arguments)).then(function (e) { if (e) return new c(e, t.request) }); var e, t }) }) } function r(e) { this._index = e } function c(e, t) { this._cursor = e, this._request = t } function s(e) { this._store = e } function p(n) { this._tx = n, this.complete = new Promise(function (e, t) { n.oncomplete = function () { e() }, n.onerror = function () { t(n.error) }, n.onabort = function () { t(n.error) } }) } function a(e, t, n) { this._db = e, this.oldVersion = t, this.transaction = new p(n) } function f(e) { this._db = e } e(r, "_index", ["name", "keyPath", "multiEntry", "unique"]), t(r, "_index", IDBIndex, ["get", "getKey", "getAll", "getAllKeys", "count"]), o(r, "_index", IDBIndex, ["openCursor", "openKeyCursor"]), e(c, "_cursor", ["direction", "key", "primaryKey", "value"]), t(c, "_cursor", IDBCursor, ["update", "delete"]), ["advance", "continue", "continuePrimaryKey"].forEach(function (n) { n in IDBCursor.prototype && (c.prototype[n] = function () { var t = this, e = arguments; return Promise.resolve().then(function () { return t._cursor[n].apply(t._cursor, e), u(t._request).then(function (e) { if (e) return new c(e, t._request) }) }) }) }), s.prototype.createIndex = function () { return new r(this._store.createIndex.apply(this._store, arguments)) }, s.prototype.index = function () { return new r(this._store.index.apply(this._store, arguments)) }, e(s, "_store", ["name", "keyPath", "indexNames", "autoIncrement"]), t(s, "_store", IDBObjectStore, ["put", "add", "delete", "clear", "get", "getAll", "getKey", "getAllKeys", "count"]), o(s, "_store", IDBObjectStore, ["openCursor", "openKeyCursor"]), n(s, "_store", IDBObjectStore, ["deleteIndex"]), p.prototype.objectStore = function () { return new s(this._tx.objectStore.apply(this._tx, arguments)) }, e(p, "_tx", ["objectStoreNames", "mode"]), n(p, "_tx", IDBTransaction, ["abort"]), a.prototype.createObjectStore = function () { return new s(this._db.createObjectStore.apply(this._db, arguments)) }, e(a, "_db", ["name", "version", "objectStoreNames"]), n(a, "_db", IDBDatabase, ["deleteObjectStore", "close"]), f.prototype.transaction = function () { return new p(this._db.transaction.apply(this._db, arguments)) }, e(f, "_db", ["name", "version", "objectStoreNames"]), n(f, "_db", IDBDatabase, ["close"]), ["openCursor", "openKeyCursor"].forEach(function (i) { [s, r].forEach(function (e) { i in e.prototype && (e.prototype[i.replace("open", "iterate")] = function () { var e, t = (e = arguments, Array.prototype.slice.call(e)), n = t[t.length - 1], o = this._store || this._index, r = o[i].apply(o, t.slice(0, -1)); r.onsuccess = function () { n(r.result) } }) }) }), [r, s].forEach(function (e) { e.prototype.getAll || (e.prototype.getAll = function (e, n) { var o = this, r = []; return new Promise(function (t) { o.iterateCursor(e, function (e) { e ? (r.push(e.value), void 0 === n || r.length != n ? e.continue() : t(r)) : t(r) }) }) }) }); var d = { open: function (e, t, n) { var o = i(indexedDB, "open", [e, t]), r = o.request; return r && (r.onupgradeneeded = function (e) { n && n(new a(r.result, e.oldVersion, r.transaction)) }), o.then(function (e) { return new f(e) }) }, delete: function (e) { return i(indexedDB, "deleteDatabase", [e]) } }; "undefined" != typeof module ? (module.exports = d, module.exports.default = module.exports) : self.idb = d }();
//# sourceMappingURL=/sm/712398a78d673b59135640381edaf7f41e9e5b55512114fb663e9dab40f2683d.map
