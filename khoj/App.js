import ExploreScreen from './screens/ExploreScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NewPostScreen from './screens/NewPostScreen';
import MoreInfo from './screens/MoreInfo';
import CommentSection from './screens/CommentSection';
import { StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartPage from "./components/StartPage"
import LoginPage from './components/Authentication/LoginPage';
import SignupPage from './components/Authentication/SignupPage';
import ProfilePage from './components/Profile/ProfilePage';
import EditPage from './components/Profile/EditPage';
import Footer from './components/Footer';
import ExplorePage from './components/ExplorePage/ExplorePage';
import TravelMate from './components/travelMate/TravelMate';
import FindBuddy from './components/travelMate/FindBuddy';
import Requests from './components/travelMate/Requests';
import Chat from './components/travelMate/Chat';
// import {app} from './firebase'
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyAlY36y1_I16FPTU0UHQBHk4FvSIqamxwo",
//   authDomain: "khoj-65c23.firebaseapp.com",
//   projectId: "khoj-65c23",
//   storageBucket: "khoj-65c23.appspot.com",
//   messagingSenderId: "427182530082",
//   appId: "1:427182530082:web:1fe26b80b0e79c5436b47b",
//   measurementId: "G-8P0JBFXFZK"
// };
// const app = initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginPage}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
        />
        <Stack.Screen 
          name="Profile"
          component={ProfilePage}
        />
        <Stack.Screen 
          name="Edit"
          component={EditPage}
        />
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
        />
        <Stack.Screen
          name="ExplorePage"
          component={ExplorePage}
        />
        <Stack.Screen
          name="Add Post"
          component={NewPostScreen}
        />
        <Stack.Screen
          name="More Info"
          component={MoreInfo}
        />
        <Stack.Screen
          name="Commment Section"
          component={CommentSection}
        />
        <Stack.Screen
          name="Footer"
          component={Footer}
        />
        <Stack.Screen
          name="TravelMate"
          component={TravelMate}
        />
        <Stack.Screen
          name="FindBuddy"
          component={FindBuddy}
        />
        <Stack.Screen
          name="Requests"
          component={Requests}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
