import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import * as ImagePicker from "expo-image-picker";
import AuthContext from "@/context/AuthContext";
import { router } from "expo-router";
import { storeToken } from "@/api/storage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { setIsAutheticated } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register({ email, password }, image || "", name),

    onSuccess: async (data) => {
      await storeToken(data.token);
      setIsAutheticated(true);
      router.push("/(protected)/(tabs)");
    },
  });

  const handleRegisteration = () => {
    if (email && password) {
      mutate();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Register
          </Text>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Create your account
          </Text>

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Upload Profile Image
            </Text>
          </TouchableOpacity>

          {image && <Image source={{ uri: image }} style={styles.image} />}

          <TouchableOpacity
            onPress={handleRegisteration}
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Already have an account?{" "}
              <TouchableOpacity onPress={() => router.push("/Login")}>
                <Text style={{ color: colors.white, fontWeight: "bold" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
});
