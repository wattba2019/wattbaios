import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
import ServiceChild1 from '../../Components/shop/serviceChild1';
import Packages from '../../Components/shop/packages';

class Services extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catogeries: "services"
        }
    }
    render() {
        let { shop, services, busy, packages } = this.props
        console.log(services, "services")
        return (
            <View>
                <View style={{ alignItems: "center" }}>
                    <View style={{
                        marginTop: 25,
                        width: "90%",
                        height: 45,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        overflow: "hidden", borderColor: "#FD6958", borderWidth: 1

                    }}>
                        <View style={{
                            flex: 1, flexDirection: "row", borderRadius: 5, height: "100%",
                        }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: this.state.catogeries === "services" ? "#FD6958" : "#fff",
                                }}
                                onPress={() => { this.setState({ catogeries: "services" }) }}
                            >
                                <Text style={{ color: this.state.catogeries === "services" ? "#fff" : "#FD6958", fontSize: 13 }}>Services</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: this.state.catogeries === "packages" ? "#FD6958" : "#fff",
                                }}
                                onPress={() => { this.setState({ catogeries: "packages" }) }}
                            >
                                <Text style={{ color: this.state.catogeries === "packages" ? "#fff" : "#FD6958", fontSize: 13 }}>Packages & Offers</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    (this.state.catogeries === "services") ?
                        (
                            <ServiceChild1 busy={busy} services={services} shop={shop} />
                        ) :
                        (
                            this.state.catogeries === "packages" ?
                                <Packages busy={busy} packages={packages} />
                                : null
                        )
                }
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
export default connect(mapStateToProps, mapDispatchToProps)(Services);

