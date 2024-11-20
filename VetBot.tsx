import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { ThemedText } from '@/components/ThemedText';
import AppLogo from '@/assets/images/1.png';
import { LinearGradient } from 'expo-linear-gradient';

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

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

  const getBotResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello! How can I help you today?";
    } else if (lowerCaseMessage.includes('benefits')) {
      return "As a veteran, you may be eligible for various benefits including healthcare, education, and disability compensation. Would you like more information on a specific benefit?";
    } else if (lowerCaseMessage.includes('healthcare')) {
      return "VA healthcare benefits include preventive care, inpatient and outpatient services, and access to state-of-the-art medical facilities. Have you enrolled in VA healthcare?";
    } else if (lowerCaseMessage.includes('education')) {
      return "The GI Bill provides education benefits to veterans and their dependents. This can cover tuition, housing, and other education-related expenses. Are you interested in using these benefits?";
    } else if (lowerCaseMessage.includes('mental health')) {
      return "The VA offers comprehensive mental health services, including counseling, therapy, and medication management. If you're experiencing a crisis, please call the Veterans Crisis Line at 1-800-273-8255.";
    } else {
      return "I'm sorry, I didn't quite understand that. Could you please rephrase your question or ask about a specific topic like benefits, healthcare, or education?";
    }
  };

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text;
    if (userMessage) {
      setIsTyping(true);
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        const botMessage: IMessage = {
          _id: Math.random().toString(36).substring(7),
          text: botResponse,
          createdAt: new Date(),
          user: { _id: 2, name: 'VetBot', avatar: AppLogo },
        };

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [botMessage])
        );
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <ThemedText style={styles.sendButtonText}>Send</ThemedText>
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 1 }}
      renderSend={renderSend}
      isTyping={isTyping}
    />
  );
};

const VetBotScreen: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <LinearGradient
      colors={['#041403', '#031402', '#041403']}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.title}>AI Assistance</ThemedText>
          <TouchableOpacity 
            onPress={() => setShowChatbot(!showChatbot)} 
            style={styles.toggleButton}
          >
            <Image source={AppLogo} style={styles.botLogo} />
            <ThemedText style={styles.toggleButtonText}>
              {showChatbot ? 'Hide VetBot' : 'Show VetBot'}
            </ThemedText>
          </TouchableOpacity>
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
  },
  content: {
    flex: 1,
    padding: 60,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  description: {
    marginBottom: 10,
    color: '#FFFFFF',
  },
  chatbotContainer: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#0a2e07',
   marginBottom :10,
   },
   toggleButtonText :{
     marginLeft :10,
     color:'#FFFFFF',
   },
   botLogo:{
     width :30,
     height :30,
     resizeMode :'contain',
   },
   sendButton:{
     justifyContent:'center',
     alignItems:'center',
     marginRight :10,
     marginBottom :5,
   },
   sendButtonText:{
     color:'#0a2e07',
     fontWeight:'600',
     fontSize :17,
   },
});

export default VetBotScreen;