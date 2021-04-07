import React, { Component } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity, Text } from 'react-native';
import { connect } from "react-redux";
import ImageViewer from 'react-native-image-zoom-viewer';

class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            catogeries: "services",
            fullImage: false,
            selectedUri: undefined,

        }
    }

    UNSAFE_componentWillMount() {
        const { gallery, galleryStylist, } = this.props
        if (gallery) {
            let galleryUris = []
            for (let index = 0; index < gallery[0].galleryImages.length; index++) {
                const element = gallery[0].galleryImages[index];
                galleryUris.push({ url: element })
            }
            this.setState({ selectedUri: galleryUris })
        }
        if (galleryStylist) {
            let galleryUris = []
            for (let index = 0; index < galleryStylist.length; index++) {
                const element = galleryStylist[index];
                galleryUris.push({ url: element })
            }
            this.setState({ selectedUri: galleryUris })
        }
    }


    render() {
        const { gallery, galleryStylist, } = this.props
        const { fullImage, selectedUri, imgIndex } = this.state

        return (
            <View style={styles.imageCard}>
                {
                    (gallery && gallery[0].galleryImages) ? (
                        gallery[0].galleryImages.map((key, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        width: "50%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            fullImage: !fullImage,
                                            imgIndex: index,
                                        })
                                    }}>
                                    <Image
                                        style={styles.imageSizing}
                                        resizeMode="stretch"
                                        source={{ uri: key }}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    ) : null
                }

                {
                    (galleryStylist) ? (
                        galleryStylist.map((key, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        width: "50%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            fullImage: !fullImage,
                                            imgIndex: index,
                                        })
                                    }}>
                                    <Image
                                        style={styles.imageSizing}
                                        resizeMode="stretch"
                                        source={{ uri: key }}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    ) : null
                }

                {
                    (gallery != null && fullImage && selectedUri) ? (
                        <Modal visible={fullImage} transparent={true}>
                            <ImageViewer index={imgIndex} imageUrls={selectedUri} />
                            <TouchableOpacity style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => {
                                this.setState({
                                    fullImage: !fullImage
                                })
                            }}>
                                <Text>BACK TO PHOTOS</Text>
                            </TouchableOpacity>
                        </Modal>
                    ) : null
                }
                {
                    (galleryStylist != null && fullImage && selectedUri) ? (
                        <Modal visible={fullImage} transparent={true}>
                            <ImageViewer index={imgIndex} imageUrls={selectedUri} />
                            <TouchableOpacity style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "white" }} onPress={() => {
                                this.setState({
                                    fullImage: !fullImage
                                })
                            }}>
                                <Text>BACK TO PHOTOS</Text>
                            </TouchableOpacity>
                        </Modal>
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageCard: {
        // flex: 1,
        marginTop: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    imageSizing: {
        width: "90%",
        // width: 150,
        height: 180,
        margin: 10,
        borderRadius: 10,
        // backgroundColor: "red"
    }
});
let mapStateToProps = state => {
    return {
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

