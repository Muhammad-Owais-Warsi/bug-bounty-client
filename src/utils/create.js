import {  web3MemoryStore, web3PersistedStore } from "../context/web3Instance";
import ABI from "../abi/test.json";
import { bountiesStore } from "../context/bounties";

const CONTRACT_ADDRESS = "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3"

const id="124"
const title="test"
const description="test"
const links=["o.com","p.com"]
let amount="1"

export default async function createBounty() {

    const walletAddress = web3PersistedStore.getState().walletAddress
    const web3 = web3MemoryStore.getState().web3Instance;
    const { bounties,setBounties } = bountiesStore.getState();

    const contractInstance = new web3.eth.Contract(ABI,CONTRACT_ADDRESS);

   
    try {
        const result = await contractInstance.methods.create(id,title,description,links,amount).send({from:walletAddress});
        if(result) {
            setBounties({id,title,description,links,amount});
            console.log(bounties);
            return {success:true,error:null}
        }
    } catch (error) {
        return {success:null,error:error};
    }

}