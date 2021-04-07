import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
    return (
        // <GooglePlacesAutocomplete
        //     placeholder='Search'
            // onPress={(data, details = null) => {
            //     // 'details' is provided when fetchDetails = true
            //     console.log(data, details, "Console");
            // }}
        //     query={{
        //         key: 'AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk',
        //         language: 'en',
        //     }}

        // />
        // <View style={styles.container}>


        //     <GooglePlacesAutocomplete
        //         onPress={(data, details = null) => {
        //             alert("work")
        //             // 'details' is provided when fetchDetails = true
        //             console.log(data, details, "Console");
        //         }}
        //         query={{
        //             key: 'AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk',
        //             language: 'en',
        //         }}
        //         // listViewDisplayed={false}

        //         // placeholder='Enter Location'
        //         // minLength={2}
        //         // autoFocus={false}
        //         // returnKeyType={'default'}
        //         fetchDetails={true}
        //         styles={{
        //             textInputContainer: {
        //                 // zIndex: 100,
        //                 backgroundColor: 'rgba(0,0,0,0)',
        //                 // backgroundColor: 'red',
        //                 width: "100%",
        //                 // height: 38,
        //                 borderTopWidth: 0,
        //                 borderBottomWidth: 0,
        //             },
        //             // textInput: {
        //             //     // zIndex: 100,
        //             //     backgroundColor: 'red',
        //             //     marginLeft: 0,
        //             //     marginRight: 0,
        //             //     height: 40,
        //             //     color: '#5d5d5d',
        //             //     fontSize: 16,
        //             // },
        //             // listView: {
        //             //     // flex: 1,
        //             //     backgroundColor: "white",
        //             //     width: "100%",
        //             // },
        //             listView: {
        //                 // marginTop: 50, // This right here - remove the margin top and click on the first result, that will work.
        //                 // elevation: 1,
        //                 backgroundColor: 'white',
        //                 // position: 'absolute', // and the absolute position.
        //                 zIndex: 500,
        //             },
        //             // containerTop: {
        //             //     height: 0,
        //             //     flexDirection: 'row',
        //             //     padding: 25,
        //             //     paddingBottom: 50,
        //             //     // marginTop: (isIphoneX() ? 20 : 0),
        //             //     zIndex: 200,
        //             // },
        //             // predefinedPlacesDescription: {
        //             //     color: 'red',
        //             // },
        //         }}
        //     />
        // </View>
        <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={2}
            query={{
                       key: 'AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk',
                       language: 'en',
                   }}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={{
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                },
                textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
            }}
        />
    );
};

export default GooglePlacesInput;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});
// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import Constants from 'expo-constants';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const GOOGLE_PLACES_API_KEY = 'AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk'; // never save your real api key in a snack!

// export default function GooglePlacesInput() {
//   return (
//     <View style={styles.container}>
//       <GooglePlacesAutocomplete
//         debounce={200}
//         // ref={c => (googlePlacesAutocomplete = c)}
//         keyboardAppearance={'light'}
//         listViewDisplayed={false}
//         minLength={2}
//         placeholder="Search..."
//         autoFocus={false}
//         returnKeyType={'search'}
//         fetchDetails={true}
//         getDefaultValue={() => ''}
//         keyboardShouldPersistTaps={'always'}
//         query={{
//           key: GOOGLE_PLACES_API_KEY,
//           language: 'en', // language of the results
//           types: '(cities)',
//         }}
//         styles={{
//           textInputContainer: {
//             backgroundColor: 'rgba(0,0,0,0)',
//             borderTopWidth: 0,
//             borderBottomWidth: 0,
//           },
//           textInput: {
//             marginLeft: 0,
//             marginRight: 0,
//             height: 38,
//             color: '#5d5d5d',
//             fontSize: 16,
//             borderBottomWidth: 1,
//             borderColor: 'yellow',
//           },
//           description: {
//             fontWeight: 'bold',
//             fontSize: 12,
//           },
//           predefinedPlacesDescription: {
//             color: 'black',
//           },
//         }}
//         onFail={e => console.log(e)}
//         renderDescription={value => value.description}
//         onPress={(data, details) => {
//           console.log(data, details);
//           // 'details' is provided when fetchDetails = true
//           // updateLocationArray(data, details, timeFrame);
//           // googlePlacesAutocomplete._handleChangeText('');
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
// });