// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const tabBarBgColor = colorScheme === 'dark' ? 'rgba(4, 20, 30, 0.2)' : 'rgba(4, 20, 30, 0.2)';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#FFFFFF',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#AAAAAA' : '#666666',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 1,
          right: 1,
          elevation: 0,
          backgroundColor: 'transparent',
          borderRadius: 20,
          height: 75,
          paddingBottom: 10,
          borderTopWidth: 0,
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <View style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            borderRadius: 15,
            overflow: 'hidden',
          }}>
            <BlurView
              tint={colorScheme === 'dark' ? 'dark' : 'light'}
              intensity={80}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Connect"
        options={{
          title: 'Connect',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="VetBot"
        options={{
          title: 'VetBot',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabBarIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}