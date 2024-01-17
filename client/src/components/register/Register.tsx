import * as userService from '../../services/userService';

const send = async () => {
    const result = await userService.register({email:'Radoslav', password:'123123'});
    console.log(result)
}
const Register = () => {
    return (
        <>
            <button onClick={send}>THE BUTTON</button>
        </>
    );
}

export default Register;