
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, StatusBar,
    ScrollView, Picker, Image, SafeAreaView, ActivityIndicator,
    images, Dimensions, ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
// import IconEntypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";

class UpdatePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            updateLoader: true,
        }
    }
    UNSAFE_componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.modalOpen) {
        //      this.setState({ isModalVisible: true });
        //      // alert("working modal")
        //      // _toggleModal = () =>
        //      // this.setState({ isModalVisible: !this.state.isModalVisible });
        //      this.props.emailSending()

        // }


    }

    upDatePassword() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ height: this.state.screenHeight / 1.5, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('../../assets/lockforget.png')} resizeMode="contain"
                                style={{ height: "40%", width: "40%", }}
                            />

                            <Text style={{ textAlign: "center", fontSize: 25 }}>
                                Password reset{"\n"}instructions sent
                            </Text>
                            <Text style={{ textAlign: "center", marginTop: 20 }}>
                                You'll shortly receive an email with {"\n"} instructions to setup a new password.
                            </Text>
                            {/* <TouchableOpacity style={{ marginBottom: 10, marginTop: 10, backgroundColor: "#E94E1B", width: "95%", height: "15%", justifyContent: "center", alignItems: "center" }}
                                onPress={() => this.upDatePassword()}>
                                <Text style={{ fontSize: 13, color: "white" }}>{"ok"}</Text>
                            </TouchableOpacity> */}
                            <View
                                style={{ width: "85%", height: 50, marginTop: 50, }}
                            >
                                <TouchableOpacity
                                    onPress={() => this.upDatePassword()}>

                                    <ImageBackground source={require('../../assets/buttonBackground.png')} resizeMode="contain"
                                        style={{ height: "100%", width: "100%", justifyContent: "center", }}
                                    >
                                        <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Ok</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}


let mapStateToProps = state => {
    return {
        // str: state.root.str,
        // userDetails: state.root.userDetails,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);

