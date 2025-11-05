import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import colors from "../../../data/styling/colors";
import UserProfileCard from "../../../components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/auth";

const Users = () => {
  const { data } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => getAllUsers(),
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.primary }}>
      {data?.map((user: any) => (
        <UserProfileCard
          key={user._id}
          imageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          email={user.email}
          username={user.username}
        />
      ))}
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({});
