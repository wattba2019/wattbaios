import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, FlatList
} from 'react-native';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
//7 icons import//
import womenHairstyling from '../../../assets/women-hairstyling.png';
import surface from '../../../assets/surface-1.png';
// import surface1 from '../../../assets/surface1.png';
import surface2 from '../../../assets/surface-2.png';
import dye from '../../../assets/dye.png';
import makeup from '../../../assets/makeup.png';
import mascara from '../../../assets/mascara.png';
import iconForService from '../../../assets/iconForServices.png';

class ServiceChild1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        let { services, busy, shop } = this.props
        let images = [womenHairstyling, surface, surface2, dye, makeup, mascara]
        // let images = [iconForService]
        return (
            <View style={{ paddingVertical: 5, paddingHorizontal: 15, width: "90%", marginHorizontal: "5%" }}>
                {
                    (services) ? (
                        services.map((key, index) => {
                            // console.log(key, index, "INSIDE_MAP")
                            return (
                                <TouchableOpacity key={index}
                                    // onPress={() => this.serviceDetails(key)}
                                    onPress={() => Actions.ServiceDetaild({ serviceDetails: key, busy, shop })}
                                    style={{ marginTop: 25, flexDirection: "row", flex: 1 }}>
                                    <View style={{ flex: 2 }}>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 35, height: 35 }}
                                            source={iconForService}
                                        // source={images[Math.floor(Math.random() * 6)]}
                                        />
                                    </View>
                                    <View style={{ flex: 7 }}>
                                        <Text>{key.categoryName}</Text>
                                        {/* <Text>{key.serviceName}</Text> */}
                                        {/* <Text style={{ fontSize: 11, color: "grey" }}>{key.extraServices.length} Types</Text> */}
                                        <Text style={{ fontSize: 11, color: "grey" }}>{key.serviceName}</Text>
                                    </View>
                                    <TouchableOpacity style={{ flex: 1 }}
                                        onPress={() => Actions.ServiceDetaild({ serviceDetails: key, busy, shop })}
                                    >
                                        <Text style={{ fontSize: 11, color: "#FD6958" }}>View</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        })
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
let mapStateToProps = state => {
    return {
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceChild1);

