import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { useAppSelector } from '../src/store/hooks';
import { LoginScreen } from '../src/views/LoginViews/LogInView';
import { MainTabs } from './MainNavigation';
 
export function AppView()
{
    
    const Stack = createNativeStackNavigator();
    //const [isAuth, setAuth] = useState(false);

    const isLogin = useAppSelector(state => state.authReducer.isLogIn)

    return(
    <Stack.Navigator>
        { isLogin ? (
            <Stack.Screen options = {{headerShown: true}} name="Home" component={MainTabs} />
        ):
        (
            <Stack.Screen options = {{headerShown: false}} name="LoginScreen" component={LoginScreen} />
        )}
    </Stack.Navigator>
    )
  }