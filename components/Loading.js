import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    spin();
  }, []);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.spinnerContainer}>
      <Animated.View
        style={[
          styles.loadingSpinner,
          { transform: [{ rotate: spinAnimation }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingSpinner: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderTopWidth: 10,
    borderColor: "lightgrey",
    borderTopColor: "blue",
    borderRadius: 25,
  },
  spinnerContainer: {
    position: "absolute",
    zIndex: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 350,
    pointerEvents: "none",
  },
});

export default Loading;
