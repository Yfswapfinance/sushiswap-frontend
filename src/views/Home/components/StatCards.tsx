import React from 'react'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import Web3 from 'web3'
import { useWallet } from 'use-wallet'
import useFarms from '../../../hooks/useFarms'
import '../home.css'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { masterChefAddress } from '../../../constants/tokenAddresses'
import useAllStakedBalance from '../../../hooks/useAllStakedBalance'
import useAllTotalStaked from '../../../hooks/useAllTotalStaked'
import useAllTimeRewards from '../../../hooks/useAllTimeRewards'
import useAllPendingRewards from '../../../hooks/useAllPendingRewards'
import useAllPair from '../../../hooks/useAllPair'
import useEthPrice from '../../../hooks/useEthPrice'
import useAllMultiplier from '../../../hooks/useAllMultiplier'

const StatCards: React.FC = () => {
  const [farms] = useFarms()
  const stakedBalances = useAllStakedBalance()
  const timeRewards = useAllTimeRewards()
  const pendingRewards = useAllPendingRewards()
  const totalStakedBalances = useAllTotalStaked()
  const allMultiplier = useAllMultiplier()
  const allPair = useAllPair()
  const eth_price = useEthPrice()
  const { account }: { account: string; ethereum: provider } = useWallet()
  const { ethereum } = useWallet()
  const contractAddress = masterChefAddress
  const web3 = new Web3(ethereum as provider)
  const getYfbtcPrice = (pair: any, ethPrice: any) => {
    return (pair.token0Price / ethPrice).toFixed(5)
  }

  const getYfbtcRewardsDollarPrice = (
    pair: any,
    ethPrice: any,
    amount: any,
  ) => {
    return ((pair.token0Price / ethPrice) * amount).toFixed(5)
  }

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
        claimReward: getBalanceNumber(new BigNumber(pendingRewards[i])).toFixed(
          5,
        ),
        pair: allPair[i],
        ethPrice: eth_price[i],
        multiplier: allMultiplier[i],
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
              <br />1 YFBTC =
              {!!farm.pair && getYfbtcPrice(farm.pair, farm.ethPrice)}$
              <br />
              1 USDT = 1.0020$
              <br />
              <br />
              ======== YFBTC REWARDS ========
              <br />
              <span className="d-block">
                Claimable Rewards:{farm.claimReward} YFBTC=$
                {!!farm.pair &&
                  getYfbtcRewardsDollarPrice(
                    farm.pair,
                    farm.ethPrice,
                    farm.claimReward,
                  )}
              </span>
              Hourly estimate : {farm.rewards.hourly} YFBTC=$
              {!!farm.pair &&
                getYfbtcRewardsDollarPrice(
                  farm.pair,
                  farm.ethPrice,
                  farm.rewards.hourly,
                )}
              <br />
              Daily estimate : {farm.rewards.daily} YFBTC=$
              {!!farm.pair &&
                getYfbtcRewardsDollarPrice(
                  farm.pair,
                  farm.ethPrice,
                  farm.rewards.daily,
                )}
              <br />
              Weekly estimate : {farm.rewards.weekly} YFBTC=$
              {!!farm.pair &&
                getYfbtcRewardsDollarPrice(
                  farm.pair,
                  farm.ethPrice,
                  farm.rewards.weekly,
                )}
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
