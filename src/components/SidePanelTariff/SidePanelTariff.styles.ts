import styled from 'styled-components';

export const TableTariff = styled('div')`

`
export const HeadTable = styled('div')`
    display: flex;
    margin-bottom: 24px;
    justify-content: flex-end;
`
export const HeadColumnFree = styled('div')`
 width: 56px;
 background-color: rgba(240, 240, 240, 1);
 font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  text-align: center;
  height: 24px;
  align-content: center;
  margin-right: 14px;
`

export const HeadColumnPro = styled('div')`
 width: 56px;
 background-color: rgba(240, 245, 255, 1);
 color: rgba(29, 57, 196, 1);
 text-align: center;
 font-family: 'Inter';
  font-size: 12px;
  font-weight: 500;
  line-height: 15.6px;
  text-align: center;
  height: 24px;
  align-content: center;
`

export const Line = styled('div')`
    display: flex;
    margin-bottom: 16px;
    @media screen and (max-width: 400px) {
      justify-content: space-between;
  }
`

export const TitleWrapper = styled('div')`
    width: 234px;
`

export const Title = styled('span')`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 400;
  line-height: 18.2px;
  padding: 0;
`
export const WrapperCheckColumn = styled('div')`
    display: flex;
    justify-content: space-between;
`

export const CheckColumnFree = styled('div')`
 width: 56px;
 text-align: center;
 margin-right: 14px;
`
export const CheckColumnPro = styled(CheckColumnFree)`
 margin-right: 0;
`

export const LastLine = styled('div')`
    display: flex;
    margin-bottom: 50px;
    @media screen and (max-width: 400px) {
      margin-bottom: 33px;
  }
`

export const WrapperPricies = styled('div')`
   padding-top: 12px;
   width: 100%;
   @media screen and (max-width: 400px) {
      margin-bottom: 80px;
  }
`

export const TitlePrices = styled('span')`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 700;
  line-height: 18.2px;
  padding: 0;
`

export const Price = styled(CheckColumnFree)`
font-weight: 500;
font-size: 16px;
`

export const WrapperPriceAndRadio = styled(WrapperCheckColumn)`
    align-items: center;
`

export const ButtonWrapper = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(240, 240, 240, 1);
    width: 100%;
    padding: 12px 16px;
    left: 0;
    background-color: white;
`;