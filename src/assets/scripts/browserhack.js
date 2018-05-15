function BrowserHack () {

  var self = this;

  self.navigator = window.navigator;

  self.userBrowser = self.navigator.userAgent.toLowerCase();

  //**** Chrome hack - body needs to have 100% height for flex to work ****
  self.isChrome = !!window.chrome && !!window.chrome.webstore;

  if (self.isChrome) {
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.body.style.height = "100%";
  }

  //**** Safari hack - Add 'safari-<version>' class to html ****

  self.getSafariVersion = function () {
    console.log('pl', self.navigator.platform, self.userBrowser);
    if (/iP(hone|od|ad)/.test(self.navigator.platform) || self.isSafari()) {
      // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
      var osVersion = (self.navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      if (!osVersion) {
        osVersion = (self.navigator.appVersion).match(/OS X (\d+)_(\d+)_?(\d+)?/);
      }
      console.log('v', osVersion, self.navigator.appVersion);

      var safariVersion = (self.navigator.appVersion).match(/Version\/(\d+).(\d+).?(\d+)?/);

      console.log('safari version', safariVersion);

      if (!!safariVersion && !!safariVersion.length && safariVersion.length >= 3 ) {
        return parseInt(safariVersion[1], 10);
      }

      return parseInt(osVersion[1], 10);
    }
    return -1;
  }

  self.isSafari = function () {
    if (self.userBrowser.indexOf('safari') !== -1) {
      if (self.userBrowser.indexOf('chrome') === -1) {
        return true;
      }
    }
    return false;
  }

  if (self.isSafari()) {
    var htmlTag = document.getElementsByTagName('html');
    var safariVersion = self.getSafariVersion();

    htmlTag[0].classList.add('safari-' + safariVersion);
  }

  //**** IE hack - if less than 9 then redirect to the main site ****

  // if ie, it returns version number, if not returns -1
  self.isIE = function () {
    if (self.userBrowser.indexOf('msie') !== -1 && self.userBrowser.split('msie')[1].indexOf('.') !== -1) {
      var version =  Number(self.userBrowser.split('msie')[1].substring(0, self.userBrowser.split('msie')[1].indexOf('.')));
      return version;
    }
    return -1;
  };

  self.isSupportedBrowser = function () {
    var isIE = self.isIE();
    if (isIE === -1 || isIE >= 10 ) {
      return true;
    }
    return false;
  };


  if (!self.isSupportedBrowser()){
    if (window.confirm('Your browser, Internet Explorer 9 or lower is not supported for Rooms To Go Outlet site, would you like to go to Rooms To Go site?')) {
      window.location.href = 'https://roomstogo.com';
    }
  }

};

var b = new BrowserHack();


