app.service("IPService", function ($http, $q, Upload) {

    console.log("Service")

    this.LoadServices = function () {
        return $http.get("Home/LoadServices");
    }

    this.LoadUsers = function () {
        return $http.get("Home/LoadUsers");
    }

    this.LoadContents = function () {
        return $http.get("Home/LoadContents");
    }
    this.LoadStatus = function () {
        return $http.get("Home/LoadStatus");
    }
    this.LoadReceipts = function () {
        return $http.get("Home/LoadReceipts");
    }
    this.LoadSizes = function () {
        return $http.get("Home/LoadSizes");
    }
    this.LoadLogs = function () {
        return $http.get("Home/LoadLogs");
    }
    this.LoadOrders = function () {
        return $http.get("Home/LoadOrders");
    }
    this.LoadPayments = function () {
        return $http.get("Home/LoadPayments");
    }

    this.loadChartService = function () {
        return $http.get("/Home/LoadChart");
    }

    this.InsertServices = function (ServiceDataAdd) {

        console.log(ServiceDataAdd + "Service")
        var Insert = $http({
            method: "post",
            url: "Home/InsertServices",
            data: {
                ServiceDataAdd
            }


        });

        return Insert;
    };

    this.InsertSizes = function (SizesDataAdd) {

        console.log(SizesDataAdd + "Size")
        var Insert = $http({
            method: "post",
            url: "Home/InsertSizes",
            data: {
                SizesDataAdd
            }


        });

        return Insert;
    };

    this.InsertContent = function (ContentDataAdd) {

        console.log(ContentDataAdd + "Review")
        var Insert = $http({
            method: "post",
            url: "Home/InsertContent",
            data: {
                ContentDataAdd
            }


        });

        return Insert;
    };

    this.SendEmailCP = function (emailData) {
        console.log(emailData);

        console.log(emailData + " Service");
        var SendEmail = $http({
            method: "post",
            url: "Home/LoadUserCP",
            data: { SendEmail: emailData.Email, }

        });

        return SendEmail;
    };
    this.EncryptID = function (UserID) {
        // Send a POST request with the UserID to the backend
        return $http.post('/Home/EncryptID', { userID: UserID });
    };

    this.SendEmail = function (emailData) {
        console.log(emailData);

        console.log(emailData + " Service");
        var SendEmail = $http({
            method: "post",
            url: "Home/SendEmailVerification",
            data: {
                emailData: emailData,
            }
        });

        return SendEmail;
    };

    this.InsertRegistration = function (RegData) {
        console.log(RegData)

        console.log(RegData + "Service")
        var Insert = $http({
            method: "post",
            url: "Home/InsertRegistration",
            data: {
                RegData: RegData,
                // userID: sessionStorage.getItem("userID")

            }

        });

        return Insert;
    };

    this.ChangePassword = function (RegData) {
        console.log(RegData)

        console.log(RegData + "Service")
        var Insert = $http({
            method: "post",
            url: "Home/UpdatePassword",
            data: {
                RegData: RegData,
                // userID: sessionStorage.getItem("userID")

            }

        });

        return Insert;
    };



    this.loginfunc = function (loginData) {

        console.log(loginData + "Service");
        var response = $http({
            method: "post",
            url: "Home/ValidateLogin",
            data: {
                loginData, userID: sessionStorage.getItem("userID")
            }

        });

        return response;

    };

    this.ConfirmEmail = function (userID) {
        console.log("Confirming email for userID:", userID);

        var Confirm = $http({
            method: "post",
            url: "/Home/ActivateUser",  // Full URL path for the controller action
            data: { userID: userID }  // Use an object to send data
        });

        return Confirm;
    };



    this.UpdateSelf = function (userDataUpdate) {

        console.log(userDataUpdate.userID + userDataUpdate.Fname + "Service")
        var Insert = $http({
            method: "post",
            url: "Home/UpdateSelf",
            data: {
                userDataUpdate
            }


        });

        return Insert;
    };




    this.UpdateUser = function (userDataUpdate) {

        console.log(userDataUpdate + "Service")
        var Insert = $http({
            method: "post",
            url: "Home/UpdateUser",
            data: {
                userDataUpdate
            }


        });

        return Insert;
    };



    this.ValidatePassword = function (passwordData) {
        return $http({
            method: "POST",
            url: "Home/ValidatePassword",
            data: passwordData
        });
    };

    this.DeleteUser = function (dataToDelete) {
        var Delete = $http({
            method: "post",
            url: "Home/DeleteUser",
            data: {
                dataToDelete
            }
        });

        return Delete;

    };

    this.DeleteUserAd = function (dataToDelete) {
        var Delete = $http({
            method: "post",
            url: "Home/DeleteUserAd",
            data: {
                dataToDelete,
            }
        });

        return Delete;

    };








    this.uploadFile = function (file) {
        var deferred = $q.defer();

        var formData = new FormData();
        formData.append('file', file);
        console.log("File being sent:", file.name);

        $http.post('Home/Upload', formData, {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        })
            .then(function (response) {
                if (response.data.success) {
                    console.log("Upload success:", response);
                    // Resolve the promise with the filename returned from the server
                    deferred.resolve(response.data.fileName);
                } else {
                    console.error("Upload failed:", response);
                    deferred.reject(response.data.message);
                }
            })
            .catch(function (error) {
                console.error("Upload error:", error);
                deferred.reject(error);
            });

        console.log("upload service return");
        return deferred.promise;
    };

    this.uploadFile2 = function (file) {
        var deferred = $q.defer();

        var formData = new FormData();
        formData.append('file', file);
        console.log("File being sent:", file.name);

        $http.post('Home/Upload2', formData, {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        })
            .then(function (response) {
                if (response.data.success) {
                    console.log("Upload success:", response);
                    // Resolve the promise with the filename returned from the server
                    deferred.resolve(response.data.fileName);
                } else {
                    console.error("Upload failed:", response);
                    deferred.reject(response.data.message);
                }
            })
            .catch(function (error) {
                console.error("Upload error:", error);
                deferred.reject(error);
            });

        console.log("upload service return");
        return deferred.promise;
    };


    this.DeleteUser = function (dataToDelete) {
        var Delete = $http({
            method: "post",
            url: "Home/DeleteUser",
            data: {
                dataToDelete, //userID: sessionStorage.getItem("userID")
            }
        });

        return Delete;

    };

    this.DeleteServiceEmployee = function (dataToDelete, action) {
        var Delete = $http({
            method: "post",
            url: "Home/DeleteServiceEmployee",
            data: {
                dataToDelete, action
            }
        });

        return Delete;

    };

    this.UpdateServiceEmployee = function (dataToUpdate, action) {
        var Update = $http({
            method: "post",
            url: "Home/UpdateServiceEmployee",
            data: {
                dataToUpdate, action
            }
        });

        return Delete;

    };

    this.DeleteReviewEmployee = function (dataToDelete, action) {
        var Delete = $http({
            method: "post",
            url: "Home/DeleteReviewEmployee",
            data: {
                dataToDelete,
                action//userID: sessionStorage.getItem("userID")
            }
        });

        return Delete;

    };



    this.updateService = function(service) {
        return $http.post('/Home/UpdateService', service);
    },


    this.DeleteServices = function (dataToDelete) {
        console.log(dataToDelete + " Service");
        var Delete = $http({
            method: "post",
            url: "Home/DeleteServices",
            data: {
                dataToDelete
            }
        });

        return Delete;
    };


    this.DeleteReviews = function (dataToDelete) {
        console.log(dataToDelete + " Service");
        var Delete = $http({
            method: "post",
            url: "Home/DeleteReviews",
            data: {
                dataToDelete
            }
        });

        return Delete;
    };

    this.DeleteAccounts = function (dataToDelete) {
        console.log(dataToDelete + " Service");
        var Delete = $http({
            method: "post",
            url: "Home/DeleteAccounts",
            data: {
                dataToDelete
            }
        });

        return Delete;
    };


})