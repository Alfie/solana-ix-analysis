import create, { State } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import base58 from "bs58";

interface UserInstructionStore extends State {
  ixs: any[];
  getUserInstructions: (publicKey: PublicKey, connection: Connection) => void
}

const useUserInstructionStore = create<UserInstructionStore>((set, _get) => ({
  ixs: [],
  getUserInstructions: async (publicKey, connection) => {
    const txns: any[] = [];
    const txnSigs = await connection.getSignaturesForAddress(publicKey);
    //TODO: change to for reverse for performance
    txnSigs.forEach(({signature}) => txns.push(connection.getTransaction(signature)));
    const resolvedTxns = await Promise.all(txns);

    let count = 0;    
    for(const tx of resolvedTxns){
        console.log(count + "*********************START***********************" + count)
        console.log("account key array: ",tx.transaction.message.accountKeys);
        console.log("indexToProgramIds: ",tx.transaction.message.indexToProgramIds);
        for (const ix of tx.transaction.message.instructions)
          console.log("instructions: ",base58.decode(ix.data));
        console.log(tx);

        //Iterate and display accountKeys in base58 representation.
        for (const pk of tx.transaction.message.accountKeys)
          console.log(pk.toBase58());
        console.log(count + "********************END************************" + count)
        count++;
      }
    let ixs = [];
    try {
      //ixs = ;
    } catch (e) {
      console.log('error getting instructions: ', e);
    }
    set((s) => {
      s.ixs = resolvedTxns;
      console.log('ixs updated', resolvedTxns);
    })
  },
}));
  
export default useUserInstructionStore
