import {  useWeb3Store } from "../context/web3Instance";
import useLogin from "../utils/login";
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const { 
        web3, 
        isConnected, 
        setWeb3,
    } = useWeb3Store();

    const { login } = useLogin();
    const navigate = useNavigate();


    useEffect(() => {
        const checkConnection = async () => {
            if (isConnected && !web3) {
                navigate("/");
            } else if (isConnected && web3) {
                navigate('/home');
            }
        };
        checkConnection();
    }, [isConnected,web3]);

   

    const handleLogin = async () => {
        try {
            const result = await login();
            if (result.error) {
                console.error("Login error:", result.error);
                return;
            }    
            await setWeb3(result.web3);
            navigate('/home');
        } catch (error) {
            console.error("Unexpected error during login:", error);
        }
    };



    return (
        <div className="p-4">
            {!isConnected || !web3 ? (
                <button 
                    onClick={handleLogin}
               
                >
                    Connect Wallet
                </button>
            ) : <Navigate to="/home" />
            }
        </div>
    );
}

export default Login;