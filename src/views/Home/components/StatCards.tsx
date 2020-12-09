import React from 'react'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { useWallet } from 'use-wallet'
import useFarms from '../../../hooks/useFarms'
import { Farm } from '../../../contexts/Farms'
import { StakedValue } from '../../../hooks/useAllStakedValue'
import ABI from '../../../utils/abi.json'
import '../home.css'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { masterChefAddress } from '../../../constants/tokenAddresses'
import useAllStakedBalance from '../../../hooks/useAllStakedBalance'
import useAllTotalStaked from '../../../hooks/useAllTotalStaked'
import useAllTimeRewards from '../../../hooks/useAllTimeRewards'
import useAllPendingRewards from '../../../hooks/useAllPendingRewards'
// import { getTimeBasedReward } from '../../../sushi/utils'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
  stakedBalance: any
}

const StatCards: React.FC = () => {
  const [farms] = useFarms()
  const stakedBalances = useAllStakedBalance()
  const timeRewards = useAllTimeRewards()
  const pendingRewards = useAllPendingRewards()
  const totalStakedBalances = useAllTotalStaked()
  const { account }: { account: string; ethereum: provider } = useWallet()
  const { ethereum } = useWallet()
  const contractAddress = masterChefAddress
  const web3 = new Web3(ethereum as provider)
  const contract = new web3.eth.Contract(
    (ABI as unknown) as AbiItem,
    contractAddress,
  )

  const getFormatRewards = (rewards: any) => {
    return {
      hourly: (240 * rewards).toFixed(5),
      daily: (5760 * rewards).toFixed(5),
      weekly: (40320 * rewards).toFixed(5),
    }
  }

  const rows = farms.map<any>(
    (farm, i) => {
      return {
        ...farm,
        stakedBalance: getBalanceNumber(new BigNumber(stakedBalances[i])),
        totalStaked: getBalanceNumber(new BigNumber(totalStakedBalances[i])),
        rewards: getFormatRewards(timeRewards[i]),
        claimReward: getBalanceNumber(new BigNumber(pendingRewards[i])).toFixed(5),
      }
    },
    [[]],
  )

  const data = rows.filter((farm) => farm.stakedBalance > 0)

  return (
    <>
      {data.length > 0
        ? data.map((farm: any, i: any) => (
            <div className="col section-outline mr-3 p-3" key={i}>
              <img className={'img-con'} src={farm.icon.toString()} alt="" />
              <span className="head-text ml-2">{farm.name} Stats</span>
              <span className="percentage d-block">
                {!isNaN(farm.stakedBalance) && farm.stakedBalance}
              </span>
              <span className="d-block">My Stake</span>
              <span className="percentage ">
                {!isNaN(farm.totalStaked) && farm.totalStaked}
              </span>
              <small>0.00%</small>
              <br />
              Total Staked
              <br />
              <br />
              ========== PRICES ==========
              <br />
              1 YFBTC = 300.0$
              <br />
              1 USDT = 1.0020$
              <br />
              <br />
              ======== YFBTC REWARDS ========
              <br />
              <span className="d-block">
                Claimable Rewards:{farm.claimReward}
              </span>
              Hourly estimate : {farm.rewards.hourly}
              <br />
              Daily estimate : {farm.rewards.daily}
              <br />
              Weekly estimate : {farm.rewards.weekly}
              <br />
              Hourly ROI in USD : 0.12%
              <br />
              Daily ROI in USD : 2.88%
              <br />
              Weekly ROI in USD : 20.16%
              <br />
            </div>
          ))
        : null}
    </>
  )
}

export default StatCards
