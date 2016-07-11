angular.module('app')
    .controller('DataController', function($scope, $http, $location, $route, $window) {
        var _this = this;
        this.process = "ko";

        /** @brief set process variable for the time between the sendSettings and getData functions
         @param no param
         @return no return */
        this.setProcess = function (){
            $scope.data.process = 'ok';
        };

        /** @brief set all data in the datas variable for display this in data page html
         @param no param
         @return set datas variable*/
        this.getData =function(){
            $http.get('/api/Data',$scope.main.user2)
                .then(function (res) {
                    _this.datas = res.data;
                });
        };
        if($scope.main.user != undefined){
            this.getData();
        }

        /** @brief recovered the data and save it in dbb
         @param object img : image recovered of the c server
         @return redirect to data.html */
        this.sendData = function(img){
            this.data = {};
            var date = new Date();
            this.data.created = date.toUTCString();
            this.data.idUser = $scope.main.user._id;
            this.data.images = img;
            $http.post('/api/sendData', this.data);
            $location.path('/users/data')
        };

        /** @brief recovered the settings from the settings page html and send it on the c server
         @param object settings : all the parameters entered by the user or set it by default
         @return no return */
        this.sendSettings = function(){
            if(!this.settings.nbr_img){
                this.settings.nbr_img = 1;
            }

            if(!this.settings.length_ramp){
                this.settings.length_ramp = 100;
            }

            if(!this.settings.position_ramp){
                this.settings.position_ramp = 0;
            }

            if(!this.settings.nbrPix){
                this.settings.nbrPix = 2049;
            }

            if(!this.settings.decimation){
                this.settings.decimation = 1;
            }

            $http.post('/api/sendSettings', this.settings);
            $http.get('/api/receive').then(function(res){
                $scope.data.sendData(res.data)
            })
        };

        /** @brief download image request in the client user
         @param object datum : image request
         @return no return */
        this.sendImages = function(datum){
            $http.get('/api/'+ datum._id + '/sendImages', datum).then(
                $window.open("http://92.243.29.92:3700/images/"+datum._id)
            ).then($route.reload())};
	
        /** @brief delete data
         @param string id : image._id
         @return no return */
        this.removedata = function(id) {
            $http.delete('/api/data/' + id);
            $route.reload();
        };
    });
