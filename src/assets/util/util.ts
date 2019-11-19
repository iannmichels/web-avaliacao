import { FormControl, ValidatorFn } from '@angular/forms';

export class Util {

    public static ADMIN: String = 'admin';
    public static GUEST: String = 'comum';

    public static isUndefined(obj: any): boolean {
        if (obj === undefined || obj === null || obj === '' || obj === 'null') {
            return true;
        } else {
            return false;
        }
    }

    public static isEmail(email: string): boolean {
        const regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
        return !regexp.test(email);
    }

    public static alphaNumeric(allowedPhrase: string): ValidatorFn {
        return (c: FormControl): { [key: string]: boolean } | null => {
            if (c.value) {
                allowedPhrase = allowedPhrase ? allowedPhrase : '';
                let regEx = new RegExp(/^[a-zA-Z0-9]*$/);
                if (!regEx.test(c.value.replace(allowedPhrase.toUpperCase(), '').replace(allowedPhrase.toLowerCase(), ''))) {
                    return { 'alphanumeric': true };
                }
            }
            return null;
        };
    };
}
