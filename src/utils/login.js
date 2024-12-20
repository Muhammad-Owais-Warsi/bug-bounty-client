
import Web3 from "web3";

export default function useLogin() {


    const login = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("Ethereum wallet not found. Please install MetaMask.");
            }

            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();

            return { web3, account: accounts[0], error: null }; // Returning directly for immediate use
        } catch (err) {
  
            return { web3: null, account: null, error: err }; // Returning error for immediate use
        }
    };

    // Return the login function and the states
    return { login };
}
