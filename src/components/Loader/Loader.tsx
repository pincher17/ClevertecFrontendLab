import React from "react";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "./Loader.json";
import { Blure, Wrapper, WrapperLoader } from "./Loader.styles";
import blure from '../../assets/img/Blure.png';

const Loader: React.FC = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true
  };

  const { View } = useLottie(options);

  return (
  <Wrapper  data-test-id='loader'>
    <Blure src={blure} />
    <WrapperLoader>
      {View}
    </WrapperLoader>
  </Wrapper>
  );
}

export default Loader