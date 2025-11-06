import {
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
import { login } from "@/api/auth";
import UserInfo from "@/types/UserInfo";
import { storeToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "expo-router";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAutheticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["Login"],
    mutationFn: (userInfo: UserInfo) =>
      login({ email: userInfo.email, password: userInfo.password }),
    onSuccess: async (data) => {
      await storeToken(data.token);
      setIsAutheticated(true);
      router.push("/(protected)/(tabs)");
    },
  });

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
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Login to your account
          </Text>

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
          />

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={() => mutate({ email, password })}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <Text style={{ color: colors.white, fontSize: 16 }}>
            Don't have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/Register")}>
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Register
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({});
