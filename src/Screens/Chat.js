import { StyleSheet, Text, View,TextInput } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect, } from 'react'
import {GiftedChat,InputToolbar} from 'react-native-gifted-chat';
import { collection,addDoc,orderBy,query,onSnapshot,deleteDoc,doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth,database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';

const Chat = () => {

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const navigation = useNavigation();

const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <AntDesign name="logout" size={24}color={'#000'} style={{marginRight: 10}}/>
          </TouchableOpacity>
        )
      });
    }, [navigation]);

    useLayoutEffect(() => {
      const collectionRef = collection(database, 'chats');
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          console.log('querySnapshot unsubscribe');
          setMessages(
              querySnapshot.docs.map((doc) => ({
                  _id: doc.data()._id,
                  createdAt: doc.data().createdAt.toDate(),
                  text: doc.data().text,
                  user: doc.data().user,
              }))
          );
      });
  
      return unsubscribe;
  }, []);


 

  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      // setMessages([...messages, ...messages]);
      const { _id, createdAt, text, user } = messages[0];    
      addDoc(collection(database, 'chats'), {
        _id,
        createdAt,
        text,
        user
      });
      setIsTyping(false);
    }, []);



    async function onDelete(messageIdToDelete) {
      try {
        const docRef = doc(database, 'chats', messageIdToDelete);
        await deleteDoc(docRef);
        // Update local messages state after successful deletion
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageIdToDelete)
        );
      } catch (error) {
        console.error('Error deleting message:', error);
        // Handle errors, e.g., show an error message to the user
      }
    }
    
  
    const onLongPress = (context, message) => {
      const options = ['copy', 'Delete Message', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
  
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              break;
            case 1:
              onDelete(message._id); // Pass the message ID to the onDelete function
              break;
          }
        }
      );
    };


  
   
  return (
   <>
  
  <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          showUserAvatar={true}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.email,
            avatar:  'https://i.pravatar.cc/300'
          }}
          onPress={onLongPress}
         
        />
   </>
    
  
  )
}

export default Chat

const styles = StyleSheet.create({

    
})  