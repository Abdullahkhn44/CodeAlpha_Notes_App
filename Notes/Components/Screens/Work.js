import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Surface} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Work({navigation, route}) {
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [ndata, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const StoredData = await AsyncStorage.getItem('WorkData');
        if (StoredData) {
          setData(JSON.parse(StoredData));
          console.log('Work Fetched');
        }
      } catch (error) {
        console.error('error fetching : ', error);
      }
    };

    fetchData();
  }, []);

  const handleLongPress = () => {
    setModalVisible(!modalVisible);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem('WorkData');
    } catch (error) {
      console.error('Error Deleting Data : ', error);
    }
    console.warn('Data Deleted');
    setData(null);
    setModalVisible(false);
  };
  const handleNote=()=>{
    navigation.navigate('BigNote',{data:ndata});
   
  }
  const buttonStyle = isFocused
    ? {borderBottomWidth: 1, borderBottomColor: 'white', paddingBottom: 7}
    : null;

  return (
    <View style={styles.mainView}>
      <View style={styles.secondView}>
        <Text style={styles.notewise}>Notewise</Text>
      </View>
      <View style={styles.thirdView}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.thirdViewButton}
            onPress={() => navigation.navigate('Notes')}>
            <Text style={styles.thirdViewText}>All notes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.thirdViewButton}
            onPress={() => navigation.navigate('Personal')}>
            <Text style={styles.thirdViewText}>Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.thirdViewButton, buttonStyle]}>
            <Text style={styles.thirdViewText}>Work</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fourthView}>
        {ndata ? (
          <FlatList
            data={ndata}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{width: 150, margin: 10}}
                onLongPress={handleLongPress}   onPress={handleNote}>
                <Surface style={styles.surface} elevation={4}>
                  <Text style={styles.fourthViewTitle}>{item?.istitle} </Text>
                  <Text>_____________________</Text>
                  <Text
                    numberOfLines={10}
                    ellipsizeMode="tail"
                    style={styles.fourthViewNote}>
                    {item?.isnote}
                  </Text>
                </Surface>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        ) : (
          <Text style={{color: 'white', textAlign: 'center'}}>
            Nothing Here
          </Text>
        )}
        <View style={styles.centeredView}>
          {/* MODAL */}

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Do you want to DELETE your notes?
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={handleCancel}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDelete}
                    style={[styles.button, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <View style={styles.iconView}>
        <TouchableOpacity onPress={() => navigation.navigate('Write Notes')}>
          <Ionicons name="add-circle" size={55} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'black',
  },
  secondView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  thirdView: {
    justifyContent: 'center',
    flex: 0.6,
    backgroundColor: 'black',
  },
  fourthView: {
    marginLeft: 20,
    marginTop: 20,
    flex: 3,
    backgroundColor: 'black',
  },
  notewise: {
    color: 'white',
    marginLeft: 15,
    fontFamily: 'DancingScript-Regular',
    fontSize: 45,
  },
  thirdViewText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
  },
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  thirdViewButton: {},
  fourthViewTitle: {
    color: 'black',
    fontFamily: 'DancingScript-Bold',
    fontSize: 19,
    textAlign: 'center',
  },
  iconView: {
    height: 50,
    justifyContent: 'center',
    marginRight: 25,
    alignItems: 'flex-end',
    bottom: 30,
    width: 55,
    marginLeft: 270,
  },
  surface: {
    padding: 8,
    height: 245,
    width: 150,
    borderRadius: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    marginLeft: 30,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: 'pink',
    marginTop: 25,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 80,
    fontSize: 18,
  },
});
