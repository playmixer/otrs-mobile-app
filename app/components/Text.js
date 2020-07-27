import React from 'react';
import styled from 'styled-components/native';
import * as appColor from '../modules/colors'

const Text = styled.Text`
  ${({ main, dark, color }) => {
    switch(true) {
      case main:
        return `color: ${appColor.main}`;
      case dark:
        return `color: #fff`;
      case color:
        return `color: ${color}`;
      default:
        return `color: black`;
    }
  }}

  text-align: ${({ center, right }) => {
    switch (true) {
      case center:
        return 'center';
      case right:
        return 'right';
      default:
        return 'left';
    }
  }};

  ${({ title, large, small }) => {
    switch (true) {
      case title:
        return 'font-size: 32px';
      case large:
        return 'font-size: 20px';
      case small:
        return 'font-size: 13px';
    }
  }}
`;

export default Text;