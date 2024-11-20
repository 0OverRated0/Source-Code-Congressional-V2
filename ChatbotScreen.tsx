import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { GiftedChat, IMessage, Send, SendProps } from 'react-native-gifted-chat'; // Import SendProps
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';
import AppLogo from '@/assets/images/1.png';
import { LinearGradient } from 'expo-linear-gradient';

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! I'm VetBot. How can I assist you today?",
        createdAt: new Date(),
        user: { _id: 2, name: 'VetBot', avatar: AppLogo },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text;
    if (userMessage) {
      sendToChatbot(userMessage);
    }
  }, []);

  const sendToChatbot = async (message: string) => {
    try {
      const response = await axios.post('http://localhost:3000/chatbot', { message });

      const botMessage: IMessage = {
        _id: Math.random().toString(36).substring(7),
        text: response.data.reply,
        createdAt: new Date(),
        user: { _id: 2, name: 'VetBot', avatar: AppLogo },
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [botMessage])
      );
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };

  const renderSend = (props: SendProps<IMessage>) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <ThemedText style={styles.sendButtonText}>Send</ThemedText>
      </View>
    </Send>
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 1 }}
      renderSend={renderSend}
    />
  );
};

export default function TabTwoScreen() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <LinearGradient
      colors={['#041403', '#0a2e07', '#041403']}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.title}>Bot Friend</ThemedText>
          <ThemedText 
            onPress={() => setShowChatbot(!showChatbot)} 
            style={styles.toggleButton}
          >
            {showChatbot ? 'Hide VetBot' : 'Show VetBot'}
          </ThemedText>
          {showChatbot && (
            <View style={styles.chatbotContainer}>
              <ChatbotScreen />
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#0a2e07', // Make sure this is transparent to show the gradient
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  chatbotContainer: {
    flex: 1,
    marginTop: 10, // Reduced top margin to move chat box higher
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  sendButtonText:{
     color:'#ff3131',
     fontWeight:'600',
     fontSize :17,
   },
});