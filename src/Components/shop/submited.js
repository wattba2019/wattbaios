import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView

} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';


class Submited extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    render() {
        return (
            <View
                contentContainerStyle={styles.contentContainer}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "white"
                }}
            >
                <StatusBar backgroundColor="white" barStyle="dark-content" />



                {/* //body// */}

                <View style={{
                    // flex: 8,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white"
                }}>

                    <Image source={require('../../../assets/Group55279.png')} resizeMode="contain"
                        style={{ left: 0, height: "60%", width: "60%", }}
                    />

                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
                        Your Appointment request{"\n"}submitted
                  </Text>

                    <View
                        style={{ width: "85%", height: 50, marginTop: 30, }}
                    >
                        <TouchableOpacity
                            onPress={() => Actions.AppContainer({ rout: "Appointments" })}
                        >
                            <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                style={{ height: "100%", width: "100%", justifyContent: "center", }}
                            >
                                <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white" }}>View My Appointments</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
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
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Submited);


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingBottom: 0,
        backgroundColor: "white",

    },

});