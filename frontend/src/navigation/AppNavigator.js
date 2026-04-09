import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import { apiService } from '../services/reactNativeApi';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [token, setToken] = useState(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const hydrateAuth = async () => {
      const storedToken = await apiService.getAuthToken();
      setToken(storedToken);
      setIsHydrating(false);
    };

    hydrateAuth();
  }, []);

  const handleLoginSuccess = (nextToken) => {
    setToken(nextToken);
  };

  const handleLogout = async () => {
    await apiService.clearAuthToken();
    setToken(null);
  };

  if (isHydrating) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f9' }}>
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
        {token ? (
          <Stack.Screen name="Dashboard" options={{ title: 'Dashboard' }}>
            {(props) => <DashboardScreen {...props} onLogout={handleLogout} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" options={{ title: 'Sign In' }}>
            {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
