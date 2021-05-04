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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Farms: React.FC = () => {

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
                                </div>
                                <p className="sub-text"> Claim is now Completed. Thank you. Look forward To Our Yield Farming End Of October.</p>
                            </CardContent>
                        </Card>
                    </StyledCardWrapperOne>
                    <Spacer /><Spacer />
                    <StyledCardWrapperTwo>
                        <Card>
                            <CardContent>
                                <img src={BtcIcon} alt="" />
                                <div className="ml-4 main-text">
                                    <p>YFBTC farming will start end of the month, for more updates join us on</p>
                                    <div className="mt-1 inner-text">
                                        <span ><a href="https://t.me/yfswap">1. https://t.me/yfswap</a> </span><br/>
                                        <span ><a href="https://twitter.com/yfswap">2. https://twitter.com/yfswap</a> </span><br/>
                                        <span ><a href="https://yfswapfi.medium.com/">3. https://yfswapfi.medium.com/</a> </span><br/>
                                    </div>
                                    <div className="address-div mt-4 p-2"><span className="center"> Please make sure you purchase YFBTC from this contract </span><div className="center">address: 0xff034d12353867fc4228f4ae3e689cd6dcaad120 </div></div>
                                </div>

                                <StyledButtonDiv>
                                    <img src={Unicon} className="unicon" alt=""/>
                                    <a href='https://info.uniswap.org/pair/0x9fb24efec63c6a978efd21bda010099cb4f23707' target='_blank' rel="noopener noreferrer" >
                                      <Button size="ts" variant='normal' text=" BUY YFBTC HERE" />
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

export default Farms
