const CACHE_NAME = 'brainrat-v1.2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './main brain.js',
        './assets/BtnPause.png',
        './assets/RemoveFruitBtn.png',
        './assets/UpgradeBtn.png',
        './assets/CloseBtn.png',
        './assets/WatchAdBtn.png',
        './assets/MusicOnBtn.png',
        './assets/RetryBtn.png',
        './assets/MergeCycle1.png',
        './assets/background.png',
        './assets/Bucket.png',
        './assets/ScoreSpot.png',
        './assets/NextSpot.png',
        './assets/Popup.png',
        './assets/SmallPopup.png',
        './assets/InfoSpot.png',
        './assets/CountSpot.png',
        './assets/DropLine.png',
        './assets/TutorialBtn.png',
        './assets/BackBtn.png',
        './assets/NextBtn.png',
        './assets/Animation.gif'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Always fetch from network first for versioned files and HTML
  if (event.request.url.includes('?v=') || 
      event.request.url.includes('index.html') || 
      event.request.url.includes('style.css') || 
      event.request.url.includes('main brain.js')) {
    
    event.respondWith(
      fetch(event.request).then(function(response) {
        // If fetch succeeds, update cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function() {
        // If fetch fails, try cache
        return caches.match(event.request);
      })
    );
  } else {
    // For other files, use cache first strategy
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

// Clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Add message listener for cache clearing
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    });
  }
});
