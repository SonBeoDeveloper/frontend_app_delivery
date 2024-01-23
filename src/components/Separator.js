import React from 'react';
import {View} from 'react-native';

const Separator = ({height, width, ...extraProps}) => (
  <View style={{height, width, ...extraProps}} />
);
Separator.defaultprops = {
  height: 0,
  width: 0,
};
export default Separator;
