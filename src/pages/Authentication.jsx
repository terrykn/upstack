import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import { signInWithGoogle } from '../utils/authentication';

export default function Authentication() {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => signInWithGoogle(navigate)} label="Sign in with Google" />
        </>
    )
}