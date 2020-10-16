import React from 'react'
import formar from '../../assets/img/formar.png'
import Button from '../../components/Button'
import styled from 'styled-components'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import Spacer from '../../components/Spacer'
import BtcIcon from "../../assets/img/btc.svg"
import "./sticky.css"
import Unicon from "../../assets/img/unicon.png"
import useSushi from '../../hooks/useSushi'
import useClaim from '../../hooks/useClaim'
import { getSushiContract } from '../../sushi/utils'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Farms: React.FC = () => {

  const { onClaim } = useClaim()
    return (
        <StyledPage>
          <ToastContainer />
            <StyledMain>
                <StyledIcon><img src={formar} height="120" alt="Img not found  "/></StyledIcon>
                <StyledTitle>Get YFBTC Seed today to farm YFBTC</StyledTitle>
                <StyledCardsWrapper>
                    <StyledCardWrapperOne>
                        <Card>
                            <CardContent>
                                <img src={BtcIcon} alt="" />
                                <div className="ml-3 main-text">
                                    <p>CLAIM FREE TOKEN</p>
                                    <p className="sub-text">YOU need to have ETH in your <span className="text-color">METAMASK ACCOUNT</span> to Claim <span className="text-col">YFBTC</span></p>
                                </div>
                                <p className="ml-3 main-text">YOU will be eligible for <span className="text-col">FREE 0.1 YFBTC tokens.</span></p>
                                <StyledButton>
                                    <Button size="ps" variant='normal' text="DO NOT CLAIM YFBTC" onClick={async ()=> {
                                        try{
                                          const result = await onClaim()
                                        } catch(error) {
                                          console.log(error)
                                          if(error.message.includes('Cannot read property ')) {
                                            toast.error('Please Unlock Your wallet');

                                          } else{
                                            toast.error(error.message);

                                          }
                                          // NotificationManager.error('Please Check your wallet connection');
                                        }
                                    }}/>
                                </StyledButton>
                            </CardContent>
                        </Card>
                    </StyledCardWrapperOne>
                    <Spacer /><Spacer />
                    <StyledCardWrapperTwo>
                        <Card>
                            <CardContent>
                                <img src={BtcIcon} alt="" />
                                <div className="ml-4 main-text">
                                    <p>PRIVATE CROWDFUNDING</p>
                                    <p className="sub-text">In order to start the Uniswap trading process, <span className="text-color">1%</span> of <span className="text-color">21,000 YFBTC <br />(210 YFBTC)</span> will be sold in Uniswap in <span className="text">3 stages.</span></p>
                                    <div className="mt-1 inner-text">
                                        <p >6th Oct 2020 = <span className="text-col">70 YFBTC</span> to be added into Uniswap pool </p>
                                        <p>7th Oct 2020 = <span className="text-col">70 YFBTC</span>  to be added into Uniswap pool </p>
                                        <p>8th Oct 2020 = <span className="text-col">70 YFBTC</span>  to be added into Uniswap pool </p>
                                    </div>
                                    <div className="address-div mt-4 p-2"><span className="center"> Please make sure you purchase YFBTC from this contract </span><div className="center">address: 0x236Ba1c2DB0a19D04D84e9Fd4AAB22d10b19C6Cb </div></div>
                                </div>
                                <StyledButtonDiv>
                                    <img src={Unicon} className="unicon" alt=""/>
                                    <a href='https://info.uniswap.org/pair/0x7bbdb8ea1c4b8e253f6bfe4a8365bbc5b683c68b' target='_blank' rel="noopener noreferrer" >
                                      <Button size="ts" variant='normal' text=" DO NOT BUY" />
                                    </a>
                                </StyledButtonDiv>

                            </CardContent>
                        </Card>
                    </StyledCardWrapperTwo>
                </StyledCardsWrapper>
                {/* </div> */}
            </StyledMain>
        </StyledPage>)
}
const StyledTitle = styled.h1`
font-family: Kaushan Script, Handwriting-Dakota;
font-size: 23px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 0.87;
letter-spacing: 0.63px;
text-align: left;
color: #ffffff;
}
`
const StyledIcon = styled.div`
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
  margin-right: 40px;
`
const StyledPage = styled.div``

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(110vh - ${(props) => props.theme.topBarSize * 2.01}px);
`
const StyledCardsWrapper = styled.div`
  margin-top: 20px;
  margin-right : 30px;
  margin-bottom : 40px;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapperOne = styled.div`
  display: flex;
  flex: 1.1;
  width: 370px;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`
const StyledCardWrapperTwo = styled.div`
  display: flex;
  flex: 2;
  width: 400px;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`
const StyledButtonDiv = styled.div`
  width: 190px;
  margin-top : 20px;
  align-self: center;
  position: relative;
  
  @media (max-width: 768px) {
    width: 80%;
  }
`
const StyledButton = styled.div`
  width: 190px;
  margin-top : auto;
  align-self: center;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export default Farms
