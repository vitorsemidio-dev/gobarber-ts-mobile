import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#312e38' }} />
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    </>
  );
};

export default App;
