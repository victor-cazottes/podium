import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Svg, { Polyline, Line, Circle } from 'react-native-svg';

import { Text as ThemedText, View as ThemedView } from '@/components/Themed';

const data: [string, number][] = [
  ['05/05', 100], ['06/05', 101], ['07/05', 0], ['08/05', 100], ['09/05', 300],
  ['10/05', 100], ['11/05', 150], ['12/05', 60], ['12/05', 100], ['13/05', 120],
  ['14/05', 150], ['15/05', 100], ['16/05', 160],
];

const GRAPH_HEIGHT = 200;
const GRAPH_WIDTH_PER_DAY = 60;
const AXIS_PADDING_LEFT = 40;
const TICK_COUNT = 5;

export default function TabGraphScreen() {
  const maxValue = Math.max(...data.map(([, val]) => val), 1);
  const scrollRef = useRef<ScrollView>(null);

  // Scroll vers la droite (dernier jour) au chargement
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const graphWidth = GRAPH_WIDTH_PER_DAY * data.length;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Tab Graph</ThemedText>

      <View style={styles.graphWrapper}>
        {/* Axe Y (ordonnées) fixé */}
        <View style={styles.yAxis}>
          {Array.from({ length: TICK_COUNT + 1 }, (_, i) => {
            const val = Math.round(maxValue - (maxValue / TICK_COUNT) * i);
            return (
              <Text key={i} style={styles.yLabel}>
                {val}
              </Text>
            );
          })}
        </View>

        {/* Contenu scrollable du graphique */}
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: graphWidth }}
        >
          <Svg height={GRAPH_HEIGHT} width={graphWidth}>
            {/* Lignes horizontales */}
            {Array.from({ length: TICK_COUNT + 1 }, (_, i) => {
              const y = (GRAPH_HEIGHT / TICK_COUNT) * i;
              return (
                <Line
                  key={i}
                  x1={0}
                  y1={y}
                  x2={graphWidth}
                  y2={y}
                  stroke="#eee"
                  strokeWidth="1"
                />
              );
            })}

            {/* Ligne du graphe */}
            <Polyline
              points={data.map(([_, val], i) => {
                const x = i * GRAPH_WIDTH_PER_DAY + GRAPH_WIDTH_PER_DAY / 2;
                const y = GRAPH_HEIGHT - (val / maxValue) * GRAPH_HEIGHT;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#007AFF"
              strokeWidth="2"
            />

            {/* Points du graphe */}
            {data.map(([_, val], i) => {
              const x = i * GRAPH_WIDTH_PER_DAY + GRAPH_WIDTH_PER_DAY / 2;
              const y = GRAPH_HEIGHT - (val / maxValue) * GRAPH_HEIGHT;
              return <Circle key={i} cx={x} cy={y} r="3" fill="#007AFF" />;
            })}
          </Svg>
        </ScrollView>
      </View>

      {/* Axe X (abscisses) */}
      <View style={styles.xAxis}>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: graphWidth, paddingLeft: AXIS_PADDING_LEFT }}
        >
          {data.map(([date], i) => (
            <Text
              key={i}
              style={{
                width: GRAPH_WIDTH_PER_DAY,
                textAlign: 'center',
                fontSize: 10,
                color: '#333',
              }}
            >
              {date}
            </Text>
          ))}
        </ScrollView>
      </View>

      {/* Texte explicatif */}
      <View style={styles.description}>
        <Text style={{ fontSize: 14, color: '#333' }}>
          Ce graphique montre l’évolution quotidienne du compteur. Faites glisser pour voir les jours précédents.
        </Text>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  graphWrapper: {
    flexDirection: 'row',
    height: GRAPH_HEIGHT,
    marginTop: 20,
  },
  yAxis: {
    width: AXIS_PADDING_LEFT,
    justifyContent: 'space-between',
  },
  yLabel: {
    fontSize: 10,
    color: '#555',
    textAlign: 'right',
  },
  xAxis: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: AXIS_PADDING_LEFT,
  },
  description: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
