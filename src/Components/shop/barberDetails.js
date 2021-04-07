import React, { Component } from "react";
import {
    View, Image, ActivityIndicator, StyleSheet, Modal,
    ImageBackground, StatusBar, TouchableOpacity,
    Text, TextInput, ScrollView, Platform,
} from 'react-native';
import { Icon, Tabs, Tab, TabHeading } from 'native-base';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
// import ShopsCards from '../../../Components/shopscards';
import BasicInfo from '../shop/basicInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Gallery from '../shop/gallery';
import ImageViewer from 'react-native-image-zoom-viewer';

class BarberDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeColor: "basicinfo",
            fullImage: false
        };
    }

    activeColor(key) {
        console.log(key.ref.key)
        if (key.ref.key == ".0") {
            this.setState({
                activeColor: "basicinfo"
            })
        }
        if (key.ref.key == ".1") {
            this.setState({
                activeColor: "gallery"
            })
        }
    }

    render() {
        const { activeColor, fullImage } = this.state
        const { barberDetails, shop, workingHours } = this.props

        return (
            <View style={{
                flex: 1,
                width: "100%",
                backgroundColor: "white",
            }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={{
                    flex: 0.6,
                    flexDirection: "row",
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'grey',
                    marginTop: Platform.OS === 'ios' ? 15 : 0
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                    }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Ionicons name="ios-arrow-back" style={{ marginLeft: 25, color: "black", fontWeight: 'bold', fontSize: 28 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flex: 8,
                    width: "100%",
                    marginTop: 20
                }}>
                    <ScrollView style={{
                        width: "100%",
                        // backgroundColor: "grey"
                    }}>
                        <View style={{
                            flexDirection: "row",
                            height: 100,
                            // backgroundColor: 'orange'
                        }}>
                            <View style={{
                                flex: 4,
                                justifyContent: "center",
                                alignItems: "center",
                                width: "80%",
                                // backgroundColor: 'green'
                            }}>
                                <View style={{
                                    width: "70%", height: "100%", justifyContent: "center", alignItems: "center",
                                    borderColor: "#FD6958", borderWidth: 1, borderRadius: 15, padding: 5
                                    // backgroundColor: "grey"
                                }}>
                                    {/* <Image source={require('../../../assets/image1.png')} resizeMode="contain"
                                        style={{ height: "100%", width: "100%", }}
                                    /> */}
                                    {
                                        (barberDetails.coverImage != null) ? (
                                            <TouchableOpacity style={{ width: "100%", height: "100%", }} onPress={() => {
                                                this.setState({
                                                    fullImage: !fullImage
                                                })
                                            }}>
                                                <Image source={{ uri: barberDetails.coverImage }} resizeMode="cover"
                                                    style={{ width: "100%", height: "100%", }} />
                                            </TouchableOpacity>
                                        ) :
                                            <TouchableOpacity style={{ width: "100%", height: "100%", }} onPress={() => {
                                                this.setState({
                                                    fullImage: !fullImage
                                                })
                                            }}>
                                                <Image source={require('../../../assets/nophoto.jpg')} resizeMode="cover"
                                                    style={{ width: "100%", height: "100%", }} />
                                            </TouchableOpacity>
                                    }

                                    {
                                        (barberDetails.coverImage != null && fullImage) ? (
                                            <Modal visible={true} transparent={true}>
                                                <ImageViewer imageUrls={[{
                                                    url: barberDetails.coverImage,
                                                }
                                                ]} />
                                                <TouchableOpacity style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => {
                                                    this.setState({
                                                        fullImage: !fullImage
                                                    })
                                                }}>
                                                    <Text>BACK</Text>
                                                </TouchableOpacity>
                                            </Modal>
                                        ) : null
                                    }

                                </View>
                            </View>

                            <View style={{
                                flex: 7,
                                padding: 5,
                                justifyContent: "center",
                                // backgroundColor: 'red'
                            }}>
                                <Text style={{ fontSize: 25, color: "#3B566E" }}>{barberDetails.fullname}</Text>
                                <Text style={{ color: "#FD6958", fontSize: 14, marginTop: 7 }}>{barberDetails.designation}</Text>
                                <Text style={{ color: "#000000", fontSize: 14 }}>{shop.businessName}</Text>
                            </View>
                        </View>
                        <View style={{ width: "90%", marginHorizontal: "5%", marginTop: 10 }}>
                            <Text style={{ color: "#858585", fontSize: 14 }}>{barberDetails.description}</Text>
                        </View>

                        <View
                            style={{ width: "70%", height: 50, marginTop: 30, marginHorizontal: "15%", marginBottom: 20 }}
                        >
                            <TouchableOpacity
                                onPress={() => Actions.ChooseService({ shop: shop })}
                            >
                                <ImageBackground source={require('../../../assets/buttonBackground.png')} resizeMode="contain"
                                    style={{ height: "100%", width: "100%", justifyContent: "center", }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 15, margin: 12, color: "white", }}>Book an Appointment</Text>
                                </ImageBackground>
                            </TouchableOpacity>

                        </View>

                        <Tabs
                            onChangeTab={(key) => this.activeColor(key)}
                            locked={true}
                            tabBarUnderlineStyle={{ backgroundColor: '#FD6958' }}
                        >
                            {/* //basicinfo// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: "white" }}
                                    >
                                        <Text style={{ color: activeColor === "basicinfo" ? "#FD6958" : "black", fontWeight: "bold" }}>Basic Info</Text>
                                    </TabHeading>}
                            >
                                <BasicInfo barberDetails={barberDetails} shop={shop} workingHours={workingHours} />

                            </Tab>

                            {/* //Gallery// */}
                            <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: "white" }}
                                    >
                                        <Text style={{ color: activeColor === "gallery" ? "#FD6958" : "black" }}>Photos</Text>
                                    </TabHeading>
                                }
                            >
                                <View>
                                    <Gallery shop={shop} galleryStylist={barberDetails.galleryImages} />
                                </View>
                            </Tab>



                            {/* //Review// */}

                            {/* <Tab
                                heading={
                                    <TabHeading
                                        style={{ flexDirection: "column", backgroundColor: "white" }}
                                    >
                                        <Text style={{ color: activeColor === "review" ? "#FD6958" : "black", fontWeight: "bold" }}>Review</Text>
                                    </TabHeading>
                                }
                            >
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text>Under Development</Text>
                                </View>
                            </Tab> */}

                        </Tabs>
                    </ScrollView>
                </View>
            </View >
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
export default connect(mapStateToProps, mapDispatchToProps)(BarberDetails);
