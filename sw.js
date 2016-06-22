// Config object
var config = {
  version: 'v1',
  staticCacheItems: [
    '/',
    '/bundle.js',
    ],
  offlinePage: '/offline/',
  cachePathPattern: /^\//
};

var CACHE_NAME = 'static-adventure-' + config.version;

function onInstall (event, opts) {
  return caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache', opts.staticCacheItems);
      return cache.addAll(opts.staticCacheItems);
    });
}

// Set the callback for the install step
self.addEventListener('install', function(event) {

  event.waitUntil(
    onInstall(event, config).then(function() { return self.skipWaiting() })
  );
});

function onActivate (event, opts) {
  return caches.keys()
    .then(function(cacheKeys) {
      var oldCacheKeys = cacheKeys.filter(function(key) {
          return key.indexOf(opts.version) === -1;
        }),
        deletePromises = oldCacheKeys.map(function(oldKey) {
          return caches.delete(oldKey);
        });
      return Promise.all(deletePromises);
    });
}

self.addEventListener('activate', function(event) {
  event.waitUntil(
    onActivate(event, config)
     .then(function() { return self.clients.claim() })
  );
});

function shouldHandleFetch (event, opts) {
  var request = event.request,
    url       = new URL(request.url),
    criteria  = {
      'matchesPathPattern': !!(opts.cachePathPattern.exec(url.pathname)),
      'isGETRequest': request.method === 'GET',
      'isFromMyOrigin': url.origin === self.location.origin
    },
    failingCriteria;

  failingCriteria = Object.keys(criteria).filter(function(criteriaKey) {
    return !criteria[criteriaKey]
  });
  return !failingCriteria.length;
}

function addToCache (cacheKey, request, response) {
  var copy;
  if (response.ok) {
    copy = response.clone();
    caches.open(cacheKey).then(function(cache) {
      cache.put(request, copy);
    });
    return response;
  }
}

function fetchFromCache (event) {
  return caches.match(event.request).then(function(response) {
    if (!response) {
      // A synchronous error that will kick off the catch handler
      throw Error(event.request.url + ' not found in cache');
    }
    return response;
  });
}

function offlineResponse (resourceType, opts) {
  if (resourceType === 'image') {
    // return new Response(opts.offlineImage,
    //   { headers: { 'Content-Type': 'image/svg+xml' } }
    // );
  } else if (resourceType === 'content') {
    return caches.match(opts.offlinePage);
  }
  return undefined;
}

function onFetch (event, opts) {
  var request    = event.request,
    acceptHeader = request.headers.get('Accept'),
    resourceType = 'static',
    cacheKey;

  if (acceptHeader.indexOf('text/html') !== -1) {
    resourceType = 'content';
  } else if (acceptHeader.indexOf('image') !== -1) {
    resourceType = 'image';
  }

  // {String} [static|image|content]
  cacheKey = resourceType + '-adventure-' + config.version;
  if (resourceType === 'content') {
    // Use a network-first strategy.
    event.respondWith(
      fetch(request)
        .then(function(response) { return addToCache(cacheKey, request, response) })
        .catch(function() { return fetchFromCache(event) })
        .catch(function() { return offlineResponse(opts) })
    );
  } else {
    // Use a cache-first strategy.
    event.respondWith(
      fetchFromCache(event)
        .catch(function() { return fetch(request) })
        .then(function(response) { return addToCache(cacheKey, request, response) })
        .catch(function() { return offlineResponse(resourceType, opts) })
      );
  }
}

self.addEventListener('fetch', function(event) {
  if (shouldHandleFetch(event, config)) {
    onFetch(event, config);
  }
});
