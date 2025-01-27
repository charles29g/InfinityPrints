app.controller("IPController", function ($scope, $location, IPService, $window, $element, $interval) {

    $scope.emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    console.log("Controller")
    $scope.loadServices = function () {
        var getData = IPService.LoadServices();
        getData.then(function (ReturnedData) {
            $scope.ServicesData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };


    $scope.loadUsers = function () {
        var getData = IPService.LoadUsers();
        getData.then(function (ReturnedData) {
            $scope.UsersData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };

    $scope.loadContents = function () {
        var getData = IPService.LoadContents();
        getData.then(function (ReturnedData) {
            $scope.ContentsData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };

    $scope.loadStatus = function () {
        var getData = IPService.LoadStatus();
        getData.then(function (ReturnedData) {
            $scope.StatusData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };

    $scope.loadReceipts = function () {
        var getData = IPService.LoadReceipts();
        getData.then(function (ReturnedData) {
            $scope.ReceiptsData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };

    $scope.loadSizes = function () {
        var getData = IPService.LoadSizes();
        getData.then(function (ReturnedData) {
            $scope.sizesData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };


    $scope.loadLogs = function () {
        var getData = IPService.LoadLogs();
        getData.then(function (ReturnedData) {
            $scope.LogsData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };
    $scope.loadOrders = function () {
        var getData = IPService.LoadOrders();
        getData.then(function (ReturnedData) {
            $scope.OrdersData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };

    $scope.loadPayments = function () {
        var getData = IPService.LoadPayments();
        getData.then(function (ReturnedData) {
            $scope.PaymentsData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };



    $scope.InsertReg = function () {
        var RegData = {
            FName: $scope.firstName,
            LName: $scope.lastName,
            Email: $scope.email2,
            UName: $scope.username,
            PhoneNum: $scope.phone,
            Password: $scope.password2,
            RoleID: 1
        };
        console.log(RegData + " controller");

        var postData = IPService.InsertRegistration(RegData);

        postData.then(function (ReturnedData) {
            var response = ReturnedData.data;
            console.log("Full response:", ReturnedData);
            console.log("Response Success:", response.success);
            console.log("Response Message:", response.message);

            if (response.success) {
                var userId = response.userId;
                var Email = $scope.email2;
                console.log("UserID created: ", userId);

                // Encrypt the userId using AES before passing it



                swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // Call SendEmail with the encryptedUserId
                    $scope.sendEmail(userId, Email);
                });
            } else {
                swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }).catch(function (error) {
            console.log("Error occurred:", error);
            swal.fire({
                title: 'Error!',
                text: 'An error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };

    //Activate Email send
    $scope.sendEmail = function (encryptedUserId, email) {
        // Construct the URL with the encrypted userID
        var url = `https://localhost:44395/Home/ConfirmationPage?userID=${encryptedUserId}`;

        var emailData = {
            toEmail: email,  // Target email address
            subject: "Infinity Prints Account Activation",      // Subject of the email
            body: `<h1>Infinity Prints</h1><p>Please click the <a href="${url}">link</a> to activate your account</p>` // Body of the email (HTML format)
        };

        var sendEmailRequest = IPService.SendEmail(emailData);
        sendEmailRequest.then(function (response) {
            console.log("Email sent successfully:", response.data);
            swal.fire({
                title: 'Success!',
                text: 'Activation email sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }).catch(function (error) {
            console.error("Error sending email:", error);
            swal.fire({
                title: 'Error!',
                text: 'Error sending activation email.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };




    //input email to change pass
    $scope.GetEmailID = function (encryptedUserId) {
        // Construct the URL with the encrypted userID

        var emailData = {
            Email: $scope.email,  // Target email addressSS

        };

        var sendEmailRequest = IPService.SendEmailCP(emailData);
        sendEmailRequest.then(function (response) {
            console.log("Email sent successfully:", response.data);

            var Email = response.data.Email;

            var userID = response.data.HashedUserID;

            $scope.sendEmailChangePass(userID, Email);


            swal.fire({
                title: 'Success!',
                text: 'Activation email sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }).catch(function (error) {
            console.error("Error sending email:", error);
            swal.fire({
                title: 'Error!',
                text: 'Error sending activation email.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };

    $scope.EncryptIDAndSend = function (UserID, Email) {
        // Call the EncryptID service to encrypt the UserID
        IPService.EncryptID(UserID).then(function (response) {
            // Once the ID is encrypted, send it to sendEmailChangePass
            var encryptedID = response.data.EncID;
            $scope.sendEmailChangePass(encryptedID, Email); // Call your function with the encrypted ID and email
        }, function (error) {
            console.error("Error encrypting UserID", error);
        });
    };

    //email change pass email send
    $scope.sendEmailChangePass = function (encryptedUserId, email) {
        // Construct the URL with the encrypted userID
        var url = `https://localhost:44395/Home/ForgotPasswordPage?userID=${encryptedUserId}`;

        var emailData = {
            toEmail: email,  // Target email address
            subject: "Infinity Prints Account Password Change ",      // Subject of the email
            body: `<h1>Infinity Prints</h1><p>Please click the <a href="${url}">link</a> to change your account password</p>` // Body of the email (HTML format)
        };

        var sendEmailRequest = IPService.SendEmail(emailData);
        sendEmailRequest.then(function (response) {
            console.log("Email sent successfully:", response.data);
            swal.fire({
                title: 'Success!',
                text: 'Activation email sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }).catch(function (error) {
            console.error("Error sending email:", error);
            swal.fire({
                title: 'Error!',
                text: 'Error sending activation email.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };



    // logic to change password 
    $scope.ChangePassword = function () {
        var params = $location.search(); // gets all query parameters as an object
        $scope.userID = params.userID; //Get 'userID' directly from the URL query string
        var userID = $scope.userID;
        console.log(userID)

        var userID = $scope.userID
        var RegData = {
            Password: $scope.password2,
            UserID: userID


        };
        console.log(RegData + " controller");

        var postData = IPService.ChangePassword(RegData);

        postData.then(function (ReturnedData) {

            var response = ReturnedData.data;
            console.log(response);

            if (response.success) {
                swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {

                    window.location.href = "Home/signin"

                })
            } else {
                swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

        }).catch(function (error) {
            swal.fire({
                title: 'Error!',
                text: 'An error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };









    $scope.DateFormat = function (str) {
        var num = parseInt(str.replace(/[^0-9]/g, ""), 10);
        var date = new Date(num);

        var options = {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        return date.toLocaleString('en-US', options);
    };

    $scope.isModalOpen = false;
    $scope.newStatusName = '';

    // Open Modal
    $scope.openModal = function () {
        $scope.isModalOpen = true;
        console.log("Modal Opened");
    };

    // Close Modal
    $scope.closeModal = function () {
        $scope.isModalOpen = false;
        $scope.newStatusName = ''; // Reset form
        console.log("Modal Closed");
    };



    $scope.password2 = '';
    $scope.confirmPassword = '';
    $scope.showPassword = false;
    $scope.showConfirmPassword = false;
    $scope.email2 = '';




    $scope.Account = function () {
        window.location.href = "Home/DashAccount";
    };

    $scope.Reviews = function () {
        window.location.href = "Home/DashReviews";
    };

    $scope.Service = function () {
        window.location.href = "Home/DashService";
    };

    $scope.Orders = function () {
        window.location.href = "Home/DashOrders";
    };

    $scope.Users = function () {
        window.location.href = "Home/DashUsers";
    };
    $scope.UsersUpdate = function () {
        window.location.href = "Home/DashUsersUpdate";
    };


    $scope.Payment = function () {
        window.location.href = "Home/DashPayment";
    };

    $scope.Chat = function () {
        window.location.href = "Home/DashChat";
    };

    $scope.UserGuide = function () {
        window.location.href = "Home/DashUserGuide";
    };

    $scope.Status = function () {
        window.location.href = "Home/DashStatus";
    };

    $scope.Receipts = function () {
        window.location.href = "Home/DashReceipts";
    };

    $scope.DashAdmin = function () {
        window.location.href = "Home/DashAdmin"
    };
    $scope.Homepage = function () {
        window.location.href = "Home/Homepage";
    };
    $scope.Servicepage = function () {
        window.location.href = "Home/Servicepage";
    };
    $scope.ForgotPassword = function () {
        window.location.href = "Home/ForgotPasswordEmail";
    };



    $scope.confirmEmailFromURL = function () {
        var params = $location.search(); // gets all query parameters as an object
        $scope.userID = params.userID; //Get 'userID' directly from the URL query string
        var userID = $scope.userID
        console.log('Extracted userID:', userID);  // Log the extracted userID

        if (userID) {
            console.log('UserID found:', userID);

            // Call the service to confirm the email
            var sendConfirm = IPService.ConfirmEmail(userID)


            sendConfirm.then(function (response) {
                if (response.data.success) {
                    swal.fire({
                        title: 'Email Confirmed',
                        text: 'Your email has been successfully confirmed.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                } else {
                    swal.fire({
                        title: 'Error',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }).catch(function (error) {
                swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while confirming your email. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        } else {
            swal.fire({
                title: 'Error',
                text: 'Invalid link. No UserID found.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };



    //
    $scope.ChangePasswordEmail = function () {
        var params = $location.search(); // gets all query parameters as an object
        $scope.userID = params.userID; //Get 'userID' directly from the URL query string
        var userID = $scope.userID
        console.log('Extracted userID:', userID);  // Log the extracted userID

        if (userID) {
            console.log('UserID found:', userID);

            // Call the service to confirm the email
            var sendConfirm = IPService.ConfirmEmail(userID)


            sendConfirm.then(function (response) {
                if (response.data.success) {
                    swal.fire({
                        title: 'Email Confirmed',
                        text: 'Your email has been successfully confirmed.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 2000
                    });
                } else {
                    swal.fire({
                        title: 'Error',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }).catch(function (error) {
                swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while confirming your email. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        } else {
            swal.fire({
                title: 'Error',
                text: 'Invalid link. No UserID found.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };







    $scope.UserID = sessionStorage.getItem("UserID") || "No UserID found";

    $scope.imageSrc = null;

    $scope.previewImage = function (input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.imageSrc = e.target.result;
                });
            };

            reader.readAsDataURL(input.files[0]); // Read only the first file
        }
    };

    $scope.loginfunc = function () {
        var loginData = {
            Email: $scope.email,
            Password: $scope.password
        };

        console.log(loginData);

        var getData = IPService.loginfunc(loginData);

        getData.then(function (ReturnedData) {
            var returnedValue = ReturnedData.data;

            if (returnedValue.status == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome to Infinity Prints!',
                    text: 'Hello, ' + returnedValue.FName + '! We are excited to have you onboard.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    sessionStorage.setItem("Name", returnedValue.FName);
                    sessionStorage.setItem("FullName", returnedValue.FullName);
                    sessionStorage.setItem("UserID", returnedValue.UserID);
                    sessionStorage.setItem("roleID", returnedValue.RoleID);

                    if (returnedValue.RoleID === "Customer") {
                        window.location.href = "/Home/Homepage";
                        console.log("Customer")
                    } else {
                        window.location.href = "/Home/DashAdmin";
                        console.log("Employee")
                    }
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'The email address or password provided does not match any records. Please check your credentials and try again.',
                    confirmButtonText: 'OK'
                });
            }
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an issue processing your request. Please try again later.',
                confirmButtonText: 'OK'
            });
        });
    };


    //$scope.updateSelf = function (pDATA) {
    //    Swal.fire({
    //        title: "Are you sure?",
    //        text: "You are about to update your user details.",
    //        icon: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#3085d6",
    //        cancelButtonColor: "#d33",
    //        confirmButtonText: "Yes, update it!",
    //        cancelButtonText: "Cancel"
    //    }).then((result) => {
    //        if (result.isConfirmed) {
    //            var userDataUpdate = {
    //                userID: 44,
    //                Fname: pDATA.FName,
    //                Lname: pDATA.LName,
    //                Email: pDATA.Email,
    //                UName: pDATA.UName,
    //                PhoneNum: pDATA.PhoneNum,


    //            };

    //            console.log(userDataUpdate + " in controller");

    //            var postData = IPService.UpdateSelf(userDataUpdate)

    //            postData.then(function (ReturnedData) {
    //                var response = ReturnedData.data;

    //                console.log(response);
    //                if (response.success) {
    //                    Swal.fire("Updated!", "User details updated successfully.", "success");
    //                } else {
    //                    Swal.fire("Error!", "Error updating user details.", "error");
    //                }
    //            }, function (error) {
    //                console.error('Error updating user: ', error);
    //                Swal.fire("Error!", "An error occurred while updating.", "error");
    //            });
    //        }
    //    });
    //};

    $scope.PhoneNum = function () {
        // Ensure that the phone number exists and doesn't already start with '0'
        if ($scope.pDATA.PhoneNum && !$scope.pDATA.PhoneNum.startsWith('0')) {
            // Add '0' to the beginning of the phone number
            $scope.pDATA.PhoneNum = '0' + $scope.pDATA.PhoneNum;
            // Manually trigger $apply to update the view
            $scope.$apply();
        }
    };


    // Usage Example


    $scope.updateSelf = function (pDATA) {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to update your user details. Please enter your password to continue.",
            icon: "warning",
            input: 'password', // Input type: 'password' will hide the text input.
            inputLabel: 'Password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                const enteredPassword = result.value; // This will get the password entered by the user.

                // Check if the password field is empty
                if (!enteredPassword) {
                    Swal.fire("Error!", "Password is required.", "error");
                    return; // If no password entered, prevent the rest of the function from running.
                }

                // Call the server to validate the password
                var passwordValidation = IPService.ValidatePassword({
                    userID: 44,  // Or the logged-in user's ID
                    password: enteredPassword
                });

                passwordValidation.then(function (validationResponse) {
                    var validationData = validationResponse.data;
                    console.log(pDATA.FName)
                    if (validationData.success) {
                        // Password is correct, proceed with updating user details
                        var userDataUpdate = {
                            userID: 44,
                            Fname: pDATA.FName,
                            Lname: pDATA.LName,
                            Email: pDATA.Email,
                            UName: pDATA.UName,
                            PhoneNum: pDATA.PhoneNum
                        };

                        console.log(userDataUpdate + " in controller");

                        var postData = IPService.UpdateSelf(userDataUpdate);

                        postData.then(function (ReturnedData) {
                            var response = ReturnedData.data;

                            console.log(response);
                            if (response.success) {
                                Swal.fire("Updated!", "User details updated successfully.", "success");
                            } else {
                                Swal.fire("Error!", "Error updating user details.", "error");
                            }
                        }, function (error) {
                            console.error('Error updating user: ', error);
                            Swal.fire("Error!", "An error occurred while updating.", "error");
                        });
                    } else {
                        // Password did not match
                        Swal.fire("Error!", "Incorrect password. Please try again.", "error");
                    }
                }, function (error) {
                    console.error('Error validating password: ', error);
                    Swal.fire("Error!", "An error occurred while validating the password.", "error");
                });
            }
        });
    };


    $scope.updateUser = function (pDATA) {
        var USData = {
            RoleID: pDATA.RoleID,
            UserID: pDATA.UserID
        };

        // Call the service to update the user
        var GetData = IPService.UpdateUser(USData);

        GetData.then(
            function (response) {
                if (response.data.success) {
                    // Show success alert using SweetAlert
                    Swal.fire({
                        title: "Success!",
                        text: "User successfully updated.",
                        icon: "success",
                        confirmButtonText: "OK",
                        timer: 2000, // Auto-close after 2 seconds
                        showConfirmButton: false
                    });
                } else {
                    // Handle failure response
                    Swal.fire({
                        title: "Error!",
                        text: response.data.message || "Failed to update user.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            },
            function (error) {
                // Handle error from the server
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred while updating the user.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        );
    };



    $scope.loadChart = function () {
        var getData = IPService.loadChartService();
        console.log("Controller");
        getData.then(function (ReturnedData) {
            $scope.labels = ReturnedData.data.labels;
            $scope.data = ReturnedData.data.data[0];

            console.log(ReturnedData.data.labels);
            console.log(ReturnedData.data.data[0]);
        });
    };


    //$scope.loadChart = function () {

    //    console.log("Chart")

    //    $scope.labels = ["January", "February", "March", "April"];
    //    $scope.data = [10, 20, 30, 40];
    //    $scope.options = { responsive: true };
    //};


    $scope.DeleteUser = function (pDATA) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(pDATA);
                var postData = IPService.DeleteUser(pDATA);

                postData.then(function (response) {
                    var result = response.data;

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted successfully.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error deleting user: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                }, function (error) {
                    console.error("Error deleting user: ", error);
                    Swal.fire("Error!", "An error occurred while deleting.", "error");
                });
            }
        });
    };












    $scope.AddServices = function () {

        var ServiceDataAdd = {
            ServiceName: $scope.ServiceName,
            Material: $scope.ServiceMat,
            Description: $scope.ServiceDesc,
            ImagePath: "default/image/path",

        };



        $scope.previewImage = function (input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.imageSrc = e.target.result; // Assign the image source
                    });
                };
                reader.readAsDataURL(input.files[0]); // Read the file
            }
        };

        function UploadFile(file) {
            return new Promise(function (resolve, reject) {
                if (file) {
                    console.log("File selected for upload:", file.name);
                    console.log("File size:", file.size);
                    console.log("File type:", file.type);
                    ServiceDataAdd.ImagePath = "/Content/images/Services/" + file.name;
                    IPService.uploadFile(file).then(function (response) {
                        console.log("Upload success:", response);
                        resolve(response);
                    }).catch(function (error) {
                        console.error("Upload failed:", error);
                        reject(error);
                    });
                } else {
                    reject("No file selected");
                }
            });
        }

        console.log("Tour Data to be added:", ServiceDataAdd);

        if ($scope.file) {
            UploadFile($scope.file).then(function (uploadResponse) {

                var postData = IPService.InsertServices(ServiceDataAdd);

                postData.then(function (ReturnedData) {
                    var response = ReturnedData.data;
                    console.log(response);
                    swal.fire({
                        title: 'Success!',
                        text: 'Tour added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 2000,
                    });
                }).catch(function (error) {
                    console.error("Failed to add tour:", error);
                    swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong while adding the tour.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                });
            }).catch(function (error) {
                console.error("File upload failed:", error);
                swal.fire({
                    title: 'Error!',
                    text: 'Failed to upload the file.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
        } else {
            var postData = IPService.InsertServices(ServiceDataAdd);

            postData.then(function (ReturnedData) {
                var response = ReturnedData.data;
                console.log(response);
                swal.fire({
                    title: 'Success!',
                    text: 'Tour added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
            }).catch(function (error) {
                console.error("Failed to add tour:", error);
                swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while adding the tour.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
        }
    };






})