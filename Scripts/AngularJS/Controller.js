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


                $('#myTable3').DataTable();
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


                $('#myTable2').DataTable();
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
            RoleID: "Customer"
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





                swal.fire({
                    title: 'Success!',
                    //text: response.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
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
            body: `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); text-align: center;">
        <div style="background-color: #e74c3c; padding: 20px; border-radius: 8px 8px 0 0;">
            <img src="logo.png" alt="Logo" style="width: 50px; height: 50px;">
        </div>
        <h1 style="color: #333; font-size: 24px;">Email Verification</h1>
        <p style="color: #555; font-size: 16px; margin: 20px 0;">
            Hi User},<br>
            You're almost set to start enjoying Infinity Prints. Simply click the link below to verify your email address and get started. The link expires in 48 hours.
        </p>
        <a href="${url}" style="display: inline-block; padding: 12px 20px; color: #ffffff; background-color: #e74c3c; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold;">
            Verify my email address
        </a>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
        <div style="margin-top: 20px; font-size: 14px; color: #777;">
            800 Broadway Suit 1500 New York, NY 000423, USA<br>
            <a href="#" style="color: #777; text-decoration: none;">Privacy Policy</a> | 
            <a href="#" style="color: #777; text-decoration: none;">Contact Details</a>
        </div>
    </div>
</body>
</html>
` // Body of the email (HTML format)
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
            subject: "Infinity Prints Account Password Change",      // Subject of the email
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





    $scope.RoleID = sessionStorage.getItem("roleID");
    $scope.Name = sessionStorage.getItem("UserName") || "Sign In";


    $scope.RoleEmp = function () {


        return $scope.RoleID === "Employee" || $scope.RoleID === "Owner";

    }
    $scope.RoleEmpCustOnly = function () {


        return $scope.RoleID === "Employee" || $scope.RoleID === "Customer";

    }
    $scope.Customer = function () {

        return $scope.RoleID === "Customer";

    }
    $scope.Owner = function () {


        return $scope.RoleID === "Owner";

    }



    $scope.IfOwner = function (pDATA) {
        return pDATA.RoleID !== "Owner";
    };

    $scope.selectedContent = null; // Initially no content selected

    $scope.editContent = function (DATA) {
        $scope.selectedContent = angular.copy(DATA); // Copy the selected item to edit
        console.log("Edit content")
    };

    $scope.closeContainer2 = function () {
        $scope.selectedContent = null; // Clear selection when closing modal
    };

    $scope.AddContent = function (content) {
        console.log("Updating content:", content);
        // Handle content update here
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
    $scope.Logs = function () {
        window.location.href = "Home/DashLog";
    }
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
    $scope.SignIn = function () {
        window.location.href = "Home/SignIn";
    };
    $scope.Homepage = function () {
        window.location.href = "Home/Homepage";
    };

    $scope.Servicepage = function () {
        window.location.href = "Home/Servicepage";
    };

    $scope.OrderPage = function () {
        window.location.href = "Home/OrderPage";
    };

    $scope.Reviewpage = function () {
        window.location.href = "Home/Reviewpage";
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

    //$scope.previewImage = function (input) {
    //    if (input.files && input.files[0]) {
    //        const reader = new FileReader();

    //        reader.onload = function (e) {
    //            $scope.$apply(function () {
    //                $scope.imageSrc = e.target.result;
    //            });
    //        };

    //        reader.readAsDataURL(input.files[0]); // Read only the first file
    //    }
    //};
    //$scope.previewImage = function (file) {
    //    if (file) {
    //        const reader = new FileReader();

    //        reader.onload = function (e) {
    //            $scope.$apply(function () {
    //                $scope.imageSrc = e.target.result;
    //            });
    //        };

    //        reader.readAsDataURL(file); // Directly read the file
    //    }
    //};

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
                    sessionStorage.setItem("UserName", returnedValue.UserName);

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
                    text: returnedValue.message || 'The email address or password provided does not match any records. Please check your credentials and try again.',
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

    //            console.log(userDataUpdate + " in cont    roller");

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
                var enteredPassword = result.value; // This will get the password entered by the user.
                console.log(enteredPassword)
                // Check if the password field is empty
                if (!enteredPassword) {
                    Swal.fire("Error!", "Password is required.", "error");
                    return; // If no password entered, prevent the rest of the function from running.
                }

                // Call the server to validate the password
                var passwordValidation = IPService.ValidatePassword({
                    userID: pDATA.UserID,  // Or the logged-in user's ID
                    password: enteredPassword
                });

                passwordValidation.then(function (validationResponse) {
                    var validationData = validationResponse.data;
                    console.log(pDATA.FName)
                    if (validationData.success) {
                        // Password is correct, proceed with updating user details
                        var userDataUpdate = {
                            userID: pDATA.UserID,
                            Fname: pDATA.FName,
                            Lname: pDATA.LName,
                            Email: pDATA.Email,
                            UName: pDATA.UName,
                            PhoneNum: pDATA.PhoneNum
                        };

                        console.log(userDataUpdate.userID + userDataUpdate.Fname + " in controller");

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


    $scope.logoutfunc = function () {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Do you really want to log out?',
            showCancelButton: true,
            confirmButtonText: 'Yes, Log out',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Clear session storage and redirect to Signin page if confirmed
                sessionStorage.clear();
                window.location.href = 'Home/Signin';
            } else {
                // If canceled, do nothing and simply close the modal
                Swal.fire('Cancelled', 'You are still logged in!', 'info');
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


    //$scope.DeleteUser = function (pDATA) {
    //    Swal.fire({
    //        title: "Are you sure?",
    //        text: "You won't be able to revert this!",
    //        icon: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#3085d6",
    //        cancelButtonColor: "#d33",
    //        confirmButtonText: "Yes, delete it!",
    //        cancelButtonText: "Cancel"
    //    }).then((result) => {
    //        if (result.isConfirmed) {
    //            console.log(pDATA);
    //            var postData = IPService.DeleteUser(pDATA);

    //            postData.then(function (response) {
    //                var result = response.data;

    //                if (result.success) {
    //                    Swal.fire({
    //                        title: "Deleted!",
    //                        text: "User has been deleted successfully.",
    //                        icon: "success",
    //                        confirmButtonText: "OK"
    //                    }).then(() => {
    //                        location.reload();
    //                    });
    //                } else {
    //                    Swal.fire({
    //                        title: "Error!",
    //                        text: "Error deleting user: " + result.message,
    //                        icon: "error",
    //                        confirmButtonText: "OK"
    //                    });
    //                }
    //            }, function (error) {
    //                console.error("Error deleting user: ", error);
    //                Swal.fire("Error!", "An error occurred while deleting.", "error");
    //            });
    //        }
    //    });
    //};







    $scope.AddService = function () {

        var ServiceDataAdd = {
            ServiceName: $scope.ServiceName,
            Description: $scope.ServiceDesc,
            Material: $scope.ServiceMat,

            ImagePath: "default/image/path",
        };

        function UploadFile(file) {


            return new Promise(function (resolve, reject) {
                if (file) {
                    console.log("File selected for upload:", file.name);
                    console.log("File size:", file.size);
                    console.log("File type:", file.type);

                    // Call the service to upload the file and get the filename back
                    IPService.uploadFile(file).then(function (fileName) {
                        console.log("Upload success. File name:", fileName);

                        // Update the ServiceDataAdd with the received filename
                        ServiceDataAdd.ImagePath = "/Content/images/Services/" + fileName;

                        // Resolve with the updated data
                        resolve(fileName);
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
                        text: 'Service added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 2000,
                    });
                }).catch(function (error) {
                    console.error("Failed to add tour:", error);
                    swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong while adding the service.',
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


    $scope.AddSizes = function () {

        var SizesDataAdd = {
            SizeName: $scope.SizeName,
            Price: $scope.Price,
        };


        console.log("Size Data to be added:", SizesDataAdd);

        if ($scope.file) {
            UploadFile($scope.file).then(function (uploadResponse) {

                var postData = IPService.InsertSizes(SizesDataAdd);

                postData.then(function (ReturnedData) {
                    var response = ReturnedData.data;
                    console.log(response);
                    swal.fire({
                        title: 'Success!',
                        text: 'Service added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 2000,
                    });
                }).catch(function (error) {
                    console.error("Failed to add tour:", error);
                    swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong while adding the service.',
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
            var postData = IPService.InsertSizes(SizesDataAdd);

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




    $scope.previewImage = function (file) {




        if (file) {

            console.log("previewImage called with file:", file);

            const reader = new FileReader();

            reader.onload = function (e) {
                console.log("FileReader result:", e.target.result);

                // Ensure Angular's digest cycle is triggered to update the view
                $scope.$apply(function () {
                    $scope.imageSrc = e.target.result; // Update the image source
                });
            };
            reader.onerror = function (error) {
                console.error("FileReader error:", error);
            };
            reader.readAsDataURL(file); // Directly read the file as data URL
        }
    }


    $scope.AddContent = function () {
        var ContentDataAdd = {
            ContName: $scope.ContName,
            Desc: $scope.Desc,
            IMG_Path: "default/image/path", // Default image path
        };



        function UploadFile2(file) {
            console.log("Upload called with file:", file);


            return new Promise(function (resolve, reject) {
                if (file) {
                    console.log("File selected for upload:", file.name);
                    console.log("File size:", file.size);
                    console.log("File type:", file.type);

                    // Call the service to upload the file and get the filename back
                    IPService.uploadFile2(file).then(function (fileName) {
                        console.log("Upload success. File name:", fileName);

                        // Update the ContentDataAdd with the received filename
                        ContentDataAdd.IMG_Path = "/Content/images/Reviews/" + fileName;

                        // Resolve with the updated data
                        resolve(fileName);
                    }).catch(function (error) {
                        console.error("Upload failed:", error);
                        reject(error);
                    });
                } else {
                    reject("No file selected");
                }
            });
        }

        console.log("Tour Data to be added:", ContentDataAdd);

        if ($scope.file) {
            UploadFile2($scope.file).then(function (uploadResponse) {
                // Once the file is uploaded, insert content data into the database
                var postData = IPService.InsertContent(ContentDataAdd);

                postData.then(function (ReturnedData) {
                    var response = ReturnedData.data;
                    console.log(response);
                    swal.fire({
                        title: 'Success!',
                        text: 'Service added successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 2000,
                    });
                }).catch(function (error) {
                    console.error("Failed to add tour:", error);
                    swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong while adding the service.',
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
            // If no file is selected, just insert content data without an image
            var postData = IPService.InsertContent(ContentDataAdd);

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



    //$scope.AddServices = function () {

    //    var ServiceDataAdd = {
    //        ServiceName: $scope.ServiceName,
    //        Material: $scope.ServiceMat,
    //        Description: $scope.ServiceDesc,
    //        ImagePath: "default/image/path",

    //    };



    //    $scope.previewImage = function (file) {



    //        if (file && file[0]) { // Ensure a file is selected
    //            const reader = new FileReader();
    //            reader.onload = function (e) {
    //                $scope.$apply(function () {
    //                    $scope.imageSrc = e.target.result; // Assign the image source
    //                });
    //            };
    //            reader.readAsDataURL(file[0]); // Read the first file
    //        }
    //    };


    //    function UploadFile(file) {

    //        console.log("Upload File Controller");
    //        return new Promise(function (resolve, reject) {
    //            if (file) {
    //                console.log("File selected for upload:", file.name);
    //                console.log("File size:", file.size);
    //                console.log("File type:", file.type);
    //                ServiceDataAdd.ImagePath = "/Content/Services/" + file.name;
    //                IPService.uploadFile(file).then(function (response) {
    //                    console.log("Upload success:", response);
    //                    resolve(response);
    //                }).catch(function (error) {
    //                    console.error("Upload failed:", error);
    //                    reject(error);
    //                });
    //            } else {
    //                reject("No file selected");
    //            }
    //        });
    //    }

    //    console.log("Tour Data to be added:", ServiceDataAdd);

    //    if ($scope.file) {
    //        UploadFile($scope.file).then(function (uploadResponse) {

    //            var postData = IPService.InsertServices(ServiceDataAdd);

    //            postData.then(function (ReturnedData) {
    //                var response = ReturnedData.data;
    //                console.log(response);
    //                swal.fire({
    //                    title: 'Success!',
    //                    text: 'Tour added successfully!',
    //                    icon: 'success',
    //                    confirmButtonText: 'OK',
    //                    timer: 2000,
    //                });
    //            }).catch(function (error) {
    //                console.error("Failed to add tour:", error);
    //                swal.fire({
    //                    title: 'Error!',
    //                    text: 'Something went wrong while adding the tour.',
    //                    icon: 'error',
    //                    confirmButtonText: 'OK',
    //                });
    //            });
    //        }).catch(function (error) {
    //            console.error("File upload failed:", error);
    //            swal.fire({
    //                title: 'Error!',
    //                text: 'Failed to upload the file.',
    //                icon: 'error',
    //                confirmButtonText: 'OK',
    //            });
    //        });
    //    } else {
    //        var postData = IPService.InsertServices(ServiceDataAdd);

    //        postData.then(function (ReturnedData) {
    //            var response = ReturnedData.data;
    //            console.log(response);
    //            swal.fire({
    //                title: 'Success!',
    //                text: 'Tour added successfully!',
    //                icon: 'success',
    //                confirmButtonText: 'OK',
    //                timer: 2000,
    //            });
    //        }).catch(function (error) {
    //            console.error("Failed to add tour:", error);
    //            swal.fire({
    //                title: 'Error!',
    //                text: 'Something went wrong while adding the tour.',
    //                icon: 'error',
    //                confirmButtonText: 'OK',
    //            });
    //        });
    //    }
    //};


    $scope.DeleteServices = function (ServiceData) {
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
                console.log(ServiceData);
                console.log(ServiceData + " controller");

                var postData = {
                    ServiceID: ServiceData.ServiceID
                };

                var postDataPromise = IPService.DeleteServices(postData);

                postDataPromise.then(function (response) {
                    var result = response.data;
                    console.log(result);

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Service has been deleted successfully.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error deleting record: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                });
            }
        });
    };


    $scope.DeleteReviews = function (ContentData) {
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
                console.log(ContentData);
                console.log(ContentData + " controller");

                var postData = {
                    ContID: ContentData.ContID
                };

                var postDataPromise = IPService.DeleteReviews(postData);

                postDataPromise.then(function (response) {
                    var result = response.data;
                    console.log(result);

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Review has been deleted successfully.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error deleting record: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                });
            }
        });
    };

    $scope.DeleteAccounts = function (ContentData) {
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
                console.log(ContentData);
                console.log(ContentData + " controller");

                var postData = {
                    UserID: ContentData.UserID
                };

                var postDataPromise = IPService.DeleteAccounts(postData);

                postDataPromise.then(function (response) {
                    var result = response.data;
                    console.log(result);

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Acccount has been deleted successfully.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error deleting record: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                });
            }
        });
    };

    $scope.DeleteUser = function (dataToDelete) {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete your account. Please enter your password to continue.",
            icon: "warning",
            input: 'password', // Password input field
            inputLabel: 'Password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                var enteredPassword = result.value;

                console.log(enteredPassword)

                // Ensure password is entered
                if (!enteredPassword) {
                    Swal.fire("Error!", "Password is required.", "error");
                    return;
                }

                // Validate password before proceeding
                var passwordValidation = IPService.ValidatePassword({
                    userID: dataToDelete.UserID,
                    password: enteredPassword
                });

                passwordValidation.then(function (validationResponse) {
                    var validationData = validationResponse.data;

                    if (validationData.success) {
                        // Password is correct, proceed with deletion
                        console.log(dataToDelete);
                        var postData = IPService.DeleteUser(dataToDelete);

                        postData.then(function (response) {
                            var result = response.data;

                            if (result.success) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your account has been deleted successfully.",
                                    icon: "success",
                                    confirmButtonText: "OK"
                                }).then(() => {
                                    window.location.href = "Home/Signin";
                                    sessionStorage.clear();
                                });
                            } else {
                                Swal.fire("Error!", "Error deleting user: " + result.message, "error");
                            }
                        }, function (error) {
                            console.error("Error deleting user: ", error);
                            Swal.fire("Error!", "An error occurred while deleting.", "error");
                        });

                    } else {
                        // Incorrect password
                        Swal.fire("Error!", "Incorrect password. Please try again.", "error");
                    }
                }, function (error) {
                    console.error("Error validating password: ", error);
                    Swal.fire("Error!", "An error occurred while validating the password.", "error");
                });
            }
        });
    };











    $scope.DeleteUserAd = function (eDATA, Action) {
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
                console.log(eDATA);
                var postData = IPService.DeleteUserAd(eDATA);

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







    $scope.DeleteServiceEmployee = function (eDATA, action) {
        Swal.fire({
            title: "Are you sure?",
            text: "This request will forwarded to the owner !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, send it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(eDATA);
                var postData = IPService.DeleteServiceEmployee(eDATA, action);

                postData.then(function (response) {
                    var result = response.data;

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Service deletion successfully requested.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error requesting deleting service: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                }, function (error) {
                    console.error("Error deleting services: ", error);
                    Swal.fire("Error!", "An error occurred while deleting.", "error");
                });
            }
        });
    };

    $scope.UpdateServiceEmployee = function (eDATA, action) {
        Swal.fire({
            title: "Are you sure?",
            text: "This request will forwarded to the owner !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, send it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(eDATA);
                var postData = IPService.UpdateServiceEmployee(eDATA, action);

                postData.then(function (response) {
                    var result = response.data;

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Service deletion successfully requested.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error requesting deleting service: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                }, function (error) {
                    console.error("Error deleting services: ", error);
                    Swal.fire("Error!", "An error occurred while deleting.", "error");
                });
            }
        });
    };


    $scope.FileQuantity = 1; // Initialize to 1
    $scope.services = [];
    $scope.sizes = [];
    $scope.quantities = [];
    $scope.files = [];


    $scope.getNumber = function (num) {
        return new Array(parseInt(num) || 0);
    };

    $scope.filteredSizes = [];


    $scope.updateContainers = function () {
        console.log("File quantity updated to:", $scope.FileQuantity);

        let quantity = parseInt($scope.FileQuantity) || 1;

        $scope.files = new Array(quantity).fill(null);
        $scope.services = new Array(quantity).fill(null);
        $scope.sizes = new Array(quantity).fill(null);
        $scope.quantities = new Array(quantity).fill(null);

        // Initialize filteredSizes array.  This is CRUCIAL and must be done here.
        $scope.filteredSizes = new Array(quantity);

        // Ensure ServicesData exists before updating bindings AND initializing filteredSizes
        if (!$scope.ServicesData || !$scope.ServicesData.length) {
            console.warn("ServicesData is empty or not yet loaded.");

            return;
        }

        // Now that ServicesData is available, you can safely initialize filteredSizes:
        for (let i = 0; i < quantity; i++) {
            $scope.filteredSizes[i] = []; // Initialize each element of filteredSizes to an empty array
        }
    };


    $scope.updateSizes = function (index) {
        var selectedServiceID = $scope.services[index].ServiceID;

        // Filter sizes based on the selected service
        $scope.filteredSizes[index] = $scope.SizesData.filter(function (size) {
            return size.ServiceID === selectedServiceID; // Only sizes for the selected service
        });
    };


    $scope.DeleteReviewsEmployee = function (eDATA, action) {
        Swal.fire({
            title: "Are you sure?",
            text: "This request will forwarded to the owner !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, send it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(eDATA);
                var postData = IPService.DeleteReviewEmployee(eDATA, action);

                postData.then(function (response) {
                    var result = response.data;

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Reviews deletion successfully requested.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error requesting deleting service: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                }, function (error) {
                    console.error("Error deleting reviews: ", error);
                    Swal.fire("Error!", "An error occurred while deleting.", "error");
                });
            }
        });
    };



    $scope.ServicesData = [];
    $scope.selectedService = {};
    $scope.imageSrc = '';

    // Load services
    $scope.loadServices = function () {
        Service.getServices().then(function (response) {
            $scope.ServicesData = response.data;
        });
    };

    // Open update service form
    $scope.openUpdateService = function (service) {
        $scope.selectedService = angular.copy(service);
        $scope.imageSrc = service.ImagePath;
        document.querySelector('.update-container').style.display = 'block';
    };

    // Update service
    $scope.updateService = function (service) {
        Service.updateService(service).then(function (response) {
            if (response.data.success) {
                $scope.loadServices();
                closeUpdateService();
            }
        });
    };

    // Upload file for update
    $scope.updateUploadFile = function (file) {
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.imageSrc = e.target.result;
                    $scope.selectedService.ImagePath = e.target.result;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Check if user is an employee
    $scope.RoleEmp = function () {
        // Implement role check logic here
        return true; // Placeholder
    };

    // Delete service
    $scope.DeleteServiceEmployee = function (service, confirm) {
        if (confirm) {
            Service.deleteService(service.ServiceID).then(function (response) {
                if (response.data.success) {
                    $scope.loadServices();
                }
            });
        }
    };



})