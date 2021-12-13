const resource = [

  /* --- CSS --- */
  '/ludacirs.github.io/assets/css/style.css',

  /* --- JavaScripts --- */
  
  '/ludacirs.github.io/assets/js/dist/home.min.js',
  '/ludacirs.github.io/assets/js/dist/page.min.js',
  '/ludacirs.github.io/assets/js/dist/post.min.js',
  '/ludacirs.github.io/assets/js/dist/categories.min.js',
  '/ludacirs.github.io/assets/js/data/search.json',
  '/ludacirs.github.io/app.js',
  '/ludacirs.github.io/sw.js',

  /* --- HTML --- */
  '/ludacirs.github.io/index.html',
  '/ludacirs.github.io/404.html',
  
    '/ludacirs.github.io/categories/',
  
    '/ludacirs.github.io/tags/',
  
    '/ludacirs.github.io/archives/',
  
    '/ludacirs.github.io/about/',
  

  /* --- Favicons --- */
  

  '/ludacirs.github.io/assets/img/favicons/android-chrome-192x192.png',
  '/ludacirs.github.io/assets/img/favicons/android-chrome-512x512.png',
  '/ludacirs.github.io/assets/img/favicons/apple-touch-icon.png',
  '/ludacirs.github.io/assets/img/favicons/favicon-16x16.png',
  '/ludacirs.github.io/assets/img/favicons/favicon-32x32.png',
  '/ludacirs.github.io/assets/img/favicons/favicon.ico',
  '/ludacirs.github.io/assets/img/favicons/mstile-150x150.png',
  '/ludacirs.github.io/assets/img/favicons/site.webmanifest',
  '/ludacirs.github.io/assets/img/favicons/browserconfig.xml'

];

/* The request url with below domain will be cached */
const allowedDomains = [
  

  'localhost:4000',

  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'cdn.jsdelivr.net',
  'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [
  
];

