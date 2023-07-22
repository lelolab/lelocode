'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "98c1cbd16b0710d5e4d267a4f2c89c44",
"assets/AssetManifest.json": "40129c8c9c8984c47f6e6d9811555668",
"assets/assets/icons/logo.png": "6fe1750e0ed0fc16641626168163add1",
"assets/assets/images/1.jpg": "e168c6987317ce7c41f957b7604b7f50",
"assets/assets/images/111.jpg": "d5eb8241e2d40598aa2426f90e30e53f",
"assets/assets/images/12.jpg": "a47b51897c2177a9c6fc4cf36d7a4f9d",
"assets/assets/images/13.jpg": "68d0fad8f4aa941236c28a26683b4db1",
"assets/assets/images/14.jpg": "cb45033baff0dd15e504fdbfa1ad76b0",
"assets/assets/images/2.jpg": "d074b7267efd2d345736826a075aadfb",
"assets/assets/images/222.jpg": "fc8192fbc3821304ec6a776d69dbb378",
"assets/assets/images/3.jpg": "4145a7a67be93364c99d1f97580c645a",
"assets/assets/images/33.jpg": "3817ea438f6205b2184dfdb4523bd35f",
"assets/assets/images/4.jpg": "e09eca91d01963c87ada44f7a1fc3e43",
"assets/assets/images/444.jpg": "9b4af38e4a440936546452425e8e016d",
"assets/assets/images/5.jpg": "f641c86fd87ec69d7b43fbd28a77964e",
"assets/assets/images/50.jpg": "9fcbcfbe1272465317952930febc3aee",
"assets/assets/images/555.jpg": "341642f8c1f3505cfbfaa6980b11ada0",
"assets/assets/images/bienvenu.jpg": "08dbe3f2f6f9a335e052a08add603036",
"assets/assets/images/cm.png": "8b27e4ada4b67397143ea9700cc75b02",
"assets/assets/images/cm2.png": "fddad0cab9b90fc78536f2990bc12d33",
"assets/assets/images/commentaire.jpg": "c43a4ff178e82a605cb2b22c76a17f07",
"assets/assets/images/comminuty.jpg": "6c3912ffa5e93ddcb6aac6a70f8b1937",
"assets/assets/images/dev.png": "1b3c48f32b2ed28e62d08a2945e1c80c",
"assets/assets/images/grace.jpg": "1540d8f48a0c214fc200b4c49377e68b",
"assets/assets/images/lelo.png": "9892af22fda6f9cd862b9042f6695e48",
"assets/assets/images/lelolab.png": "bead91ccbb074412ffc04cb1933e95a2",
"assets/assets/images/machine.png": "d2cca2998c65c4e68303709313f2051a",
"assets/assets/images/maurice.jpg": "657fc34727f88e3a0b4dd54d09c8d832",
"assets/assets/images/mobile.png": "114217d257a465d2b6418d3ea105e709",
"assets/assets/images/momo.png": "aff5cfb9c54ebd4926928ac493fa0552",
"assets/assets/images/web.png": "f6e54d53710dcf3b62e35925800f0d9c",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4d62795234bd21fcc48a8ccc830a8d7a",
"assets/NOTICES": "7202ad7315a0fd821b987e30384f4d9a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "0309ea1a2af466f382c5a6d1e1fcc6f2",
"/": "0309ea1a2af466f382c5a6d1e1fcc6f2",
"main.dart.js": "4f538ce76ab8738f7f720e345eb7f40d",
"manifest.json": "525aa01837691393fc4c32da4698be51",
"version.json": "22e7239ea2317fffbc320b45db10896c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
