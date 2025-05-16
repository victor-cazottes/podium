import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';

const participants: [string, number, number][] = [
  ['Victor', 100, 5000],
  ['Kevin', 50, 7500],
  ['Romain', 40, 3500],
  ['Aymeric', 0, 4500],
];


// Tri décroissant sur la somme globale (index 2)
const sortedParticipants = participants.sort((a, b) => b[2] - a[2]);

export default function TabRankingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Ranking</Text>

      {/* En-tête du tableau */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Nickname</Text>
        <Text style={styles.cell}>Day points</Text>
        <Text style={styles.cell}>Total points</Text>
      </View>

      {/* Liste des participants */}
      <FlatList
        data={sortedParticipants}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item[0]}</Text>
            <Text style={styles.cell}>{item[1]}</Text>
            <Text style={styles.cell}>{item[2]}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
});
