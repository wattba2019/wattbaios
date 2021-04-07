import React, { Component } from "react";
import {
    View, StyleSheet, Platform,
    StatusBar, TouchableOpacity,
    Text, ScrollView, Picker, Alert,
} from 'react-native';
// import { CheckBox, Content, Container } from 'native-base';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { setShopServices, } from '../../Store/Action/action';
import CheckBox from 'react-native-check-box'

class ChooseService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCost: 0,
            types3: [{ label: 'Male', value: "male" }, { label: 'Female', value: "female" },],
            value3: "male",
            value3Index: 0,
            allItems: [],
        };
    }

    UNSAFE_componentWillMount() {
        let { shopServices, } = this.props
        console.log(shopServices, "shopServices")
        this.setState({
            shopServices: shopServices.slice(0)
        })
    }

    chooseYourService = (key, index,) => {
        let { shopServices, totalCost } = this.state
        let price = totalCost
        let cloneAllServices = shopServices
        let selectedService = shopServices[index]
        if (selectedService.selected != true) {
            selectedService.selected = true
            price = price + Number(selectedService.price)
        }
        else {

            if (selectedService.extraServices.length) {
                for (let index = 0; index < selectedService.extraServices.length; index++) {
                    if (selectedService.extraServices[index].selected === true) {
                        price = price - Number(selectedService.extraServices[index].price)
                    }
                    selectedService.extraServices[index].selected = false
                }
            }


            selectedService.selected = false
            price = price - Number(selectedService.price)
            console.log(selectedService, "selectedExtraService")

        }
        cloneAllServices.splice(index, 1, selectedService)
        this.setState({
            shopServices: cloneAllServices,
            totalCost: price
        })
    }

    chooseYourExtraService = (key, index, serviceIndex) => {
        let { shopServices, totalCost } = this.state
        let price = totalCost
        let cloneAllServices = shopServices
        let selectedService = cloneAllServices[serviceIndex].extraServices[index]
        if (selectedService.selected != true) {
            selectedService.selected = true
            price = price + Number(selectedService.price)
        }
        else {
            selectedService.selected = false
            price = price - Number(selectedService.price)

            // console.log(selectedService, "selectedService")
        }

        this.setState({
            shopServices: cloneAllServices,
            totalCost: price
        })
    }

    next = () => {
        let { value3, totalCost, shopServices } = this.state
        let allItems = []
        let renderSelectedService = []
        let extraServicesSelected = []
        for (let index = 0; index < shopServices.length; index++) {
            const extraServices = shopServices[index].extraServices;
            const _id = shopServices[index]._id;
            const service = shopServices[index];
            const selectedBolean = shopServices[index].selected;
            if (selectedBolean && selectedBolean === true) {
                for (let j = 0; j < extraServices.length; j++) {
                    const extraServiceElement = extraServices[j];
                    if (extraServiceElement.selected && extraServiceElement.selected === true) {
                        extraServicesSelected.push(extraServiceElement)
                    }
                }
                allItems.push(_id)
                renderSelectedService.push(service)
            }
        }

        if (allItems.length != 0) {
            // console.log(renderSelectedService, "renderSelectedService")
            Actions.Bookappointment({ chosenItems: allItems, extraServicesSelected: extraServicesSelected, gendre: value3, totalCost: totalCost, pack: false, renderSelectedService })
        }
        else {
            Alert.alert("Please choose service")
        }
    }

    componentWillUnmount() {
        this.getServices()
    }

    getServices() {
        let urlm = `${this.props.bseUrl}/servicesget/${this.props.shop._id}`
        axios({
            method: 'get',
            url: urlm,
        })
            .then(result => {
                let data = result.data.data
                // console.log(data, "DATA_FROM_API_SERVICES_CHOOSE_SERVICES")
                this.props.setShopServices(data)
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_SERVICES")
                    this.props.setShopServices([])
                }
                else {
                    alert(err.response.data.message)
                }
            })
    }


    render() {
        const { totalCost, shopServices } = this.state
        return (
            <View style={{
                flex: 1,
                width: "100%",
                backgroundColor: "white",
                paddingHorizontal: 10,
            }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={{
                    flex: 0.7,
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'grey',
                    marginTop: Platform.OS === 'ios' ? 32 : 0,

                    // backgroundColor:"red"
                }}>

                    <View style={{ position: "absolute", zIndex: 1 }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            {/* <TouchableOpacity onPress={() => Actions.ServiceDetaild()}> */}
                            <Entypo name="cross" style={{ marginLeft: 15, top: 10, color: "black", fontSize: 25 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{ alignItems: "center", fontSize: 16 }}>Book An Appointment</Text>
                    </View>
                </View>

                <View style={{
                    flex: 8,
                    width: "100%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"

                }}>
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ width: "90%", }}
                    >
                        {/* <Text style={{ fontSize: 20, fontWeight: "normal" }}>Gender</Text> */}
                        <View style={{ width: "100%", marginTop: -10 }}>
                            {/* <RadioForm formHorizontal={true} animation={true} >
                                {this.state.types3.map((obj, i) => {
                                    var onPress = (value, index) => {
                                        this.setState({
                                            value3: value,
                                            value3Index: index
                                        })
                                    }
                                    return (
                                        <RadioButton labelHorizontal={true} key={i} >
                                            <RadioButtonInput
                                                animation={true}
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.value3Index === i}
                                                onPress={onPress}
                                                buttonInnerColor={'#FD6958'}
                                                buttonOuterColor={this.state.value3Index === i ? '#FD6958' : '#8E8E93'}
                                                buttonSize={15}
                                                buttonOuterSize={30}
                                                buttonStyle={{ marginLeft: 10 }}
                                                buttonWrapStyle={{ marginLeft: 10, }}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                onPress={onPress}
                                                labelStyle={{ fontWeight: 'bold', color: this.state.value3Index === i ? '#FD6958' : '#8E8E93' }}
                                                labelWrapStyle={{ marginLeft: 10 }}
                                            />
                                        </RadioButton>
                                    )
                                })}
                            </RadioForm> */}

                            <Text style={{ fontSize: 20, fontWeight: "normal", marginTop: 20 }}>Choose your service(s)</Text>

                            {
                                (shopServices) ? (
                                    shopServices.map((key, index) => {
                                        return (
                                            <View key={index} style={{ flex: 1, marginTop: 10, }}>

                                                <TouchableOpacity onPress={() => this.chooseYourService(key, index)}
                                                    style={{ flex: 1, flexDirection: "row", borderBottomColor: "#E6E6EE", borderBottomWidth: key.selected ? 1.5 : 0.5, padding: 5, height: 40 }}>


                                                    {/* <View style={{ flex: 0.4, alignItems: "center", flexDirection: "row", alignSelf: "center", }}>
                                                                <CheckBox onPress={() => this.chooseYourService(key, index)} color="#FD6958" checked={key.selected} />
                                                        </View> */}

                                                    <View style={{ flex: 0.4, alignItems: "center", flexDirection: "row", }}>
                                                        <CheckBox
                                                            style={{ flex: 1, padding: 10, }}
                                                            checkBoxColor="#FD6958"
                                                            onClick={() => this.chooseYourService(key, index)}
                                                            isChecked={key.selected}
                                                        />
                                                    </View>



                                                    <View style={{ flex: 1.7, alignItems: "center", flexDirection: "row", }}>
                                                        <Text style={{ fontWeight: "normal", fontSize: 15 }}>{key.serviceName}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, alignItems: "center", justifyContent: "flex-end", flexDirection: "row", }}>
                                                        <Text style={{ fontWeight: "normal", fontSize: 15 }}>{key.price}</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                {
                                                    (key.selected) ? (
                                                        <Text style={{ fontWeight: "bold", marginTop: 10, marginLeft: "5%", textDecorationLine: 'underline', }}>{"Extra Services"}</Text>
                                                    ) : null
                                                }

                                                {
                                                    (key.selected) ? (
                                                        key.extraServices.map((item, indexing) => {
                                                            return (
                                                                <View key={indexing}>
                                                                    <TouchableOpacity onPress={() => this.chooseYourExtraService(item, indexing, index)}
                                                                        style={{ flex: 1, flexDirection: "row", borderBottomColor: "#E6E6EE", borderBottomWidth: 0.5, padding: 15 }}>
                                                                        <View style={{ flex: 0.4, alignItems: "center", flexDirection: "row", }}>
                                                                            {/* <CheckBox onPress={() => this.chooseYourExtraService(item, indexing, index)} color="#FD6958" checked={item.selected} /> */}

                                                                            <CheckBox
                                                                                style={{ top: -2 }}
                                                                                checkBoxColor="#FD6958"
                                                                                onClick={() => this.chooseYourExtraService(item, indexing, index)}
                                                                                isChecked={item.selected}
                                                                            />

                                                                        </View>
                                                                        <View style={{ flex: 1.7, flexDirection: "row", }}>
                                                                            <Text style={{ fontWeight: "normal", fontSize: 14, color: "#8E8E93" }}>{item.serviceName}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 0.5, justifyContent: "flex-end", flexDirection: "row", }}>
                                                                            <Text style={{ fontWeight: "normal", fontSize: 14, color: "#8E8E93" }}>{item.price}</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        })

                                                    ) : null
                                                }



                                            </View>
                                        )
                                    })
                                ) : null
                            }

                        </View>
                    </ScrollView>
                </View>

                <View style={{
                    flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", borderTopColor: "grey", borderTopWidth: 0.5,
                }}>
                    <View style={{
                        flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", width: "90%", marginHorizontal: "5%",
                    }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", }}>
                            <Text style={{ fontWeight: "normal", }}>Total</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>GBP {totalCost}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", }}>
                            <TouchableOpacity
                                onPress={() => this.next()}
                                style={{ width: "70%", height: 42, justifyContent: "center", alignItems: "center", backgroundColor: "#FD6958", borderRadius: 8 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 12, color: "#ffffff", textAlign: "center" }}>Proceed to Checkout</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

let mapStateToProps = state => {
    // console.log(state, 'mapStateToProps')
    return {
        shopServices: state.root.shopServices,
        bseUrl: state.root.bseUrl,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setShopServices: (services) => {
            dispatch(setShopServices(services))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseService);

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 30,
    },
});