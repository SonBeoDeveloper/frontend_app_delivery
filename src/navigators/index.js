/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen,
  WelcomeScreen,
  SigninScreen,
  SignupScreen,
  ForgetPasswordScreen,
  RegisterPhoneScreen,
  VerificationScreen,
  MyCardScreen,
  AddCardSceen,
  CheckoutScreen,
  SuccessScreen,
  DeliveryStatus,
  DetailScreen,
  MapScreen,
  HistoryScreen,
  AddCoupon,
  EditAcount,
  ResetPasswordScreen,
  OrderStatusScreen,
} from '../screens';
// import {Connect, connect} from 'react-redux';
import {UseSelector, useDispatch, useSelector} from 'react-redux';
import {GeneralAction} from '../actions';
import BottomNavigator from './BottomNavigator';
const Stack = createStackNavigator();

const Navigators = () => {
  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    state => state?.generalState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}
            <Stack.Screen name="SignIn" component={SigninScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgetPasswordScreen}
            />
            <Stack.Screen
              name="RegisterPhone"
              component={RegisterPhoneScreen}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name="MyCard" component={MyCardScreen} />
            <Stack.Screen name="AddCard" component={AddCardSceen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Coupon" component={AddCoupon} />
            <Stack.Screen name="EditAcount" component={EditAcount} />
            <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
            <Stack.Screen
              name="Success"
              component={SuccessScreen}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen
              name="DeliveryStatus"
              component={DeliveryStatus}
              options={{gestureEnabled: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigators;
