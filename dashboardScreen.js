import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import {
  chartData,
  barChartData,
  lineChartData,
  formatYLabel,
} from "./components/ChartData";
import { styles } from "./components/style";

// Import your new button images here
import ButtonImage1 from "./Icon/qr-scan.png";
import ButtonImage2 from "./Icon/search.png";
import ButtonImage3 from "./Icon/dashboard.png";
import ButtonImage4 from "./Icon/user.png";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState("");
  const [selectedButton, setSelectedButton] = useState("Button 1");

  useEffect(() => {
    const updateCurrentDate = () => {
      const now = new Date();
      const formattedDate = now.toDateString();
      setCurrentDate(formattedDate);
    };

    updateCurrentDate();
    const intervalId = setInterval(updateCurrentDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleButtonPress = (buttonText) => {
    console.log(`Button pressed: ${buttonText}`);
    setSelectedButton(buttonText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      {/* Display the current date */}
      <PieChart
        data={chartData}
        width={350}
        height={178}
        chartConfig={{
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <View>
        <Text style={styles.chartDateTitle}>Week</Text>
        <BarChart
          data={barChartData}
          width={360}
          height={178}
          yAxisSuffix="%" // Remove the percentage symbol
          chartConfig={{
            backgroundGradientFrom: "black",
            backgroundGradientTo: "black",
            color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // optional
            strokeWidth: 2, // optional
          }}
          formatYLabel={formatYLabel} // Apply the custom formatting
          showValuesOnTopOfBars={true}
        />
        <Text style={styles.chartDateTitle}>Month</Text>
        <LineChart
          data={lineChartData}
          width={360}
          height={178}
          yAxisSuffix="%" // Remove the percentage symbol
          chartConfig={{
            backgroundGradientFrom: "black",
            backgroundGradientTo: "black",
            color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
          }}
          formatYLabel={formatYLabel} // Apply the custom formatting
          bezier
        />
      </View>
      {/* Updated button layout using Pressable */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => handleButtonPress("Button 1")}
        >
          <Image
            source={ButtonImage1}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("History Screen")}
        >
          <Image
            source={ButtonImage2}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => handleButtonPress("Button 3")}
        >
          <Image
            source={ButtonImage3}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => handleButtonPress("Button 4")}
        >
          <Image
            source={ButtonImage4}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}
