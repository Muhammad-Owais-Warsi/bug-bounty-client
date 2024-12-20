import {  web3MemoryStore } from "../context/web3Instance";
import ABI from "../abi/test.json";

const CONTRACT_ADDRESS = "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3"

export default async function createBounty() {

    const web3 = web3MemoryStore.getState().web3Instance;
    const contractInstance = new web3.eth.Contract(ABI,CONTRACT_ADDRESS);

    await contractInstance.methods.create() // not complete.

}