import React from 'react'
import Loader from '@components/Loader/Loader'
import { MainPage } from '@pages/main-page'
import { useAppSelector } from '@hooks/typed-react-redux-hooks';




const Main: React.FC = () => {
  
  const loading = useAppSelector(state => state.loading.isLoading);
  return (
    <>
    {loading && <Loader />}
         <MainPage />
    </>
  )
}

export default Main