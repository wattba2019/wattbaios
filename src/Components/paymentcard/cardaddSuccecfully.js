
import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ActivityIndicator,
    images, Dimensions, ImageBackground, Platform, PermissionsAndroid
} from 'react-native';
import { connect } from "react-redux";
import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo';

class CardAddSuccessfully extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: true,
            updateLoader: true,
            loader: false
        }
    }
    UNSAFE_componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
        })
    }

    closeModal() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }


    render() {
        const { loader, err } = this.state
        const { isModalVisible } = this.props
        console.log(isModalVisible, "isModalVisible")

        return (
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{ height: this.state.screenHeight / 1.5, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ backgroundColor: "white", width: "90%", height: "100%", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('../../../assets/paymentcardadd.png')} resizeMode="contain"
                                style={{ height: "80%", width: "80%", }}
                            />
                            <Text style={{ textAlign: "center", fontSize: 18, top: -50 }}>
                                Your Payment card  {"\n"}
                                has been added successfully
                            </Text>

                            <View style={{ width: "85%", height: 50, marginBottom: 70, }}>
                                <TouchableOpacity onPress={() => this.props.closeModal()}>
                                    <ImageBackground
                                        source={require('../../../assets/buttonBackground.png')}
                                        resizeMode="contain"
                                        style={{ height: "100%", width: "100%", justifyContent: "center", }}
                                    >
                                        {
                                            (loader != true) ? (
                                                <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>Home</Text>
                                            ) : <ActivityIndicator color="white" />
                                        }
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
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setUserCurrentLocation: (position, bolean) => {
            dispatch(setUserCurrentLocation(position, bolean));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(CardAddSuccessfully);

