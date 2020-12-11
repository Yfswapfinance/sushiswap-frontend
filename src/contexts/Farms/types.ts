import { Contract } from 'web3-eth-contract'

export interface Farm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  liveAddress: String
  tokenAddresses: any
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
}

export interface FarmsContext {
  farms: Farm[]
  unharvested: number
}
