import { Navigate } from "react-router-dom";
import { useStore } from "../context/web3Instance";

export default function Home() {
    const { web3, isConnected, loading } = useStore();





    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-xl">Loading...</h1>
            </div>
        );
    }


    if (!isConnected || !web3) {
        return <Navigate to="/" />;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Web3 Dashboard</h1>
            
        </div>
    );
}