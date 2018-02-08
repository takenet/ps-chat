class ApplicationStorage {
    _getFromLocalStorage(name) {
        if (this._supportsLocalStorage()) {
            return localStorage.getItem(name);
        } else {
            return null;
        }
    }

    _setToLocalStorage(name, value, expires) {
        if (this._supportsLocalStorage()) {
            value.expires = new Date().getTime() + expires;
            localStorage.setItem(name, btoa(JSON.stringify(value)));
        }
    }

    _clearLocalStorage(name, value, expires) {
        if (this._supportsLocalStorage()) {
            localStorage.clear();
        }
    }

    _supportsLocalStorage() {
        try {
            return "localStorage" in window && window["localStorage"] !== null;
        } catch (e) {
            return false;
        }
    }

    _processLocalStorageExpires() {
        var toRemove = []; //Items to be removed
        const currentDate = new Date().getTime();

        for (var i = 0, j = localStorage.length; i < j; i++) {
            var currentValue = localStorage.getItem(localStorage.key(i));

            //Decode back to JSON
            currentValue = JSON.parse(atob(currentValue));

            //Check if item expired
            if (currentValue.expires && currentValue.expires <= currentDate) {
                toRemove.push(localStorage.key(i));
            }
        }

        // Remove outdated items
        for (var i = toRemove.length - 1; i >= 0; i--) {
            localStorage.removeItem(toRemove[i]);
        }
    }
}

export default ApplicationStorage;
