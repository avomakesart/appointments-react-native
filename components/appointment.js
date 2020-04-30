import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Cita = ({item, deletePatient}) => {
  const deleteModal = id => {
    deletePatient(id);
  };
  return (
    <View style={styles.appointment}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.info}>{item.patient}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario:</Text>
        <Text style={styles.info}>{item.owner}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <Text style={styles.info}>{item.syntoms}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => deleteModal(item.id)}
          style={styles.deleteButton}>
          <Text style={styles.deleteTextButton}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appointment: {
    backgroundColor: '#FFF',
    borderBottomColor: '#E1E1E1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  deleteTextButton: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cita;
