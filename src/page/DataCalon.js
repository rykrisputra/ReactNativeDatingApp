import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

export class DataCalon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFlatList: {},
    };
  }

  componentDidMount() {
    // if(this.props.isLogin){
    //     this.props.navigation.navigate('Home')
    // }else{
    this.getData();
    // }
  }

  getData() {
    axios
      .get("http://192.168.0.103:3010/laporan/")
      .then((response) => {
        let data = response.data;
        console.log(data);
        this.setState({ dataFlatList: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.dataFlatList}
          keyExtractor={(item) => parseInt(item.id)}
          renderItem={({ item }) => (
            <View style={{ borderWidth: 5, borderColor: "red", flexDirection: "row", margin: 5 }}>
              <Image style={{ width: 100, height: 100 }} source={{ uri: `http://192.168.0.103:3010:8080/laporan/image/${item.image}` }} />
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text>Nama : {item.nama}</Text>
                <Text>Umur : {item.Umur}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.LoginReducer.isLogin,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HistoriLaporan);

const styles = StyleSheet.create({
  viewStyle: {
    margin: 20,
  },

  buttonStyle: {
    borderWidth: 10,
    borderColor: "red",
    margin: 20,
  },

  textStyle: {
    textAlign: "center",
  },
});
