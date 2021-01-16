import { User } from '@centrifuge/gateway-lib/models/user';
import React from 'react';
import { AppContext } from '../App';
import { NotificationProvider } from '../components/NotificationContext';
import { AxisTheme } from '@centrifuge/axis-theme';
import {defaultToken, defaultUser} from './default-data';




// Wrap component with Application Context;
export const withApplicationContext = (Component, user: User = defaultUser, setUser = () => {
}, token = defaultToken, setToken = () => {}) => {
  return (<AppContext.Provider value={{ user, setUser, token, setToken }}>
    {Component}
  </AppContext.Provider>);
};

// Wrap component with Notification Context;
export const withNotificationContext = (Component) => {
  return (<NotificationProvider>
    {Component}
  </NotificationProvider>);
};

// Wrap in Axis Theme
export const withAxis = (Component) => {
  return <AxisTheme full={true}>
    {Component}
  </AxisTheme>;
};

export const withAllProvidersAndContexts = (Component, user: User = defaultUser, setUser = () => {
}, token = defaultToken, setToken = () => {}) => {
  return withAxis(
    withApplicationContext(
      withNotificationContext(
        Component,
      ),
      user,
      setUser,
      token,
      setToken
    ),
  );
};

