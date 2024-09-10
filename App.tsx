import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { Canvas, Circle, Paint, useImage, Blur } from '@shopify/react-native-skia';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Escolher Imagem" onPress={pickImage} />
      
      <Canvas style={styles.canvas}>
        <Circle cx={100} cy={100} r={50} color="blue" style="stroke" strokeWidth={10} />
        <Circle cx={200} cy={100} r={50} color="black" style="stroke" strokeWidth={10} />
        <Circle cx={300} cy={100} r={50} color="red" style="stroke" strokeWidth={10} />
        <Circle cx={150} cy={150} r={50} color="yellow" style="stroke" strokeWidth={10} />
        <Circle cx={250} cy={150} r={50} color="green" style="stroke" strokeWidth={10} />
      </Canvas>

      {imageUri && (
        <View>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Canvas style={styles.canvas}>
            <Paint>
              <Blur blur={5} />
            </Paint>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
            />
          </Canvas>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  canvas: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});
