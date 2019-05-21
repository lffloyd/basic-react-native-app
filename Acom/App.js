import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableHighlight } from 'react-native';
import axios from 'axios';
import api from './api';

export default class App extends React.Component {

  state = {
    firstImage: null,
    waiting: true,
    error: true
  }

  componentDidMount() {
    this.getContent()
  }

  async getContent() {
    try {
      const { galleryImage, bannerImage } = await api.getHomeContent();
      setTimeout(() => {
        this.setState({
          firstImage: galleryImage,
          secondImage: bannerImage,
          waiting: false,
          error: false
        })
      }, 3000)
    } catch (error) {
      this.setState({
        waiting: false,
        error: true
      })
    }
  }

  render() {
    const { waiting, firstImage, error } = this.state;

    if (waiting) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>)
    } else if (error) {
      return (
        <TouchableHighlight style={{ flex: 1 }} onPress={() => {
          this.getContent()
          this.setState({
            waiting: true
          })
        }}>
          <View style={styles.container}>
            <Text>ESPERA CUMPADE</Text>
          </View>
        </TouchableHighlight>)
    } else {
      return (
        <View style={styles.container}>
          <Image source={{ uri: this.state.firstImage }} style={styles.firstImage} />
          <Image source={{ uri: this.state.secondImage }} style={styles.secondImage} />
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 23
  },

  firstImage: {
    width: '100%',
    aspectRatio: 1.4,
    resizeMode: 'stretch'
  },

  secondImage: {
    width: '100%',
    aspectRatio: 3,
    resizeMode: 'stretch',
    marginTop: 5
  }
});
