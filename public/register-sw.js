// Register service worker
  if ('serviceWorker' in navigator) {
      console.log('Service worker registration in progress...');
      navigator.serviceWorker.register('/service-worker.js').then(function() {
          console.log('Service worker registration complete.');
      }).catch(function(){
          console.log('Service worker registration failed.');
      })
    } else {
      console.log('Service worker is not supported.');
  };
