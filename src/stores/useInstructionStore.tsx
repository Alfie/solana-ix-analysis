import create, { State } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

interface UserInstructionStore extends State {
  //
}

const useUserInstructionStore = create<UserInstructionStore>((set, _get) => ({
  //  
}));
  
export default useUserInstructionStore
