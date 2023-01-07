var app = angular.module('app', ['angularMoment']);
app.controller('controller', function($scope, $http, $location) {

  $scope.page = $location.search().page || 'https://www.connsulting.io/blog';
  $scope.query = $location.search().query || '.blog-basic-grid--text';
  $scope.titleQuery = $location.search().titleQuery || '.blog-title';
  $scope.descriptionQuery = $location.search().descriptionQuery || '.blog-excerpt';
  $scope.dateQuery = $location.search().dateQuery || '.blog-date';
  $scope.linkQuery = $location.search().linkQuery || '.blog-title a';

  $scope.fetchFeed = function() {
    $scope.loading = true;
    $scope.error = false;
    var baseUrl = window.location.origin + window.location.pathname.replace(/\/+$/, '');
    $http({
      url: baseUrl + '/rss',
      params: {
        page: $scope.page,
        query: $scope.query,
        titleQuery: $scope.titleQuery,
        descriptionQuery: $scope.descriptionQuery,
        dateQuery: $scope.dateQuery,
        linkQuery: $scope.linkQuery
      },
      transformResponse: function(data) {
        return new X2JS().xml_str2json(data);
      }
    }).then(({data, status, headers, config}) => {
      if (!Array.isArray(data.rss.channel.item)) {
        data.rss.channel.item = [data.rss.channel.item];
      }
      $scope.feed = data.rss.channel;
      var queryParams = Object.keys(config.params || {}).reduce((array, key) => {
        if (config.params[key]) {
          array.push(key + '=' + encodeURIComponent(config.params[key]));
        }
        return array;
      }, []);
      $scope.url = config.url + (queryParams.length > 0 ? '?' + queryParams.join('&') : '');
      $scope.loading = false;
      $location.search({
        page: $scope.page,
        query: $scope.query,
        titleQuery: $scope.titleQuery,
        descriptionQuery: $scope.descriptionQuery,
        dateQuery: $scope.dateQuery,
        linkQuery: $scope.linkQuery
      })
    }).catch(error => {
      $scope.loading = false;
      $scope.error = true;
    });
  };

  $scope.fetchFeed();
});
