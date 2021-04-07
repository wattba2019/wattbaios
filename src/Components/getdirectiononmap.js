import getDirections from 'react-native-google-maps-directions'
import { Alert } from 'react-native';

export default handleGetDirections = (shop, currentLocation) => {
    if (currentLocation != null && shop.location.coordinates[0] && shop.location.coordinates[1]) {
        const data = {
            source: {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            },
            destination: {
                latitude: shop.location.coordinates[0],
                longitude: shop.location.coordinates[1],
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
        }
        getDirections(data)
    }
    else {
        Alert.alert("Please turn on your location")
    }
}