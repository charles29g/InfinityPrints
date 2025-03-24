app.controller("IPController", function ($scope, $location, IPService, $window, $element, $interval) {

    $scope.emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    console.log("Controller")
    $scope.loadServices = function () {
        console.log("Controller services")
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
            console.log("Data returned from LoadContents:", ReturnedData.data); // Debugging
            $scope.ContentsData = ReturnedData.data;
        }).catch(function (error) {
            console.error("Error loading contents:", error); // Debugging
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
            console.log($scope.OrdersData);
            $(document).ready(function () {


                $('#myTable').DataTable();
                $('#manageTable').DataTable();
                $('#completedTable').DataTable();
                $('#myOrdersTable').DataTable();
                $('#lateTable').DataTable();
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
        var role = $scope.RoleID || ""; // Prevent null or undefined errors
        var isAllowed = role === "Employee" || role === "Owner";


        return isAllowed;
    };
    console.log($scope.RoleEmp())


    $scope.RoleEmpCustOnly = function () {


        return $scope.RoleID === "Employee" || $scope.RoleID === "Customer";



    }
    $scope.Customer = function () {

        return $scope.RoleID === "Customer";

    }
    $scope.Owner = function () {


        return $scope.RoleID === "Owner";

    }

    $scope.Employee = function () {

        return $scope.RoleID === "Employee";

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
        if (!str) {
            return "Invalid Date"; // Handle undefined or null input
        }

        // Extract numeric value from the string
        var num = parseInt(str.replace(/[^0-9]/g, ""), 10);
        if (isNaN(num)) {
            return "Invalid Date"; // Handle invalid numeric value
        }

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
    Explanation:

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
        window.location.href = "Home/DashPayments";
    };

    $scope.Chat = function () {
        window.location.href = "Home/DashChat";
    };
    $scope.Logs = function () {
        window.location.href = "Home/DashLogs";
    }
    $scope.UserGuide = function () {
        window.location.href = "Home/DashUserGuide";
    };

    $scope.Status = function () {
        window.location.href = "Home/DashStatus";
    };

    $scope.Receipts = function () {
        window.location.href = "Home/DashReceipt";
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
    $scope.FAQpage = function () {
        window.location.href = "Home/FAQpage";
    };
    $scope.AboutusPage = function () {
        window.location.href = "Home/AboutusPage";
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

                var postData = IPService.InsertServices(ServiceDataAdd, $scope.Name2, $scope.UserID);

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

    $scope.AddPayment = function () {
        // Determine the payment amount based on the payment term
        let paymentAmount;
        if ($scope.selectedOrder.PaymentTerm === 'Fifty') {
            if ($scope.selectedOrder.PaymentStatus === 'Unpaid' || $scope.selectedOrder.PaymentStatus === null) {
                paymentAmount = $scope.selectedOrder.TotalPrice / 2; // First payment (half)
            } else if ($scope.selectedOrder.PaymentStatus === 'Half Paid') {
                paymentAmount = $scope.selectedOrder.TotalPrice / 2; // Second payment (half)
            } else {
                alert('This order is already fully paid.');
                return;
            }
        } else if ($scope.selectedOrder.PaymentTerm === 'FullPayment') {
            paymentAmount = $scope.selectedOrder.TotalPrice; // Full payment
        } else {
            alert('Invalid payment term.');
            return;
        }

        // Prepare the payment data
        var PaymentDataAdd = {
            UserID: $scope.UserID,
            OrderID: $scope.selectedOrder.OrderID,
            ReferenceNo: $scope.paymentData.referenceNumber,
            Amount: paymentAmount, 
            IMG_PayPath: "default/image/path", 
            PaymentStatus: $scope.selectedOrder.PaymentTerm === 'Fifty' ? 'In Progress' : '2nd Payment In Progress' 
        };

        // Check if a file is selected
        if (!$scope.paymentData.file) {
            swal.fire({
                title: 'Error!',
                text: 'Please upload a payment proof.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Upload the file first
        UploadFile5($scope.paymentData.file)
            .then(function (fileName) {
                // Update the payment data with the uploaded file path
                PaymentDataAdd.IMG_PayPath = "/Content/images/Payment/" + fileName;

                // Submit the payment data
                return IPService.InsertPayment(PaymentDataAdd);
            })
            .then(function (response) {
                if (response.data.success) {
                    swal.fire({
                        title: 'Success!',
                        text: 'Payment submitted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        $scope.closePaymentModal(); // Close the modal
                        $scope.loadOrders(); // Refresh the orders table
                    });
                } else {
                    swal.fire({
                        title: 'Error!',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            })
            .catch(function (error) {
                console.error("Error:", error);
                swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while processing the payment.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
        location.reload();
    };

    // File upload function
    function UploadFile5(file) {
        return new Promise(function (resolve, reject) {
            if (file) {
                console.log("File selected for upload:", file.name);

                // Call the service to upload the file
                IPService.uploadFile5(file)
                    .then(function (fileName) {
                        console.log("Upload success. File name:", fileName);
                        resolve(fileName); // Resolve with the file name
                    })
                    .catch(function (error) {
                        console.error("Upload failed:", error);
                        reject(error);
                    });
            } else {
                reject("No file selected");
            }
        });
    }

    $scope.calculateAmountToPay = function () {
        if ($scope.selectedOrder.PaymentTerm === "Fifty") {
            if ($scope.selectedOrder.PaymentStatus === "Unpaid" || $scope.selectedOrder.PaymentStatus === null) {
                // First payment: half of the total amount
                return $scope.selectedOrder.TotalPrice / 2;
            } else if ($scope.selectedOrder.PaymentStatus === "Half Paid") {
                // Second payment: the remaining half
                return $scope.selectedOrder.TotalPrice / 2;
            }
        } else if ($scope.selectedOrder.PaymentTerm === "FullPayment") {
            // Full payment: the total amount
            return $scope.selectedOrder.TotalPrice;
        }
        return 0; // Default value
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
    $scope.imageSrc2 = "";

    $scope.previewImage2 = function (file) {




        if (file) {

            console.log("previewImage called with file:", file);

            const reader = new FileReader();

            reader.onload = function (e) {
                console.log("FileReader result:", e.target.result);

                // Ensure Angular's digest cycle is triggered to update the view
                $scope.$apply(function () {
                    $scope.imageSrc2 = e.target.result; // Update the image source
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



    $scope.DeleteServiceEmployeeDeny = function (eDATA, action) {
        Swal.fire({
            title: "Are you sure?",
            text: "This request will be denied",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deny it!",
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
                            text: "Service deletion is denied.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error denying deleting service: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                }, function (error) {
                    console.error("Error denying deleting services: ", error);
                    Swal.fire("Error!", "An error occurred while denying.", "error");
                });
            }
        });
    };

    $scope.DeleteUserEmployee = function (eDATA, action) {
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
                var postData = IPService.DeleteUserEmployee(eDATA, action);

                postData.then(function (response) {
                    var result = response.data;

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "User deletion successfully requested.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error requesting deleting user: " + result.message,
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

    $scope.DeleteUserEmployeeDeny = function (eDATA, action) {
        Swal.fire({
            title: "Are you sure?",
            text: "This request will be denied",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deny it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(eDATA);
                var postData = IPService.DeleteUserEmployee(eDATA, action);

                postData.then(function (response) {
                    var result = response.data;

                    if (result.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "User deletion is dennied.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error denying deleting user: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                }, function (error) {
                    console.error("Error denying deleting user: ", error);
                    Swal.fire("Error!", "An error occurred while denying.", "error");
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





    $scope.FileQuantity = ""; 
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
        console.log("SizesData (Object):", $scope.sizesData);
        console.log("Selected Service:", $scope.services[index]);

        var selectedServiceID = $scope.services[index];

        // Use Object.values() directly in filter without modifying SizesData
        $scope.filteredSizes[index] = Object.values($scope.sizesData).filter(function (sizesData) {
            console.log(sizesData.ServiceID, "ServiceID");
            return sizesData.ServiceID === selectedServiceID;
        });

        console.log("Filtered Sizes:", $scope.filteredSizes[index]);
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
    $scope.DeleteReviewsEmployeeDeny = function (eDATA, action) {
        Swal.fire({
            title: "Are you sure?",
            text: "This request will be denied",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deny it!",
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
                            text: "Reviews deletion is denied.",
                            icon: "success",
                            confirmButtonText: "OK"
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Error denying deleting service: " + result.message,
                            icon: "error",
                            confirmButtonText: "OK"
                        });
                    }
                }, function (error) {
                    console.error("Error denying deleting reviews: ", error);
                    Swal.fire("Error!", "An error occurred while denying.", "error");
                });
            }
        });
    };


    $scope.ServicesData = [];
    $scope.selectedServicePage = {};
    $scope.imageSrc = '';

    $scope.loadServices = function () {
        IPService.LoadServices().then(function (response) {
            $scope.ServicesData = response.data;
        });
    };

    // Open update service form
    $scope.openUpdateService = function (DATA) {
        openUpdateService();
        console.log("Original service:", DATA);
        $scope.selectedServicePage = angular.copy(DATA);
        console.log("Copied service:", $scope.selectedServicePage);
        $scope.imageSrc = $scope.selectedServicePage.ImagePath;
        document.querySelector('.update-container').style.display = 'block';
    };

    $scope.openUpdateReview = function (DATA) {
        openContainer2();
        console.log("Original review:", DATA);
        $scope.selectedReviewPage = angular.copy(DATA);
        console.log("Copied review:", $scope.selectedReviewPage);
        $scope.imageSrc2 = $scope.selectedReviewPage.IMG_Path;
    };

    //// Update service
    //$scope.updateService = function (DATA) {
    //    ServicesData.updateService(DATA).then(function (response) {
    //        if (response.data.success) {
    //            $scope.loadServices();
    //            closeUpdateService();
    //        }
    //    });
    //};


    $scope.updateService = function () {
        if (!$scope.selectedServicePage || !$scope.selectedServicePage.ServiceID) {
            console.error("Error: No service selected for update.");
            return;
        }

        var updatedServiceData = {
            ServiceID: $scope.selectedServicePage.ServiceID,
            ServiceName: $scope.selectedServicePage.ServiceName,
            Description: $scope.selectedServicePage.Description,
            Material: $scope.selectedServicePage.Material,
            ImagePath: $scope.selectedServicePage.ImagePath, // Default to existing image
        };

        function UploadFile(file) {
            return new Promise(function (resolve, reject) {
                if (file) {
                    console.log("File selected for upload:", file.name);

                    // Upload file and update ImagePath
                    IPService.uploadFile(file).then(function (fileName) {
                        updatedServiceData.ImagePath = "/Content/images/Services/" + fileName;
                        resolve();
                    }).catch(function (error) {
                        console.error("Upload failed:", error);
                        reject(error);
                    });
                } else {
                    resolve(); // No file uploaded, proceed with the existing image
                }
            });
        }

        // Handle file upload (if any) and update service
        UploadFile($scope.file).then(function () {
            IPService.updateService(updatedServiceData).then(function (response) {
                if (response.data.success) {
                    console.log("Service updated successfully:", response.data);
                    swal.fire({
                        title: "Success!",
                        text: "Service updated successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                        timer: 2000,
                    });
                    $scope.loadServices();
                    closeUpdateService();
                } else {
                    console.error("Update failed:", response.data.message);
                    swal.fire({
                        title: "Error!",
                        text: "Failed to update the service.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }).catch(function (error) {
                console.error("Service update error:", error);
                swal.fire({
                    title: "Error!",
                    text: "Something went wrong while updating the service.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
        }).catch(function (error) {
            console.error("File upload failed:", error);
        });
    };


    // Upload file for update
    $scope.updateUploadFile = function (file) {
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    $scope.imageSrc = e.target.result;
                    $scope.selectedServicePage.ImagePath = e.target.result;
                });
            };
            reader.readAsDataURL(file);
        }
    };


    $scope.OrderData = {
        AdditionalRequests: "",
        CompanyName: "",
        PaymentTerm: "",
        Service: [],

    };


    $scope.updateReview = function () {
        if (!$scope.selectedReviewPage || !$scope.selectedReviewPage.ContID) {
            console.error("Error: No review selected for update.");
            return;
        }

        var updatedReviewData = {
            ContID: $scope.selectedReviewPage.ContID,
            ContName: $scope.selectedReviewPage.ContName,
            Desc: $scope.selectedReviewPage.Desc,


            IMG_Path: $scope.selectedServicePage.IMG_Path, // Default to existing image
        };

        function UploadFile(file) {
            return new Promise(function (resolve, reject) {
                if (file) {
                    console.log("File selected for upload:", file.name);

                    // Upload file and update ImagePath
                    IPService.uploadFile2(file).then(function (fileName) {
                        updatedReviewData.IMG_Path = "/Content/images/Reviews/" + fileName;
                        resolve();
                    }).catch(function (error) {
                        console.error("Upload failed:", error);
                        reject(error);
                    });
                } else {
                    resolve(); // No file uploaded, proceed with the existing image
                }
            });
        }

        // Handle file upload (if any) and update service
        UploadFile($scope.file).then(function () {
            IPService.updateReview(updatedReviewData).then(function (response) {
                if (response.data.success) {
                    console.log("Review updated successfully:", response.data);
                    swal.fire({
                        title: "Success!",
                        text: "Review updated successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                        timer: 2000,
                    });
                    $scope.loadContents();
                    closeContainer2();
                } else {
                    console.error("Update failed:", response.data.message);
                    swal.fire({
                        title: "Error!",
                        text: "Failed to update the review.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }).catch(function (error) {
                console.error("Service update error:", error);
                swal.fire({
                    title: "Error!",
                    text: "Something went wrong while updating the review.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
        }).catch(function (error) {
            console.error("File upload failed:", error);
        });
    };

    $scope.AddOrder = function () {
        if ($scope.isSubmitting) {
            console.log("Order submission already in progress...");
            return; // Stop execution if already submitting
        }

        console.log("Current Form Data:");
        console.log("CompanyName:", $scope.CompanyName);
        console.log("PaymentTerm:", $scope.PaymentTerm);
        console.log("AdditionalRequests:", $scope.AdditionalRequests);

        $scope.isSubmitting = true; // Lock submission
        console.log("Submitting Order...");

        var OrderDataAdd = {
            services: ($scope.services || []).join(','),
            UserID: $scope.UserID,
            CompanyName: $scope.OrderData.CompanyName,
            PaymentTerm: $scope.OrderData.PaymentTerm,
            AdditionalRequests: $scope.OrderData.AdditionalRequests,
            FileQuantity: $scope.FileQuantity,
            Quantity: ($scope.quantities || []).join(','),
            Size: ($scope.sizes || []).join(','),
            TotalPrice: $scope.getTotal(),
            FilePath: "",
            Service: ($scope.services || []).join(',')// To be updated after file upload,
        };

        console.log("Final OrderDataAdd object:", OrderDataAdd);


        console.log("Initial Order Data:", OrderDataAdd);

        if ($scope.files && $scope.files.length > 0) {
            if ($scope.isUploadingFiles) {
                console.log("File upload already in progress...");
                return; // Stop if already uploading
            }

            $scope.isUploadingFiles = true; // Lock file uploads
            console.log("Uploading files...");

            UploadFiles().then(function (uploadedFilePaths) {
                $scope.isUploadingFiles = false; // Unlock file uploads
                OrderDataAdd.FilePath = uploadedFilePaths.join(' , ');

                console.log("Final Order Data with file paths:", OrderDataAdd);
                return IPService.InsertOrder(OrderDataAdd);
            }).then(function (response) {
                console.log("Order submitted successfully:", response);
                Swal.fire({
                    title: 'Success!',
                    text: 'Order added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
            }).catch(function (error) {
                console.error("Failed to add order:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while adding the order.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }).finally(function () {
                setTimeout(() => {
                    $scope.$applyAsync(() => {
                        $scope.isSubmitting = false; // Unlock submission after completion
                    });
                }, 500); // Small delay to prevent rapid re-clicks
            });

        } else {
            console.log("No files to upload, proceeding with order submission...");

            IPService.InsertOrder(OrderDataAdd).then(function (response) {
                console.log("Order submitted successfully:", response);
                Swal.fire({
                    title: 'Success!',
                    text: 'Order added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
            }).catch(function (error) {
                console.error("Failed to add order:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while adding the order.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }).finally(function () {
                setTimeout(() => {
                    $scope.$applyAsync(() => {
                        $scope.isSubmitting = false; // Unlock submission after completion
                    });
                }, 500);
            });
        }
    };
    $scope.prices = []; // Store individual prices

    $scope.updatePrice = function (index) {
        console.log("Selected Size ID:", $scope.sizes[index]);

        var selectedSizeID = $scope.sizes[index];

        // Find the corresponding size object
        var selectedSize = $scope.filteredSizes[index].find(size => size.SizeID == selectedSizeID);

        if (selectedSize) {
            $scope.prices[index] = selectedSize.Price; // Update price for this file
        } else {
            $scope.prices[index] = 0; // Default to 0 if no size is selected
        }
    };

    $scope.getTotal = function () {
        return $scope.prices.reduce((sum, price, index) => {
            const quantity = $scope.quantities[index] || 0; // Default to 0 if quantity is not available
            return sum + (price * quantity); // Multiply price by quantity for each item
        }, 0);
    };


    $scope.updateTotalPrice = function (index) {
        $scope.totalPrices = []; // Ensure it's an array

        if ($scope.prices[index] && $scope.quantities[index]) {
            $scope.totalPrices[index] = $scope.prices[index] * $scope.quantities[index];
        } else {
            $scope.totalPrices[index] = 0; // Default to 0 if any value is missing
        }
    };

    // Function to upload multiple files
    function UploadFiles() {
        var uploadPromises = [];

        angular.forEach($scope.files, function (file) {
            if (file) {
                var uploadPromise = IPService.uploadFile3(file).then(function (fileName) {
                    console.log("Uploaded file name:", fileName);
                    return "/Content/images/Orders/" + fileName;
                });
                uploadPromises.push(uploadPromise);
            }
        });

        return Promise.all(uploadPromises); // Wait for all uploads before proceeding
    }

    $scope.viewPaymentOrder = function (orderID) {
        IPService.GetOrderDetails(orderID).then(function (response) {
            if (response.data.success) {
                $scope.selectedOrder = response.data.order; // Store the order details
            } else {
                Swal.fire('Error!', response.data.message, 'error');
            }
        }).catch(function (error) {
            Swal.fire('Error!', 'An error occurred while fetching order details.', 'error');
        });
    };

    $scope.closePaymentOrderModal = function () {
        $scope.selectedOrder = null; // Clear the selected order
    };

    $scope.viewOrder = function (order) {
        // Store the selected order data
        $scope.selectedOrder = order;

        // Check if showPaymentModal is true
        if (!$scope.showPaymentModal) {
            // Open the viewOrder modal only if showPaymentModal is false
            $scope.showOrderModal = true; // Set a flag to show the viewOrder modal
        }
    };

    $scope.closeOrderModal = function () {
        $scope.selectedOrder = null; // Clear the selected order data to close the modal
    };

    $scope.makePayment = function (order) {
        let paymentAmount;

        if (order.PaymentTerm === 'Fifty') {
            if (order.PaymentStatus === 'Unpaid' || order.PaymentStatus === null) {
                // First payment: half of the total amount
                paymentAmount = order.TotalPrice / 2;
            } else if (order.PaymentStatus === 'Half Paid') {
                // Second payment: remaining half
                paymentAmount = order.TotalPrice / 2;
            } else {
                alert('This order is already fully paid.');
                return;
            }
        } else if (order.PaymentTerm === 'FullPayment') {
            // Full payment
            paymentAmount = order.TotalPrice;
        } else {
            alert('Invalid payment term.');
            return;
        }

        // Open the payment modal with the calculated amount
        $scope.selectedOrder = order;
        $scope.paymentData = {
            amount: paymentAmount,
            referenceNumber: '',
            file: null
        };
        $scope.showPaymentModal = true;
    };




    $scope.showPaymentModal = false; // Controls modal visibility
    $scope.paymentData = {
        amount: null,
        file: null,
        referenceNumber: null
    };

    // Open Payment Modal
    $scope.makePayment = function (order) {
        $scope.selectedOrder = order; // Store the selected order
        $scope.showPaymentModal = true; // Show the modal
    };

    // Close Payment Modal
    $scope.closePaymentModal = function () {
        $scope.showPaymentModal = false; // Hide the modal
        $scope.paymentData = { amount: null, file: null, referenceNumber: null }; // Reset form
    };

    // Submit Payment
    $scope.paymentData = {
        file: null,
        referenceNumber: ''
    };

    $scope.setFile = function (element) {
        $scope.paymentData.file = element.files[0]; // Store the selected file
        $scope.$apply(); // Update the scope
    };

    $scope.submitPayment = function () {
        // Validate required fields
        if (!$scope.paymentData.referenceNumber || !$scope.paymentData.file) {
            alert("Please fill in all fields and upload a payment proof.");
            return;
        }

        // Determine PaymentStatus based on PaymentTerm
        var paymentStatus = "InProgress"; // Default status
        if ($scope.selectedOrder.PaymentTerm === "Fifty") {
            if ($scope.selectedOrder.PaymentStatus === "Unpaid" || $scope.selectedOrder.PaymentStatus === null) {
                paymentStatus = "Half Paid"; // First payment
            } else if ($scope.selectedOrder.PaymentStatus === "Half Paid") {
                paymentStatus = "Paid"; // Second payment
            }
        } else if ($scope.selectedOrder.PaymentTerm === "FullPayment") {
            paymentStatus = "Paid"; // Full payment
        }

        // Create FormData object
        var formData = new FormData();
        formData.append("OrderID", $scope.selectedOrder.OrderID);
        formData.append("UserID", $scope.UserID);
        formData.append("Amount", $scope.selectedOrder.TotalPrice);
        formData.append("ReferenceNo", $scope.paymentData.referenceNumber);
        formData.append("PaymentStatus", paymentStatus); // Set PaymentStatus dynamically
        formData.append("File", $scope.paymentData.file);

        // Log the data being sent
        console.log("Sending payment data:");
        for (var pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        // Send data to the backend
        IPService.submitPayment(formData)
            .then(function (response) {
                if (response.data.success) {
                    // Update the PaymentStatus in the frontend
                    $scope.selectedOrder.PaymentStatus = paymentStatus; // Update the UI
                    Swal.fire('Success!', 'Payment submitted successfully!', 'success');
                    $scope.closePaymentModal(); // Close the modal
                    $scope.loadOrders(); // Refresh the orders table
                } else {
                    Swal.fire('Error!', response.data.message, 'error');
                }
            })
            .catch(function (error) {
                console.error("Error submitting payment:", error);
                Swal.fire('Error!', 'An error occurred while submitting the payment.', 'error');
            });
    };


    $scope.acceptOrder = function (orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to accept this order.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745', // Green color for accept button
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the service to update the order status to "Accepted" (StatusID = 2)

                IPService.updateOrderStatus(orderID, 2).then(function (response) {
                    if (response.data.success) {
                        Swal.fire('Accepted!', 'The order has been accepted.', 'success').then(() => {
                            $scope.loadOrders(); // Refresh the orders table
                            location.reload();
                        });
                    } else {
                        Swal.fire('Error!', 'Failed to accept the order.', 'error');
                    }
                }).catch(function (error) {
                    Swal.fire('Error!', 'An error occurred while accepting the order.', 'error');
                });
            }
        });
        
    };

    $scope.declineOrder = function (orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to decline this order.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, decline it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Decline Order Called for Order ID:", orderID);

                // Call the service to update the order status to 6
                IPService.updateOrderStatus(orderID, 6)
                    .then(function (response) {
                        console.log("Decline Order Response:", response);
                        if (response.data.success) {
                            Swal.fire('Declined!', 'The order has been declined.', 'success').then(() => {
                                // Refresh the orders table
                                $scope.loadOrders();
                                location.reload();
                            });
                        } else {
                            Swal.fire('Error!', 'Failed to decline order: ' + response.data.message, 'error');
                        }
                    })
                    .catch(function (error) {
                        console.error("Decline Order Error:", error);
                        Swal.fire('Error!', 'An error occurred: ' + error.data.message, 'error');
                    });
            }
        });
    };

    $scope.deleteOrder = function (orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this order.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // Red color for delete button
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the service to delete the order
                IPService.deleteOrder(orderID).then(function (response) {
                    if (response.data.success) {
                        Swal.fire('Deleted!', 'The order has been deleted.', 'success').then(() => {
                            $scope.loadOrders(); // Refresh the orders table
                            location.reload();
                        });
                    } else {
                        Swal.fire('Error!', 'Failed to delete the order.', 'error');
                    }
                }).catch(function (error) {
                    Swal.fire('Error!', 'An error occurred while deleting the order.', 'error');
                });
            }
        });
    };

    $scope.getStatusName = function (statusID) {
        // Map StatusID to Status Name
        switch (statusID) {
            case 1:
                return 'Pending';
            case 2:
                return 'Accepted';
            case 3:
                return 'In Progress';
            case 4:
                return 'Completed';
            case 5:
                return 'Declined';
            case 6:
                return 'Delete';
            default:
                return 'Unknown';
        }
    };


    $scope.cancelOrder = function (orderID) {
        console.log("Cancel Order Called");
        // Call the service to cancel the order
        IPService.cancelOrder(orderID)
            .then(function (response) {
                console.log("Cancel Order Response:", response);
                if (response.data.success) {
                    alert('Order cancelled successfully.');

                    // Remove the deleted order from the OrdersData array
                    $scope.OrdersData = $scope.OrdersData.filter(function (order) {
                        return order.OrderID !== orderID;
                    });
                    location.reload();

                    // No need to refresh the table since we updated OrdersData directly
                } else {
                    alert('Failed to cancel order: ' + response.data.message);
                }
            })
            .catch(function (error) {
                console.error("Cancel Order Error:", error);
                alert('An error occurred: ' + error.data.message);
            });
    };


    $scope.acceptRequest = function (orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to accept this request.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745', // Green color for accept button
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the service to accept the request
                IPService.acceptRequest(orderID).then(function (response) {
                    if (response.data.success) {
                        Swal.fire('Accepted!', 'The request has been accepted.', 'success').then(() => {
                            $scope.loadStatus(); // Refresh the status table
                            location.reload();
                        });
                    } else {
                        Swal.fire('Error!', 'Failed to accept the request.', 'error');
                    }
                }).catch(function (error) {
                    Swal.fire('Error!', 'An error occurred while accepting the request.', 'error');
                });
            }
        });
    };

    $scope.declineRequest = function (orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to decline this request.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // Red color for decline button
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, decline it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the service to decline the request
                IPService.declineRequest(orderID).then(function (response) {
                    if (response.data.success) {
                        Swal.fire('Declined!', 'The request has been declined.', 'success').then(() => {
                            $scope.loadStatus(); // Refresh the status table
                            location.reload();
                        });
                    } else {
                        Swal.fire('Error!', 'Failed to decline the request.', 'error');
                    }
                }).catch(function (error) {
                    Swal.fire('Error!', 'An error occurred while declining the request.', 'error');
                });
            }
        });
    };



    $scope.paymentData = {
        orderID: null,
        referenceNumber: "",
        file: null
    };

    $scope.openPaymentModal = function (order) {
        $scope.selectedOrder = order;
        $scope.paymentData.orderID = order.OrderID;
        $scope.showPaymentModal = true;
    };

    // Close the payment modal
    $scope.closePaymentModal = function () {
        $scope.showPaymentModal = false;
        $scope.paymentData = { orderID: null, referenceNumber: "", file: null }; // Reset form
    };

    $scope.setFile = function (element) {
        $scope.paymentData.file = element.files[0]; // Store the selected file
        $scope.$apply(); // Update the scope
    };

    
    $scope.setFile = function (element) {
        $scope.paymentData.file = element.files[0]; // Store the selected file
        $scope.$apply(); // Update the scope
    };

    $scope.openDeclineModal = function (order) {
        $scope.selectedOrder = order; // Store the selected order
        $scope.showDeclineModal = true; // Show the modal
        $scope.declineReason = ''; // Reset the reason input
    };
    $scope.closeDeclineModal = function () {
        $scope.showDeclineModal = false; // Hide the modal
    };

    $scope.submitDecline = function (orderID) {
        console.log("Submit Decline button clicked"); // Check if this logs
        console.log("Decline Reason:", $scope.declineReason); // Check if this logs the correct value

        if (!$scope.declineReason) {
            alert('Please enter a reason for declining the order.');
            return;
        }

        // Call the service to decline the order
        IPService.declineOrder($scope.selectedOrder.OrderID, $scope.declineReason)
            .then(function (response) {
                console.log("Decline Order Response:", response); // Check the response
                if (response.data.success) {
                    alert('Order declined successfully.');
                    $scope.closeDeclineModal();
                    $scope.loadOrders(); // Refresh the orders table
                    location.reload();
                } else {
                    alert('Failed to decline the order: ' + response.data.message);
                }
            })
            .catch(function (error) {
                console.error("Decline Order Error:", error); // Check the error
                alert('An error occurred: ' + error.data.message);
            });
    };

    $scope.openStatusModal = function (order) {
        console.log("Open Status Modal Called");
        $scope.selectedOrder = order; // Store the selected order
        $scope.newStatus = order.StatusID; // Set the current status as the default value
        $scope.showStatusModal = true; // Show the modal
    };

    $scope.closeStatusModal = function () {
        $scope.showStatusModal = false; // Hide the modal
    };

    $scope.updateStatus = function () {
        console.log("Update Status Called");
        console.log("New Status:", $scope.newStatus);

        // Call the service to update the status
        IPService.updateOrderStatus($scope.selectedOrder.OrderID, $scope.newStatus)
            .then(function (response) {
                location.reload();
                console.log("Update Status Response:", response);
                if (response.data.success) {
                    alert('Status updated successfully.');
                    $scope.closeStatusModal();
                    $scope.loadOrders(); // Refresh the orders table
                    location.reload();
                } else {
                    alert('Failed to update status: ' + response.data.message);
                }
            })
            .catch(function (error) {
                console.error("Update Status Error:", error);
                alert('An error occurred: ' + error.data.message);
            });
        location.reload();
    };


    $scope.filterByStatus = function (order) {
        // Include only orders with StatusID 2 or 3
        return order.StatusID === 2 || order.StatusID === 3;
    };


    $scope.openCancelConfirmationModal = function (order) {
        console.log("Open Cancel Confirmation Modal Called");
        $scope.selectedOrder = order; // Store the selected order
        $scope.showCancelConfirmationModal = true; // Show the confirmation modal
    };

    $scope.closeCancelConfirmationModal = function () {
        $scope.showCancelConfirmationModal = false; // Hide the confirmation modal
    };

    $scope.confirmCancel = function () {
        console.log("Confirm Cancel Called");
        $scope.closeCancelConfirmationModal(); // Close the modal
        $scope.cancelOrder($scope.selectedOrder.OrderID); // Call the cancelOrder function
    };


    $scope.confirmPayment = function (paymentID, orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to confirm this payment.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the service to confirm the payment
                IPService.ConfirmPayment(paymentID, orderID).then(function (response) {
                    if (response.data.success) {
                        Swal.fire('Confirmed!', 'Payment confirmed, receipt created, and payment record removed.', 'success').then(() => {
                            // Remove the payment row from the table
                            $scope.PaymentsData = $scope.PaymentsData.filter(function (payment) {
                                return payment.PaymentID !== paymentID;
                            });
                        });
                        location.reload();
                    } else {
                        Swal.fire('Error!', response.data.message, 'error');
                    }
                }).catch(function (error) {
                    Swal.fire('Error!', 'An error occurred while confirming the payment.', 'error');
                });
            }
        });
    };

    $scope.declinePayment = function (paymentID, orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to decline this payment.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, decline it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                IPService.DeclinePayment(paymentID, orderID).then(function (response) {
                    if (response.data.success) {
                        Swal.fire('Declined!', 'Payment has been declined.', 'success').then(() => {
                            $scope.loadPayments(); // Refresh the payments table
                        });
                        location.reload();
                    } else {
                        Swal.fire('Error!', response.data.message, 'error');
                    }
                }).catch(function (error) {
                    Swal.fire('Error!', 'An error occurred while declining the payment.', 'error');
                });
            }
        });
    };

    $scope.filterOrdersOlderThan3Days = function (orders) {
        var currentDate = new Date(); // Get the current date
        console.log("Current Date:", currentDate);

        return orders.filter(function (order) {
            // Extract the timestamp from the "/Date(1742310318000)/" format
            var createdAt = order.CreatedAt;
            var timestamp = parseInt(createdAt.match(/\d+/)[0]); // Extract the number

            // Convert the timestamp to a Date object
            var orderDate = new Date(parseInt(timestamp));
            if (isNaN(orderDate.getTime())) {
                console.warn("Invalid CreatedAt date for order:", order);
                return false; // Skip this order
            }

            var timeDifference = currentDate - orderDate; // Difference in milliseconds
            var daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert to days
            console.log("Order Date:", orderDate);
            console.log("Days Difference:", daysDifference);

            return daysDifference > 3; // Return orders older than 3 days
        });
    };

    $scope.downloadReceipt = function (receipt) {
        try {
            // Fetch order details using OrderID
            IPService.GetOrderDetails(receipt.OrderID).then(function (response) {
                if (response.data.success) {
                    const orderDetails = response.data.order;

                    // Check if jsPDF is available
                    if (typeof window.jspdf === 'undefined') {
                        console.error('jsPDF library is not loaded.');
                        alert('jsPDF library is not loaded. Please check the script tag.');
                        return;
                    }

                    const { jsPDF } = window.jspdf; // Access jsPDF from the global scope
                    const doc = new jsPDF();

                    // Add receipt details to the PDF
                    doc.setFontSize(16);
                    doc.text("Receipt Details", 10, 10);
                    doc.setFontSize(12);

                    // Receipt Information
                    doc.text(`Receipt ID: ${receipt.ReceiptID}`, 10, 20);
                    doc.text(`User ID: ${receipt.UserID}`, 10, 30);
                    doc.text(`Order ID: ${receipt.OrderID}`, 10, 40);
                    doc.text(`Payment Term: ${receipt.PaymentTerm}`, 10, 50);
                    doc.text(`Balance: ${receipt.Balance}`, 10, 60);
                    doc.text(`Created At: ${$scope.DateFormat(receipt.CreatedAt)}`, 10, 70);

                    // Order Information
                    doc.text("Order Details", 10, 90);
                    doc.text(`Service: ${orderDetails.Service || 'N/A'}`, 10, 100);
                    doc.text(`Size: ${orderDetails.Size || 'N/A'}`, 10, 110);
                    doc.text(`Quantity: ${orderDetails.Quantity || 'N/A'}`, 10, 120);
                    doc.text(`Total Price: ${orderDetails.TotalPrice || 'N/A'}`, 10, 130);
                    doc.text(`Additional Requests: ${orderDetails.AdditionalRequests || 'None'}`, 10, 140);

                    // Save the PDF
                    doc.save(`Receipt_${receipt.ReceiptID}.pdf`);
                } else {
                    console.error('Failed to fetch order details:', response.data.message);
                    alert('Failed to fetch order details. Please try again.');
                }
            }).catch(function (error) {
                console.error('Error fetching order details:', error);
                alert('An error occurred while fetching order details. Please check the console for details.');
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('An error occurred while generating the PDF. Please check the console for details.');
        }
    };


    $scope.Name2 = sessionStorage.getItem("Name");

    $scope.Chat2 = function () {
        window.location.href = "Home/DashChat2";
    };



    $scope.AddChat = function (Data) {

        var ChatsDataAdd = {
            Username: $scope.Name2,
            Chat: $scope.Chats,
            UserID: $scope.UserID,
            replyTo: $scope.selectedUserIDChat,

        };


        console.log("Chat Data to be added:", ChatsDataAdd, Data);


        var postData = IPService.InsertChat(ChatsDataAdd);

        postData.then(function (ReturnedData) {
            var response = ReturnedData.data;
            console.log(response);
            swal.fire({
                title: 'Success!',
                text: 'Message sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
            });
        }).catch(function (error) {
            console.error("Failed to add tour:", error);
            swal.fire({
                title: 'Error!',
                text: 'Something went wrong while sending the message.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
        window.location.reload()
    }
    $scope.filterChat = function (chat) {
        return chat.UserID == $scope.selectedUserIDChat || chat.replyTo == $scope.selectedUserIDChat;
    };

    $scope.filterChat2 = function (chat) {
        return chat.UserID == $scope.UserID || chat.replyTo == $scope.UserID;
    };

    $scope.selectedUserIDChat = null;

    $scope.updateSelectedUser = function (userID) {
        $scope.selectedUserIDChat = userID;
    };

    $scope.UpdateUnread = function (DATA) {
        var Data = {
            SelectedUserID: $scope.selectedUserIDChat,
        };

        // Call the service to update the user
        var GetData = IPService.UpdateUnread(Data);
    };

    $scope.loadUsersChat = function () {
        var getData = IPService.LoadUsersChat();
        getData.then(function (ReturnedData) {
            $scope.UsersDataChat = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable3').DataTable();
            });
        });
    };

    $scope.loadChat = function () {
        var getData = IPService.LoadChats();
        getData.then(function (ReturnedData) {
            $scope.ChatData = ReturnedData.data;



            console.log(ReturnedData.data);
            console.log("HI");
            $(document).ready(function () {


                $('#myTable').DataTable();
            });
        });
    };

    $scope.$watch(function () {
        return sessionStorage.getItem("UserName");
    }, function (newValue) {
        $scope.Name = newValue || "Sign In";
    });

    $scope.handleClick = function () {
        if ($scope.Name !== "Sign In") {
            $scope.Account();
        } else {
            $scope.SignIn();
        }
    };

    $scope.AddChat2 = function (UserIDTo, Chat2) {

        var ChatsDataAdd = {
            Username: $scope.Name2,
            UserID: $scope.UserID,

        };


        console.log("Chat Data to be added:", ChatsDataAdd);


        var postData = IPService.InsertChat2(ChatsDataAdd, UserIDTo, Chat2);

        postData.then(function (ReturnedData) {
            var response = ReturnedData.data;
            console.log(response);
            swal.fire({
                title: 'Success!',
                text: 'Message sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
            });
        }).catch(function (error) {
            console.error("Failed to add tour:", error);
            swal.fire({
                title: 'Error!',
                text: 'Something went wrong while sending the message.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
        window.location.reload()
    }


    $scope.sendEmail2 = function (userID, action) {
        // Construct the URL with the encrypted userID
        console.log("SendEmail2")
        var emailData = {
            toEmail: "",  // Target email address
            subject: "Infinity Prints Order Update",      // Subject of the email
            body: `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Order Update</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); text-align: center;">
        <div style="background-color: #e74c3c; padding: 20px; border-radius: 8px 8px 0 0;">
            <img src="logo.png" alt="Logo" style="width: 50px; height: 50px;">
        </div>
        <h1 style="color: #333; font-size: 24px;">Order Update</h1>
        <p style="color: #555; font-size: 16px; margin: 20px 0;">
            Hi User,<br>
            We wanted to inform you about an update regarding your order: <strong>${action}</strong>. .
        </p>
        
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

        var sendEmailRequest = IPService.SendEmail2(emailData, userID);
        sendEmailRequest.then(function (response) {
            console.log("Email sent successfully:", response.data);
            swal.fire({
                title: 'Success!',
                text: 'Order update email sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        }).catch(function (error) {
            console.error("Error sending email:", error);
            swal.fire({
                title: 'Error!',
                text: 'Error sending order update email.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    };

    $scope.viewPaymentOrder = function (pDATA) {
    $scope.selectedPayment = pDATA; // Store the selected payment data
};

$scope.closePaymentOrderModal = function () {
    $scope.selectedPayment = null; // Clear the selected payment data
};

    $scope.isOwner = function () {
        return $scope.RoleID === "Owner"; // Assuming RoleID is stored in $scope.RoleID
    };



})