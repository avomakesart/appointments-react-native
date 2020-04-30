import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Form = ({appointments, setAppointments, setShownForm}) => {
  const [patient, setPatient] = useState('');
  const [owner, setOwner] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isDate, setIsDate] = useState('');
  const [isHour, setIsHour] = useState('');
  const [syntoms, setSyntoms] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmDate = date => {
    const options = {year: 'numeric', month: 'long', day: '2-digit'};
    setIsDate(date.toLocaleDateString('es-ES', options));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmHour = date => {
    const options = {hour: 'numeric', minutes: '2-digit', hour12: 'false'};
    setIsHour(date.toLocaleDateString('en-US', options));
    hideTimePicker();
  };

  // Created new appointment function
  const createNewAppointment = () => {
    if (
      patient.trim() === '' ||
      owner.trim() === '' ||
      telephone.trim() === '' ||
      isDate.trim() === '' ||
      isHour.trim() === '' ||
      syntoms.trim() === ''
    ) {
      showAlert();

      return;
    }

    // Set a new appointment
    const isAppointment = {patient, owner, telephone, isDate, isHour, syntoms};
    isAppointment.id = shortid.generate();

    // Add appointmet
    const newAppointments = [...appointments, isAppointment];
    setAppointments(newAppointments);

    setShownForm(false);
  };

  // Shows failing alert
  const showAlert = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPatient(text)}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Dueño: </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setOwner(text)}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Contacto: </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setTelephone(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmDate}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{isDate}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmHour}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{isHour}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Sintomas: </Text>
          <TextInput
            multiline="true"
            style={styles.input}
            onChangeText={text => setSyntoms(text)}
          />
        </View>

        <View style={styles.form}>
          <TouchableHighlight
            onPress={() => createNewAppointment()}
            style={styles.submitButton}>
            <Text style={styles.submitTextButton}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 10,
  },
  submitTextButton: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
