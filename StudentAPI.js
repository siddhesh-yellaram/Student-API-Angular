var app = angular.module("studApp", []);

app.controller("studentCtrl", function ($scope, $http) {
    $scope.student = {
        name: "John Doe",
        email: "jd@gmail.com",
        age: null,
        rollNo: null,
        isMale: null,
        date: null
    }

    $scope.currentStudentId = null

    // $scope.save = function () {
    //     formData = $scope.form;
    // }

    $scope.submitForm = function () {
        console.log("Posting data....");
        formData = $scope.student;
        console.log(formData);

        req = {
            method: 'POST',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formData)
        }

        $http(req).success(function (response) {
            $scope.currentStudentId = response
            console.log(response)
        });
    }

    $scope.dispAllStud = function () {
        req = {
            method: 'GET',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: null,
        }

        $http(req).success(function (response) {
            studArr = response;
            for (i = 0; i < response.length; i++) {
                if (response[i].rollNo == 0 || response.name == null) {
                    studArr.splice(i, 1);
                }
            }
            console.log(studArr)
        });
    }

    $scope.updateStud = function () {
        req = {
            method: 'PUT',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/' + $scope.currentStudentId,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify($scope.student),
        }

        $http(req).success(function (response) {
            $scope.student = {
                name: $scope.student.name,
                email: $scope.student.email,
                age: $scope.student.age,
                rollNo: $scope.student.rollNo,
                isMale: $scope.student.isMale,
                date: $scope.student.date
            }
            console.log(response)
        });
    }

    $scope.dispCurrStud = function () {
        req = {
            method: 'GET',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/' + $scope.currentStudentId,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: null,
        }

        $http(req).success(function (response) {
            studArr = response;
            console.log(studArr);
        });
    }

    $scope.resetForm = function () {
        $scope.student = {
            name: "John Doe",
            email: "jd@gmail.com",
            age: null,
            rollNo: null,
            isMale: null,
            date: null
        }
    }
});