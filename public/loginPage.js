'use strict';

/* ЛОГИН */

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    const {login, password} = data;

    ApiConnector.login({login, password}, (responseBody) => {
        if (responseBody.success === true) {
             location.reload()
        } else {
            userForm.setLoginErrorMessage(responseBody.error)
        }
        console.log(responseBody)
    })
}

/* РЕГИСТРАЦИЯ */

userForm.registerFormCallback = (data) => {
    const {login, password} = data;

    ApiConnector.register({login, password}, (responseBody) => {
        if (responseBody.success === true) {
             location.reload()
        } else {
            userForm.setRegisterErrorMessage(responseBody.error)
        }
        console.log(responseBody)
    })
}