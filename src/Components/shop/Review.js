import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import moment from 'moment';

class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catogeries: "services",
            reviews: [],
        }
    }

    UNSAFE_componentWillMount() {
        this.getReview()
    }

    getReview() {
        let urlm = `${this.props.bseUrl}/review/getAllReviews/${this.props.shop._id}`
        axios({
            method: 'get',
            url: urlm,
        })
            .then(result => {
                if (result.data.result.length) {
                    let data = result.data.result
                    let totalReviews = result.data.result.length
                    let ratingCount = 0;
                    for (let index = 0; index < data.length; index++) {
                        const rating = Number(data[index].rating)
                        ratingCount = ratingCount + rating
                    }
                    let totalRating = ratingCount / totalReviews
                    this.setState({
                        reviews: data,
                        totalRating: totalRating
                    })
                    console.log(ratingCount, totalReviews, totalRating, "DATA_FROM_API_REVIEW")
                }
                else {
                    this.setState({
                        totalRating: 5
                    })
                }
            })
            .catch(err => {
                if (err.response.status === 409) {
                    console.log(err.response.data.message, "ERROR_ON_GET_REVIEW")
                }
                else {
                    alert(err.response.data.message)
                }
            })
    }

    render() {
        const { totalRating, reviews } = this.state
        return (
            <View style={{ paddingHorizontal: 10 }}>

                <View>
                    <Image
                        resizeMode="contain" style={{ width: "100%", height: 150 }}
                        source={require('../../../assets/Rectangles.png')}
                    />
                    <View style={{ position: 'absolute', top: 0, left: 30, right: 0, bottom: 0, justifyContent: "center", }}>
                        {
                            (totalRating) ? (
                                <Text style={{ fontSize: 55, color: "#fff" }}>{String(totalRating).substring(0, 3)} </Text>
                            ) :
                                <ActivityIndicator color="#ffffff" size="large" style={{ left: "-45%" }} />
                        }
                    </View>
                    <View style={{ position: 'absolute', top: 0, left: "30%", right: 0, bottom: 20, justifyContent: "center" }}>
                        <Text style={{ fontSize: 15, color: "#fff" }}>{reviews.length} reviews</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 75, left: "-5%", right: 0, bottom: 0, justifyContent: "center", flexDirection: "row" }}>
                        {[1, 2, 3, 4, 5].map((v, i) => {
                            return (
                                <View key={i}>
                                    <Entypo
                                        name={totalRating > i ? "star" : "star-outlined"}
                                        style={{ color: "#EBAC43", fontSize: 28 }} />
                                </View>
                            )
                        })}
                    </View>
                </View>

                {
                    (reviews.length) ? (
                        reviews.map((key, index) => {
                            return (
                                <View key={index} style={{ flexDirection: "row", flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Image
                                            resizeMode="cover"
                                            style={{ width: 50, height: 50, borderRadius: 50 }}
                                            source={require('../../../assets/nophoto.jpg')}
                                        />
                                    </View>
                                    <View style={{ flex: 4, marginHorizontal: 15 }}>
                                        <Text style={{ fontSize: 15, color: "#8B867E" }}>{key.userId ? key.userId.fullName : "N/a"}</Text>
                                        <Text style={{ fontSize: 12, color: "#C4BCAE" }}>
                                            {
                                                moment(key.createdAt).format('MMMM Do, YYYY hh:mm:ss A')
                                            }
                                        </Text>
                                        <Text style={{ fontSize: 15, color: "#8B867E", marginVertical: 15 }}>
                                            {key.comment}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: "row", }}>
                                        {[1, 2, 3, 4, 5].map((v, i) => {
                                            return (
                                                <View key={i}>
                                                    <Entypo
                                                        name={key.rating > i ? "star" : "star-outlined"}
                                                        style={{ color: "#EBAC43", fontSize: 18 }} />
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })
                    ) : null
                }

                {/* <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain" style={{ width: 50, height: 50, borderRadius: 50 }}
                            source={require('../../../assets/Ellipse2.png')}
                        />
                    </View>
                    <View style={{ flex: 4, marginHorizontal: 15 }}>
                        <Text style={{ fontSize: 15, color: "#8B867E" }}>Sophie French</Text>
                        <Text style={{ fontSize: 15, color: "#C4BCAE" }}>12.9.2019 at 02:44</Text>
                        <Text style={{ fontSize: 15, color: "#8B867E", marginVertical: 15 }}>They will cut yourhair and beard in a very classy and modern style</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row", }}>
                        <Entypo name="star" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star-outlined" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star-outlined" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                    </View>
                </View>


                <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain" style={{ width: 50, height: 50, borderRadius: 50 }}
                            source={require('../../../assets/Ellipse.png')}
                        />
                    </View>
                    <View style={{ flex: 4, marginHorizontal: 15 }}>
                        <Text style={{ fontSize: 15, color: "#8B867E" }}>Alyana thomson</Text>
                        <Text style={{ fontSize: 15, color: "#C4BCAE" }}>24.3.2017 at 07:04</Text>
                        <Text style={{ fontSize: 15, color: "#8B867E", marginVertical: 15 }}>Best among others in the area need to improve cleaning though</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: "row", }}>
                        <Entypo name="star" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star-outlined" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star-outlined" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                        <Entypo name="star-outlined" style={{ color: "#EBAC43", fontWeight: 'bold', fontSize: 18 }} />
                    </View>
                </View> */}



            </View>
        );
    }
}


let mapStateToProps = state => {
    return {
        bseUrl: state.root.bseUrl,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Review);

