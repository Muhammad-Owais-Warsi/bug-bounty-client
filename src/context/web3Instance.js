import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export const web3MemoryStore = create((set) => ({
  web3Instance: null,
  setWeb3Instance: (instance) => set({ web3Instance: instance }),
}));


export const web3PersistedStore = create(
  persist(
    (set) => ({
      isConnected: false,
      walletAddress: null,
      loading: true,
      setConnectionInfo: (status, address) => 
        set({ isConnected: status, walletAddress: address }),
      setLoading: (status) => set({ loading: status }),
    }),
    {
      name: 'web3-connection-status',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false);
      },
    }
  )
);


export const useWeb3Store = () => {
  const { web3Instance, setWeb3Instance } = web3MemoryStore();
  const { 
    isConnected, 
    walletAddress,
    loading, 
    setConnectionInfo, 
    setLoading 
  } = web3PersistedStore();

  const setWeb3 = async (web3Instance) => {
    if (web3Instance) {
      try {
        const accounts = await web3Instance.eth.getAccounts();
        const address = accounts[0];
        setWeb3Instance(web3Instance);
        setConnectionInfo(true, address);
      } catch (error) {
        console.error("Error setting web3:", error);
        setWeb3Instance(null);
        setConnectionInfo(false, null);
      }
    } else {
      setWeb3Instance(null);
      setConnectionInfo(false, null);
    }
  };

 

  return {
    web3: web3Instance,
    isConnected,
    walletAddress,
    loading,
    setWeb3,
    setLoading
  };
};