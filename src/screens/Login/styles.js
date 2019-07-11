import { StyleSheet } from 'react-native';
import { Colors } from '../../helpers/Constants';

export const ForgotPasswordStyles = StyleSheet.create({
  forgotPasswordTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  forgotPasswordText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  forgotPasswordButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});

export const LoginFormStyles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});

export const LoginScreenStyles = StyleSheet.create({
    container : {
      backgroundColor: Colors.Primary,
      flex: 1,
      alignItems:'center',
      justifyContent :'center'
    },
});

export const LogoStyles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  image : {
    width:40, 
    height: 70
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});

export const SignupStyles = StyleSheet.create({
  textContent: {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  text: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  button: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
});