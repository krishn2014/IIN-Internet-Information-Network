/**
 * iin.controllers Module
 *
 * Description
 */
angular.module( 'iin.controllers', [ 'iin.services' ] )
    .controller( 'ChannelsCtrl', function( $scope, $ionicLoading, ChannelService, ContactsService ) {
        $ionicLoading.show();
        ChannelService.find()
            .error( function() {
                $ionicLoading.hide();
            } )
            .success( function( data ) {
                $scope.channels = data.channels;
                $ionicLoading.hide();

            } );
        $scope.logout = function() {
            window.plugins.googleplus.disconnect();
        };
        $scope.invite = function() {
            ContactsService.post();

        };
    } )
    .controller( 'ChannelCtrl', function( $scope, $stateParams, $ionicLoading, PlaylistService, VideoService ) {
        $ionicLoading.show();
        $scope.title = $stateParams.title;
        PlaylistService.find( $stateParams.id )
            .error( function() {
                $ionicLoading.hide();
            } )
            .success( function( data ) {
                $ionicLoading.hide();
                $scope.playlists = data.playlists;
                if ( data.playlists.length === 0 ) {
                    VideoService.find( $stateParams.id )
                        .error( function() {
                            $ionicLoading.hide();
                        } )
                        .success( function( data ) {
                            $ionicLoading.hide();
                            $scope.videos = data.videos;

                        } );
                }
            } );

    } ).controller( 'VideoCtrl', function( $scope, $stateParams, $ionicLoading, VideoService ) {
        $ionicLoading.show();
        VideoService.findOne( $stateParams.id )
            .error( function() {
                $ionicLoading.hide();
            } )
            .success( function( data ) {
                data.video.embedUrl = data.video.embedUrl || 'https://www.youtube.com/embed/' + data.video.vid + '?rel=0';
                $ionicLoading.hide();
                $scope.video = data.video;
            } );
    } ).controller( 'PlaylistCtrl', function( $scope, $stateParams, $ionicLoading, PlaylistService ) {
        $ionicLoading.show();
        $scope.title = $stateParams.title;

        PlaylistService.getVideos( $stateParams.id )
            .error( function() {
                $ionicLoading.hide();
            } )
            .success( function( data ) {
                // data.video.embedUrl = data.video.embedUrl || 'https://www.youtube.com/embed/' + data.video.id + '?rel=0';
                $ionicLoading.hide();
                $scope.videos = data.videos;
            } );
    } );

angular.module( 'iin.filters', [] )
    .filter( 'trusted', [ '$sce', function( $sce ) {
        return function( url ) {
            return $sce.trustAsResourceUrl( url );
        };
    } ] );

angular.module( 'iin.services', [] )
    .service( 'ChannelService', function( appConfig, $http ) {
        this.find = function() {
            return $http.get( appConfig.API_URL + 'channels' );
        };
    } )
    .service( 'VideoService', function( appConfig, $http ) {
        this.find = function( channel_id ) {
            return $http.get( appConfig.API_URL + 'videos?channel=' + channel_id );
        };
        this.findOne = function( video_id ) {
            return $http.get( appConfig.API_URL + 'videos/' + video_id );
        };
    } )
    .service( 'PlaylistService', function( appConfig, $http ) {
        this.find = function( channel_id ) {
            return $http.get( appConfig.API_URL + 'playlists?channel=' + channel_id );
        };
        this.findOne = function( playlistID ) {
            return $http.get( appConfig.API_URL + 'playlists/' + playlistID );
        };
        this.getVideos = function( playlistID ) {
            return $http.get( appConfig.API_URL + 'videos?playlist=' + playlistID );
        };
    } )
    .service( 'ContactsService', function( appConfig, $http, $cordovaSocialSharing ) {
        this.post = function() {
            var message = 'Download IIN - Internet Information Network App For Free.',
                subject = 'Download IIN',
                file = null,
                link = 'http://iinselfedu.com/';
            $cordovaSocialSharing
                .share( message, subject, file, link ) // Share via native share sheet
                .then( function( result ) {
                    // Success!
                }, function( err ) {
                    // An error occured. Show a message to the user
                } );
        };
    } );
