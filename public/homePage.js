'use strict'

/* ЛОГАУТ */

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(() => {
        location.reload();
    })
}

/* ОПЕРАЦИИ С ВАЛЮТОЙ */

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    const {currency, amount} = data;
    
    ApiConnector.addMoney ({currency, amount}, responseBody => {
        if (responseBody.success === true) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Пополнение успешно!');
        } else {
            moneyManager.setMessage(false, responseBody.error);
        }
    })
}

moneyManager.conversionMoneyCallback = data => {
const {fromCurrency, targetCurrency, fromAmount} = data;

    ApiConnector.convertMoney ({fromCurrency, targetCurrency, fromAmount}, responseBody => {
        if (responseBody.success === true) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Конвертирование успешно!');
        } else {
            moneyManager.setMessage(false, responseBody.error);
        }
    })
}

moneyManager.sendMoneyCallback = data => {
const {to, currency, amount} = data;

    ApiConnector.transferMoney({to, currency, amount}, responseBody => {
        if (responseBody.success === true) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, 'Перевод совершён успешно!');
        } else {
            moneyManager.setMessage(false, responseBody.error);
        }
    })
}

/* СПИСОК ИЗБРАННЫХ ПОЛЬЗОВАТЕЛЕЙ */

const favoritesWidget = new FavoritesWidget()

    ApiConnector.getFavorites (responseBody => {
        if (responseBody.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responseBody.data);
            moneyManager.updateUsersList(responseBody.data);
        }
    }) 
    
    favoritesWidget.addUserCallback = data => {
        const {id, name} = data;

        ApiConnector.addUserToFavorites({id, name}, responseBody => {
            if (responseBody.success === true) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(responseBody.data);
                moneyManager.updateUsersList(responseBody.data);
            } else {
                favoritesWidget.setMessage(false, 'Ошибка! Необходимо ввести id и имя.');
            }
        })
    }

    favoritesWidget.removeUserCallback = data => {
        const id = data;

        ApiConnector.removeUserFromFavorites(id, responseBody => {
            if (responseBody.success === true) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(responseBody.data);
                moneyManager.updateUsersList(responseBody.data);
            } else {
                favoritesWidget.setMessage(false, 'Ошибка удаления пользователя.');
            }
        })
    }

    /* ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ */

    ApiConnector.current (responseBody => {
        if (responseBody.success === true) {
            ProfileWidget.showProfile(responseBody.data);
        }
    })

    /* ПОЛУЧЕНИЕ ТЕКУЩИХ КУРСОВ ВАЛЮТ */

const ratesBoard = new RatesBoard();

function stocks() {
    ApiConnector.getStocks(responseBody => {
        if (responseBody.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responseBody.data);
        }
    })
}

stocks();

setInterval (stocks, 60000);