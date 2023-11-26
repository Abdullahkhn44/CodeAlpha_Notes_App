import React, {useState} from 'react';
import {Checkbox} from 'react-native-paper';

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Write = ({navigation}) => {
  const [istitle, setisTitle] = useState('');
  const [isnote, setisNote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [personal, setPersonal] = useState(false);
  const [work, setWork] = useState(false);

  const handleTitle = text => {
    setisTitle(text);
  };

  const handleNote = text => {
    setisNote(text);
  };

  const handleSave = () => {
    setModalVisible(!modalVisible);
  };

//   const realSave = () => {
//     if (personal === true) {
//       navigation.navigate('Personal', {istitle, isnote});
//       setisTitle('');
//       setisNote('');
//     } else if (work === true) {
//       navigation.navigate('Work', {istitle, isnote});
//       setisTitle('');
//       setisNote('');
//     } else {
//       console.warn('NOTHING SELECTED');
//     }
//   };


const realSave = async () => {
    const newNote = { istitle, isnote };
  
    if (personal === true) {
      try {
        const storedPersonalData = await AsyncStorage.getItem('PersonalData');
        let personalData = storedPersonalData ? JSON.parse(storedPersonalData) : [];
  
        if (!Array.isArray(personalData)) {
            personalData = [];
        }

        personalData.push({ istitle, isnote });
  
        await AsyncStorage.setItem('PersonalData', JSON.stringify(personalData));
  
        console.log("Personal note saved");
        navigation.replace("Personal");
  
        setisTitle('');
        setisNote('');
      } catch (error) {
        console.error("Error saving Personal Data: ", error);
      }
    } else if (work === true) {
      try {
        const storedWorkData = await AsyncStorage.getItem('WorkData');
        let workData = storedWorkData ? JSON.parse(storedWorkData) : [];
  
        if (!Array.isArray(workData)) {
            workData = [];
        }

        workData.push({ istitle, isnote });
  
        await AsyncStorage.setItem('WorkData', JSON.stringify(workData));
  
        console.log("Work note saved");
        navigation.replace("Work");
  
        setisTitle('');
        setisNote('');
      } catch (error) {
        console.error("Error saving Work Data: ", error);
      }
    } else {
      console.warn("No option selected!");
    }
  };
  


  const handlePersonal = () => {
    setPersonal(!personal);

    if (!personal) {
      setWork(false);
    }
    console.log(personal);
  };

  const handleWork = () => {
    setWork(!work);

    if (!work) {
      setPersonal(false);
    }
    console.log(work);
  };

  return (
    <KeyboardAvoidingView enabled={true} behavior="padding">
      <ScrollView>
        <View style={styles.MainView}>
          <View style={styles.title}>
            <TextInput
              value={istitle}
              onChangeText={handleTitle}
              style={styles.titleText}
              placeholder="NOTE TITLE"></TextInput>
          </View>
          <View style={styles.write}>
            <TextInput
              selectionColor="pink"
              cursorColor="purple"
              value={isnote}
              onChangeText={handleNote}
              underlineColor="white"
              activeUnderlineColor="white"
              style={styles.noteText}
              multiline={true}></TextInput>
          </View>

          {isnote.length > 4 ? (
            <View style={styles.saveView}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.centeredView}>
        {/* MODAL */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Where do you want to save your note?
              </Text>
              {/* CHECK BOX */}
              <View style={styles.personalCheck}>
                <Text style={styles.boxText}>Save in Personal</Text>
                <Checkbox
                  status={personal ? 'checked' : 'unchecked'}
                  onPress={handlePersonal}
                />
              </View>
              <View style={styles.personalCheck}>
                <Text style={styles.boxText}>Save in Work</Text>
                <Checkbox
                  status={work ? 'checked' : 'unchecked'}
                  onPress={handleWork}
                />
              </View>

              <TouchableOpacity 
                style={[styles.button, styles.buttonClose]}
                onPress={realSave}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    width: 360,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  noteText: {
    backgroundColor: 'white',
    width: 360,
    fontWeight: '400',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
    elevation: 15,
  },
  write: {
    flex: 1,

    backgroundColor: 'white',
  },
  saveView: {
    flex: 1,
    marginTop: 20,
    height: 60,
  },

  saveButton: {
    backgroundColor: 'black',
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 30,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 100,
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
  },
  personalCheck: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  boxText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Write;
