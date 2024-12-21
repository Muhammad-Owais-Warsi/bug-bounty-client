import { Navigate } from "react-router-dom";
import { useWeb3Store } from "../context/web3Instance";
import createBounty from "../utils/create";
import availBounty from "../utils/avail";
import { bountiesStore } from "../context/bounties";

export default function Home() {
    const { web3, isConnected, loading } = useWeb3Store();
    const { bounties } = bountiesStore.getState();

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
            <button 
                onClick={createBounty} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Create Bounty
            </button>
            <br />
            <br />
            <button 
                onClick={availBounty} 
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Avail Bounty
            </button>
            <br />
            <br />

            {bounties && bounties.length > 0 ? (
                <ul>
                    {bounties.map((item, index) => (
                        <li key={index} className="mb-4 p-4 border rounded shadow">
                            <div><strong>ID:</strong> {item.id}</div>
                            <div><strong>Title:</strong> {item.title}</div>
                            <div><strong>Description:</strong> {item.description}</div>
                            <div><strong>Amount:</strong> {item.amount}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bounties available.</p>
            )}
        </div>
    );
}
