import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

const YFBTC_MULTIPLIER = 5;

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}
export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getFarms = (sushi) => {

  return sushi
    ? sushi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddresses,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          liveAddress,
          rewardMultiplier
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          liveAddress,
          tokenAddresses:tokenAddresses[1],
          tokenSymbol,
          tokenContract,
          earnToken: 'YFBTC',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
          rewardMultiplier
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { totalSupply } = await masterChefContract.methods.poolInfo(pid).call()
  return new BigNumber(totalSupply)
}

export const getTotalSupply = async (masterChefContract, pid) => {
  const { totalSupply } = await masterChefContract.methods.poolInfo(pid).call()
  return new BigNumber(totalSupply)
}

export const getTimeBasedReward = async (masterChefContract,pid) => {
  const { accYfbtcPerShare } = await masterChefContract.methods.poolInfo(pid).call()
  let reward = accYfbtcPerShare / (new BigNumber(10).pow(12))
  return new BigNumber(reward)
}

const getPoolLength = async (masterChefContract)=>{
  return masterChefContract.methods.poolLength.call()
}

export const getEligiblePools = async(masterChefContract)=>{
  const length = await getPoolLength()
  const poolCount = 0;
  for (let index = 0; index < length; index++) {
      const { totalSupply } = await masterChefContract.methods.poolInfo(index).call()
      console.log('**** supply ', totalSupply)
      if ( totalSupply > 0 )
      poolCount++
  }

}

export const getMultiplier = async (masterChefContract,pid,block) => {
  console.log('getMultiplier is called')
  const { lastRewardBlock } = await masterChefContract.methods.poolInfo(pid).call()
  const diff = (block - lastRewardBlock)
  if ( diff <= 0 )
  return 0
  const totalReward = await masterChefContract.methods.getMultiplier(lastRewardBlock,block).call()
  return (totalReward / diff) / new BigNumber(10).pow(18)
}

export const getRewardPerBlock = async(masterChefContract,pid) =>{
  let { totalSupply } = await masterChefContract.methods.poolInfo(pid).call()
  totalSupply = totalSupply / new BigNumber(10).pow(18);
    const rewardPerBlock =  0.00683734462
    const distribution = YFBTC_MULTIPLIER + 3;
    let rewardPerPool = rewardPerBlock / (distribution);
    if (pid == 0 ){
      rewardPerPool = (rewardPerPool * YFBTC_MULTIPLIER) / totalSupply
    }else{
      rewardPerPool = rewardPerPool / totalSupply
    }
    return rewardPerPool;
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingSushi(pid, account).call()
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (lpContract, masterChefAddress, account) => {
  return lpContract.methods
    .approve(masterChefAddress, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const Allowance = async (lpContract, masterChefAddress, account) => {
  return lpContract.methods
    .allowance(account, masterChefAddress)
    .call()
}

export const transfer = async (
  pid,
  lpContract,
  amount,
  masterChefAddress,
  account,
) => {
  console.log('amount entered ', amount)
  let Amount = ethers.utils.parseEther(amount)
  return lpContract.methods
    .deposit(pid, Amount)
    .send({ from: account })
}

export const onHarvest = async (
  pid,
  lpContract,
  amount,
  masterChefAddress,
  account,
) => {
  let Amount = ethers.utils.parseEther(amount)
  return lpContract.methods
    .withdraw(pid,Amount)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  console.log('sushi ', sushi)
  const cap = await sushi.methods.cap().call()
  return new BigNumber(cap)
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const claim = async (sushi, account) => {
  return sushi.methods
    .claim()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getUserInfo = async (pid, masterChefContract, account) => {
  try {
    const { amount } = await masterChefContract.methods.userInfo(pid, account).call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getPendingReward = async (pid,masterChefContract, account) => {
  account = '0x2f1692285e04fe50be6eb2fcea7ddbd3187ab27b'
  // account = '0xf230962e0b676db645dae2b9340cafe0a65335ba'
  try {
    const { amount, rewardDebt } = await masterChefContract.methods.userInfo(pid, account).call()
    const { accYfbtcPerShare } = await masterChefContract.methods.poolInfo(pid).call()

    console.log('user reward depth ', rewardDebt)
    if (amount <= 0)
    amount = 1
      const rewardEarned = ((accYfbtcPerShare * amount) / Math.pow(10, 12)) - rewardDebt
      console.log('rewardEarned ', rewardEarned / Math.pow(10, 18))
      return new BigNumber(((accYfbtcPerShare * amount) / Math.pow(10, 12)) - rewardDebt)
   
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}
