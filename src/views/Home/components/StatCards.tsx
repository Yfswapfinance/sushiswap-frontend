import React from 'react'
import BigNumber from 'bignumber.js'
import useFarms from '../../../hooks/useFarms'
import '../home.css'
import { getBalanceNumber } from '../../../utils/formatBalance'
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

  const getYfbtcPrice = (pair: any, ethPrice: any) => {
    return (pair.token0Price * ethPrice).toFixed(5)
  }

  const getYfbtcRewardsDollarPrice = (
    pair: any,
    ethPrice: any,
    amount: any
  ) => {
    return (pair.token0Price * ethPrice * amount).toFixed(5)
  }

  const getFormatRewards = (rewards: any) => {
    console.log('rewards ', rewards)
    if (!rewards) {
      return {hourly: 0, weekly: 0, daily:0}
    }
    return rewards
  }

  const data = farms.map<any>(
    (farm, i) => {
      return {
        ...farm,
        stakedBalance: getBalanceNumber(new BigNumber(stakedBalances[i])),
        totalStaked: getBalanceNumber(new BigNumber(totalStakedBalances[i])),
        rewards: getFormatRewards(allMultiplier[i]),
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

  // const data = rows.filter((farm) => farm.stakedBalance > 0)
console.log('farms ', data)
  return (
    <>
      {data.length > 0
        ? data.map((farm: any, i: any) => (
            <div className=" section-outline mr-3 p-3 " key={i}>
              <div className="row mul-text mr-1">{farm.rewardMultiplier}</div>
              <img className={'img-con'} src={farm.icon.toString()} alt="" />
              <span className="head-text ml-2">{farm.name} Stats</span>
              <span className="my-percentage d-block">
                {!isNaN(farm.stakedBalance) && farm.stakedBalance}
              </span>
              <span className="d-block">My LP Share</span>
              <span className="percentage ">
                {!isNaN(farm.totalStaked) && farm.totalStaked}
              </span>
              {/* <small>0.00%</small> */}
              <br />
              Total LP's
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
              Hourly ROI in USD :{' '}
              {!!farm.pair &&
                getYfbtcRewardsDollarPrice(
                  farm.pair,
                  farm.ethPrice,
                  farm.rewards.hourly,
                )}
              <br />
              Daily ROI in USD :{' '}
              {!!farm.pair &&
                getYfbtcRewardsDollarPrice(
                  farm.pair,
                  farm.ethPrice,
                  farm.rewards.daily,
                )}
              <br />
              Weekly ROI in USD :{' '}
              {!!farm.pair &&
                getYfbtcRewardsDollarPrice(
                  farm.pair,
                  farm.ethPrice,
                  farm.rewards.weekly,
                )}
              <br />
            </div>
          ))
        : null}
    </>
  )
}

export default StatCards
