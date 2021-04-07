import React, { Component } from "react";
import { View, Image, StatusBar, TouchableOpacity, Text, ScrollView, StyleSheet, Button, ImageBackground, ActivityIndicator } from 'react-native';
// import { connect } from "react-redux";
// import { Actions } from 'react-native-router-flux';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';
// import axios from 'axios';
// class MypaymentCard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     render() {
//         return (
//             <View style={{
//                 flex: 1,
//                 width: "100%",
//                 backgroundColor: "white",
//             }}>
//                 <StatusBar backgroundColor="white" barStyle="dark-content" />

//                 {/* header */}

//                 <View style={{
//                     flex: 0.8,
//                     flexDirection: "row",
//                     width: "100%",
//                     alignItems: "center",
//                     backgroundColor: "#ffffff",
//                     // backgroundColor: "red",
//                     borderBottomColor: "#EAECEF",
//                     borderBottomWidth: 0.5
//                 }}>
//                     <View style={{ position: "absolute" }}>
//                         <TouchableOpacity onPress={() => Actions.pop()}>
//                             <AntDesign name="arrowleft" style={{ marginLeft: 15, color: "#000000", fontSize: 25 }} />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={{
//                         width: "100%",
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}>
//                         <Text style={{ alignItems: "center", color: "#000000", fontSize: 18 }}>My Payment Cards</Text>
//                     </View>
//                 </View>


//                 <View style={{
//                     flex: 8, width: "100%", marginTop: 10,
//                     // backgroundColor: "orange"
//                 }}>

//                     <View style={{ width: "90%", flexDirection: "row", marginHorizontal: "5%" }}>
//                         <Text style={{ alignItems: "center", color: "#000000", fontSize: 16 }}>
//                             Securely manage all your payment cards connected to WattBa
//                             </Text>
//                     </View>


//                     <View style={{
//                         width: "100%", marginTop: 20, flexDirection: "row",
//                         // backgroundColor: "green"
//                     }}>
//                         <View style={{
//                             flexDirection: 'row', justifyContent: 'center',
//                             alignItems: 'center',
//                             flex: 1,
//                             // backgroundColor: "red"
//                         }}>
//                             <ScrollView
//                                 style={{
//                                     // backgroundColor: "grey",
//                                     flex: 1,
//                                     height: 200, padding: 10
//                                 }}
//                                 horizontal={true}
//                                 showsHorizontalScrollIndicator={false}
//                             >

//                                 <TouchableOpacity style={{
//                                     width: 300, justifyContent: "center", alignItems: "center", borderRadius: 15,
//                                     // backgroundColor: "orange"
//                                 }}>
//                                     <ImageBackground source={require('../../../assets/paymentCard.png')} resizeMode="contain"
//                                         style={{
//                                             justifyContent: 'center', width: "100%", height: "100%",

//                                         }}>
//                                         <View style={{ flex: 1, flexDirection: "row-reverse", }}>
//                                             <Image source={require('../../../assets/checkCircle.png')} resizeMode="contain"
//                                                 style={{ height: "40%", width: "40%", top: 20, right: "60%" }}
//                                             />
//                                         </View>

//                                         <View style={{ flex: 1, }}>
//                                             <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold", top: "28%", marginLeft: "70%" }}>9851</Text>
//                                         </View>

//                                         <View style={{ flex: 1, }}>
//                                             <Text style={{ color: 'white', fontSize: 16, marginTop: 15, marginLeft: 30 }}>Nov/2021</Text>
//                                         </View>

//                                         <View style={{ flex: 1, }}>
//                                             <Text style={{ color: 'white', fontSize: 16, marginTop: 7, marginLeft: 30 }}>Marvel Faseun</Text>
//                                         </View>

//                                     </ImageBackground>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={{
//                                     width: 300, justifyContent: "center", alignItems: "center", borderRadius: 15,
//                                     // backgroundColor: "orange"
//                                 }}>
//                                     <ImageBackground source={require('../../../assets/paymentCard.png')} resizeMode="contain"
//                                         style={{
//                                             justifyContent: 'center', width: "100%", height: "100%",

//                                         }}>
//                                         <View style={{ flex: 1, flexDirection: "row-reverse", }}>
//                                             <Image source={require('../../../assets/checkCircle.png')} resizeMode="contain"
//                                                 style={{ height: "40%", width: "40%", top: 20, right: "60%" }}
//                                             />
//                                         </View>

//                                         <View style={{ flex: 1, }}>
//                                             <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold", top: "28%", marginLeft: "70%" }}>9851</Text>
//                                         </View>

//                                         <View style={{ flex: 1, }}>
//                                             <Text style={{ color: 'white', fontSize: 16, marginTop: 15, marginLeft: 30 }}>Nov/2021</Text>
//                                         </View>

//                                         <View style={{ flex: 1, }}>
//                                             <Text style={{ color: 'white', fontSize: 16, marginTop: 7, marginLeft: 30 }}>Marvel Faseun</Text>
//                                         </View>

//                                     </ImageBackground>
//                                 </TouchableOpacity>





//                             </ScrollView>
//                         </View>
//                     </View>

//                     <View style={{
//                         width: "90%",
//                         marginHorizontal: "5%",
//                         marginTop: 15,
//                         padding: 10,
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         height: 60,
//                         // backgroundColor: "red"
//                     }}>
//                         <View style={{
//                             width: "35%",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             backgroundColor: "#ffff",
//                             borderColor: "#44C062",
//                             borderWidth: 0.5
//                         }}>
//                             <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
//                                 <Text style={{ fontSize: 17 }}>Remove</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{
//                             width: "60%",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             backgroundColor: "#ffff",

//                         }}>
//                             <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "flex-end", }}>
//                                 <TouchableOpacity
//                                     // onPress={() => Actions.Submited()}
//                                     style={{
//                                         width: "100%", height: 42, justifyContent: "center", alignItems: "center",
//                                         backgroundColor: "#FD6958",
//                                     }}>
//                                     <Text style={{ fontSize: 18, color: "#ffffff" }}>Set Default</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>

//                     <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", }}>
//                         <TouchableOpacity
//                             onPress={() => { this.props.navigation.navigate("AddPaymenCard") }}
//                             style={{ marginBottom: 20, marginRight: 20, borderRadius: 25, height: 50, width: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#FD6958" }}>
//                             <MaterialIcons name="add" style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 35 }} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }
// let mapStateToProps = state => {
//     return {
//         bseUrl: state.root.bseUrl,
//         userProfile: state.root.userProfile,
//     };
// };
// function mapDispatchToProps(dispatch) {
//     return ({
//     })
// }
// export default connect(mapStateToProps, mapDispatchToProps)(MypaymentCard);

// const styles = StyleSheet.create({
//     contentContainer: {
//         // flex: 1,
//         // width: "100%",
//         // paddingBottom: 40,
//         // backgroundColor: "white",
//         // backgroundColor: "#F6F6F6"

//     },
// });



import { SQIPCardEntry, SQIPCore } from 'react-native-square-in-app-payments';
import axios from 'axios';

export default class MypaymentCard extends Component {
    constructor() {
        super();
        // bind 'this' to the methods' context
        this.onStartCardEntry = this.onStartCardEntry.bind(this);
        this.onCardNonceRequestSuccess = this.onCardNonceRequestSuccess.bind(this);
    }


    async componentDidMount() {
        await SQIPCore.setSquareApplicationId('sandbox-sq0idb-sYODojBTzgf0qX4bDKza0Q');
    }
    /**
     * Callback when the card entry is closed after call 'SQIPCardEntry.completeCardEntry'
     */
    onCardEntryComplete(cardDetails) {
        console.log('saved')
        // Update UI to notify user that the payment flow is completed



    }

    /**
     * Callback when successfully get the card nonce details for processig
     * card entry is still open and waiting for processing card nonce details
     * @param {*} cardDetails
     */
    async onCardNonceRequestSuccess(cardDetails) {
        console.log(cardDetails, "Credential")
        try {
            // take payment with the card details
            // await chargeCard(cardDetails);
            var options = {
                method: 'POST',
                url: `${"http://192.168.40.89:3002"}/payment/chargeCustomerCard`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cardDetails
            };

            axios(options)
                .then((data) => {
                    console.log(data.data, "Payment")

                }).catch((err) => {
                    console.log(err.response, "ERROR_Payment")
                    alert(err.response.data.errorMessage)
                })

            // payment finished successfully
            // you must call this method to close card entry
            await SQIPCardEntry.completeCardEntry(
                this.onCardEntryComplete(cardDetails),
            );
        } catch (ex) {
            // payment failed to complete due to error
            // notify card entry to show processing error
            await SQIPCardEntry.showCardNonceProcessingError(ex.message);
        }
    }

    /**
     * Callback when card entry is cancelled and UI is closed
     */
    onCardEntryCancel() {
        // Handle the cancel callback
    }

    /**
     * An event listener to start card entry flow
     */
    async onStartCardEntry() {
        const cardEntryConfig = {
            collectPostalCode: false,
        };
        await SQIPCardEntry.startCardEntryFlow(
            cardEntryConfig,
            this.onCardNonceRequestSuccess,
            this.onCardEntryCancel,
        );
    }

    render() {
        return (
            <View >
                <Button
                    onPress={this.onStartCardEntry}
                    title="Start Card Entry"
                />
            </View>
        );
    }
}