import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    console.log(navigation.getParam('city'));
    const city = navigation.getParam('city');
    const apiKey = "b59b2f6b4c62b33a007db6708713d1e6"
   
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let weatherMain = this.state.weather[0].main;
    let windSpeed = this.state.wind.speed;
    let clouds = this.state.clouds.all;
    let celsius_min = this.state.main.temp_min - 273.15;
    let celsius_max = this.state.main.temp_max - 273.15;

    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.celsius}>{celsius.toFixed(1)}°</Text>
          <Text style={styles.weatherMain}>{weatherMain}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>최저온도</Text>
          <Text style={styles.textStyle}>{celsius_min.toFixed(1)}°</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>최고온도</Text>
          <Text style={styles.textStyle}>{celsius_max.toFixed(1)}°</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>풍속</Text>
          <Text style={styles.textStyle}>{windSpeed}(m/s)</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>운량</Text>
          <Text style={styles.textStyle}>{clouds/10}(Okta)</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100
  },


  celsius: {
    width: 150,
    color: '#f8ecc9',
    fontSize: 50,
    fontWeight: 'bold',    
  },

  weatherMain: {
    color: '#D499B9',
    fontSize: 50,
    fontWeight: 'bold',
  },

  viewStyle: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginTop: 10
  },

  textStyle: {
    color: 'gray',
    fontSize: 25,
    fontWeight: 'bold',
  },


});