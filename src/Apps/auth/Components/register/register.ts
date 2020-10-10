import { Component } from 'derby';

class RegisterData {
    value: number = 0;
}

class RegisterComponent extends Component<RegisterData> {
    static view = __dirname + '/register.html';
    static DataConstructor = RegisterData;
    static is = 'auth-register';

    private model: any;
    private value: any;
    getAttribute: any;

    init() {
        this.value = this.model.ref('value', this.model.scope('random.value'));
    }

    create() {
        // console.log("create called");
        // console.log(document);
        // console.log(document.getElementById('increase-button'));
    }

    increase() {
        this.value.set(this.value.get() + 1);
    }
}

export default RegisterComponent;