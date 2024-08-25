import styled from 'styled-components'


export const Wrapper = styled('div')`

`

export const Blure = styled('img')`
 position: fixed;
 z-index: 100;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
`

export const WrapperLoader = styled('div')`
    width: 150px;
    height: 150px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
`