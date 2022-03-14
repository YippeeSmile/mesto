export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector }) {
            this._nameElement = document.querySelector(profileNameSelector);
            this._jobElement = document.querySelector(profileJobSelector);
        }
        //метод возвращает объект с данными пользователя
    getUserInfo() {
            return {
                name: this._nameElement.textContent,
                job: this._jobElement
            }
        }
        //метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(title, job) {
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
    }
}