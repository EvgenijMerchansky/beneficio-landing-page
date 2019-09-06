import React from 'react';

import { LoadScript } from 'components/LoadScript';
import * as S from './styles';

//icons
import faMoney from '../../icons/coin.svg';

function SalaryButton({ startLoading, buy }) {

  return (
    <LoadScript startLoading={startLoading} src="https://cdn.paddle.com/paddle/paddle.js">
      {ready => (
        <S.Button href="https://beneficio-salary.herokuapp.com/">
          <S.AppleIcon icon={faMoney} />
          <span>Beneficio salary</span>
        </S.Button>
      )}
    </LoadScript>
  );
}

export default SalaryButton;
