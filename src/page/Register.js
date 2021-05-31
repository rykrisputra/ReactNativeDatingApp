import axios from "axios";
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, Button, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      gender: "",
      phone: "",
      age: "",
      foto: "https://asset.kompas.com/crops/7aeyQXv6hi9593Gh1ppQgPeSMkg=/0x8:1747x1172/750x500/data/photo/2020/11/26/5fbf40c4507ae.jpg",
    };
  }

  componentDidMount() {
    this.getPermission();
  }

  async getPermission() {
    if (Platform.OS !== "android") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);
      this.setState({ image: result.uri });
    }
  }

  simpanData() {
    let formData = new FormData();
    let filename = this.state.foto;
    console.log("nama gambar " + filename.split("/").pop());
    formData.append("data", JSON.stringify(this.state));
    formData.append("file", {
      uri: this.state.foto, //Your Image File Path
      type: "image/jpg",
      name: filename.split("/").pop(),
    });

    axios
      .post("http://192.168.0.103:3010/user/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("ada error : " + error);
      });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text> Username </Text>
        <TextInput
          placeholder="masukan username"
          onChangeText={(value) => {
            this.setState({ username: value });
          }}
        />
        <Text> Name </Text>
        <TextInput
          placeholder="masukan nama"
          onChangeText={(value) => {
            this.setState({ name: value });
          }}
        />
        <Text> Jenis Kelamin </Text>
        <Picker selectedValue={this.state.gender} style={{ height: 50, width: 300 }} onValueChange={(itemValue) => this.setState({ gender: itemValue })}>
          <Picker.Item label="Masukan Pilihan" />
          <Picker.Item label="Laki-laki" value="Laki-laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
        <Text> No. Hp </Text>
        <TextInput
          placeholder="masukan phone"
          onChangeText={(value) => {
            this.setState({ phone: value });
          }}
        />
        <Text> Umur </Text>
        <TextInput
          placeholder="masukan umur"
          onChangeText={(value) => {
            this.setState({ age: value });
          }}
        />
        <Text> Foto </Text>
        <Button
          title="Pick an image from camera roll"
          onPress={() => {
            this.pickImage();
          }}
        />
        <Image source={{ uri: this.state.foto }} style={{ width: 200, height: 200, alignSelf: "center" }} />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            this.simpanData();
          }}
        >
          <Text style={styles.textStyle}>Simpan</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;

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
