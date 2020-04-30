import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  Platform,
} from 'react-native';
import Cita from './components/appointment';
import Form from './components/form';

const App = () => {
  const [isShownForm, setShownForm] = useState(false);

  const [appointments, setAppointments] = useState([]);

  // Deleting an appoiment from state
  const deletePatient = id => {
    setAppointments(currentAppointments => {
      return currentAppointments.filter(appointment => appointment.id !== id);
    });
  };

  const showForm = () => {
    setShownForm(!isShownForm);
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de citas</Text>

        <View style={styles.form}>
          <TouchableHighlight
            onPress={() => showForm()}
            style={styles.showFormButton}>
            <Text style={styles.showFormTextButton}>
              {isShownForm ? 'Ver Citas' : 'Crear Nueva Cita'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {isShownForm ? (
            <>
              <Text style={styles.title}>Crear Nueva Cita</Text>
              <Form
                appointments={appointments}
                setAppointments={setAppointments}
                setShownForm={setShownForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {appointments.length > 0
                  ? 'Administra tus citas'
                  : 'No hay citas'}
              </Text>
              <FlatList
                style={styles.list}
                data={appointments}
                renderItem={({item}) => (
                  <Cita item={item} deletePatient={deletePatient} />
                )}
                keyExtractor={appointment => appointment.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA0768',
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  list: {
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  showFormButton: {
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 10,
  },
  showFormTextButton: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
