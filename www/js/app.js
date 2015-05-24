// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module( 'iin', [ 'ionic', 'iin.controllers', 'iin.filters', 'ngCordova' ] )

.run( function( $ionicPlatform ) {

        $ionicPlatform.ready( function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if ( window.cordova && window.cordova.plugins.Keyboard ) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
            }
            if ( window.StatusBar ) {
                StatusBar.styleDefault();
            }
            if (  window.AdMob ) {
                // var admob_key = device.platform == "Android" ? "ANDROID_PUBLISHER_KEY" : "IOS_PUBLISHER_KEY";
                var bannerID = "ca-app-pub-4163791555615919/4793426186";
                var admob = window.AdMob;
                admob.createBanner( {
                    adId: bannerID,
                    position: AdMob.AD_POSITION.BOTTOM_CENTER,
                    autoShow: true,
                    isTesting: false
                } );
            }
        } );
    } )
    .constant( 'appConfig', {
        'API_URL': 'http://api.iinselfedu.com:3001/'
            // 'API_URL': 'http://127.0.0.1:1340/'
    } )
    .config( function( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise( '/' );
        $stateProvider
            .state( 'app', {
                url: '/',
                templateUrl: "templates/channels.html",
                controller: 'ChannelsCtrl'
            } )
            .state( 'channel', {
                url: '/channels/:title/:id',
                templateUrl: 'templates/channel.html',
                controller: 'ChannelCtrl'
            } )
            .state( 'playlist', {
                url: '/playlists/:title/:id',
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            } )
            .state( 'video', {
                url: '/videos/:id',
                templateUrl: 'templates/video.html',
                controller: 'VideoCtrl'
            } );
    } );
