import React from 'react';

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    setTimeout(() => {
      navigate(name, params)
    }, 1000)
  }
}
