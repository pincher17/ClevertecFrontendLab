import { Link } from '@components/LinkStyle/LinkStyle.styles'
import styled from 'styled-components'

export const Footers = styled('div')`
    margin-top: 189px;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media screen and (max-width: 600px) {
        margin-top: 32px;
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        margin-bottom: 20px;
        padding: 0;
  }
;
`

export const LinkReviews = styled(Link)`
   padding: 0 15px;
`