import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreatedAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
      initialRouteName="Dashboard"
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="CreatedAppointment" component={CreatedAppointment} />
      <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  );
};

export default AppRoutes;
