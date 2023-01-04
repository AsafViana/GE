import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  Modal,
  Center
} from 'native-base'

export default function Popup({visivel = true}) {
  const [modalVisible, setModalVisible] = useState(visivel);
  return (
    <Center>
      <Modal isOpen={visivel}>
        <Text> teste</Text>
      </Modal>
    </Center>
  );
}

