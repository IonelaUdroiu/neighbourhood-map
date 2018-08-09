// service worker version
let version = 'neighbourhood-map-v1-';
// data to cache
let cachedArray = [`/`, `/index.html?timestamp=${timeStamp}`, `/manifest.json?timestamp=${timeStamp}`, `/src/index.css?timestamp=${timeStamp}`, `/src/index.js?timestamp=${timeStamp}`, `/src/App.css?timestamp=${timeStamp}`, `/src/App.js?timestamp=${timeStamp}`, `/src/components/MapContainer.js?timestamp=${timeStamp}`, `/src/components/Places.js?timestamp=${timeStamp}`, ];
//install service worker and create a new cache
self.addEventListener('install', function(event) {
	console.log('installing worker');
	event.waitUntil(caches.open(version + 'core').then(function(cache) {
		return cache.addAll(cachedArray);
	}).then(function() {
		console.log('installation complete');
	}));
});
// fetch updates from the network
self.addEventListener('fetch', function(event) {
	console.log('fetch updates from the network');
	event.respondWith(caches.match(event.request).then(function(response) {
		return response || fetch(event.request);
	}));
});
// activate new cache and delete the old cache
self.addEventListener('activate', function(event) {
	console.log('activate new cache');
	event.waitUntil(caches.keys().then(function(cacheNames) {
		return Promise.all(cacheNames.filter(function(cacheName) {
			return cacheName.startsWith('r-reviews-') && cacheName != version;
		}).map(function(cacheName) {
			return cache.delete(cacheName);
		}))
	}).catch(function(error) {
		// on first run, it should log this error
		console.log('there is no old cache to be deleted');
		return
	}));
});
