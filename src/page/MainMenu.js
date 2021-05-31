import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LoginAction } from "../Redux/Action";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  componentDidMount() {
    if (!this.props.dataRedux.isLogin) {
      this.props.navigation.navigate("Home");
    }
  }

  handleSignOut() {
    alert("Anda berhasil sign out");
    this.props.LoginAction(false, "isLogin");
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("DataCalon");
          }}
        >
          <Text style={styles.textBtn}>Data Calon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("PilihCalon");
          }}
        >
          <Text style={styles.textBtn}>Pilih Calon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.handleSignOut();
          }}
        >
          <Text style={styles.textBtn}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  dataRedux: state.LoginReducer,
});

const mapDispatchToProps = {
  LoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);

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
