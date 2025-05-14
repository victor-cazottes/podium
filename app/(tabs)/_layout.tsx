import React from 'react';
import { FontAwesome, Octicons, Ionicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { ViewStyle } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
type Props = {
  name: string;
  color: string;
  pack?: 'FontAwesome' | 'Octicons' | 'Ionicons';
  style?: ViewStyle;
};

function TabBarIcon({ name, color, pack = 'FontAwesome' }: Props) {
  const IconComponent =
    pack === 'Octicons' ? Octicons :
      pack === 'Ionicons' ? Ionicons :
        FontAwesome;

  return (
    <IconComponent
      name={name as any}
      size={28}
      color={color}
      style={{ marginBottom: -3 }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="graph"
        options={{
          title: 'Graph',
          tabBarIcon: ({ color }) => <TabBarIcon name="graph" color={color} pack='Octicons' />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Counter',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <TabBarIcon name="podium" color={color} pack='Ionicons' />,
        }}
      />
    </Tabs>
  );
}
