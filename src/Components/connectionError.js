
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { connect } from "react-redux";

class ErrorAlert extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    UNSAFE_componentWillMount() {
    }

    render() {
        return (

            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View
                    style={{
                        position: "absolute", zIndex: 1, backgroundColor: "white", width: "80%", height: 165,
                        marginHorizontal: "9.5%", marginVertical: "20%",
                        flexDirection: "column",
                        borderWidth: 1,
                        marginVertical: "60%",
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                        borderColor: '#ddd',
                        borderBottomWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 14,
                        elevation: 115,
                        borderColor: '#F86078',
                    }}>

                    <View style={{ height: 40, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#F86078" }}>
                        <View
                            style={{ flexDirection: "row", color: "white" }}
                        >
                            <Text style={{ color: "white", fontFamily: 'Verdana-Bold', }}>
                                Connection Error !
                          </Text>
                        </View>

                    </View>
                    <View style={{ height: 40, padding: 10, flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <View >
                            <Text style={{ textAlign: "center", fontFamily: 'Verdana-Bold', color: "grey" }}>
                                Please ensure your device is connected to the internet and try again.
                           </Text>
                        </View>

                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity style={{
                            justifyContent: "center", alignItems: "center", height: 45, width: "80%", marginTop: 30,
                            backgroundColor: "#F86078", borderWidth: 0.75, borderColor: '#F86078',
                        }}
                            onPress={() => { this.props.modalClose() }}
                        >
                            <Text style={{ color: "white", fontWeight: "bold", fontFamily: 'Verdana-Bold', textAlign: "center" }}> Ok </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert);

