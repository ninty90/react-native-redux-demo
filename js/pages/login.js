'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  TextInput,
  Image,
  AlertIOS,
} from 'react-native';

import { connect } from 'react-redux';

import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import { logIn, skipLogin } from '../actions/user';

import commonStyle from '../styles/common';
import loginStyle from '../styles/login';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'sup1',
            password: '123456',
            btnFlag: true,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){

        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true){
            //will redirect
            
            this.refs.modal.close();
            this.toMain();
            return false;
        }
        if(nextProps.status == 'doing'){
            //loggining
            this.refs.modal.open();
            return false;
        }
        if(nextProps.status == 'error' || nextProps.status == 'done'){
            this.refs.modal.close();
            return false;
        }

        return true;
    }

    toMain(){
        const {router} = this.props;
        router.toMain();
    }

    handleLogin(){
        if(!this.state.username || !this.state.password){
            AlertIOS.alert(
                 'username, password?'
            );
            return;
        }
        let opt = {
            'name': this.state.username,
            'password': this.state.password,
        };
        this.props.dispatch(logIn(opt));
    }

    handleRegister(){
        const {dispatch} = this.props;
        dispatch(skipLogin());
    }

    onChangeName(text){
        this.setState({'username': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }


    render(){
        return (
          <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
            <Image source={require('../imgs/icons/bg.png')} style={{resizeMode: 'stretch'}}>
                <View style={loginStyle.loginMain}>
                    <View style={loginStyle.loginMainCon}>
                        <View style={loginStyle.comCulture}>
                            <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>Welcome</Text>
                            <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>You are the best.</Text>
                        </View>
                        <View style={loginStyle.formStyle}>
                            <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                <Image source={require('../imgs/icons/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput 
                                    ref="login_name" 
                                    placeholder='username' 
                                    style={loginStyle.loginInput} 
                                    onChangeText={this.onChangeName} />
                            </View>
                            <View style={loginStyle.formInput}>
                                <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput 
                                    ref="login_psw"  
                                    style={loginStyle.loginInput} 
                                    secureTextEntry={true}
                                    placeholder='password' 
                                    onChangeText={this.onChangePswd} />
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <View style={loginStyle.forget}>
                                <View>
                                    <Image source={require('../imgs/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                                </View>
                                <View >
                                    <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
                                </View>
                                </View>
                            </View>
                        </View>
                        <View style={loginStyle.btn}>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn1} onPress={this.handleLogin}>Log in</Text>
                            </View>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn2} onPress={this.handleRegister}>Skip</Text>
                            </View>
                        </View>
                    </View>
                    
                    
                </View>
            </Image>

           <ModalBox style={[commonStyle.modal,commonStyle.justAlign]} 
                    ref={"modal"} backdropPressToClose={false} 
                     animationDuration={10}
                     backdrop={true}
                     backdropOpacity={0}
                     >
                <Spinner style={commonStyle.spinner} 
                    isVisible={true} 
                    size={50} type="Arc" color="#FFFFFF"/>
            </ModalBox>

          </View>
        );
    }
}



function select(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
    }
}


export default connect(select)(LoginPage);


