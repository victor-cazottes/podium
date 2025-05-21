import React, { useState, useMemo } from 'react';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';

const participants: [string, number, number][] = [
  ['Victor', 100, 5000],
  ['Kevin', 50, 7500],
  ['Romain', 40, 3500],
  ['Aymeric', 0, 4500],
];

type SortKey = 'nickname' | 'dayPoints' | 'totalPoints';
type SortOrder = 'asc' | 'desc';

export default function TabRankingScreen() {
  const [sortKey, setSortKey] = useState<SortKey>('totalPoints');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedParticipants = useMemo(() => {
    const sorted = [...participants].sort((a, b) => {
      const [nameA, dayA, totalA] = a;
      const [nameB, dayB, totalB] = b;

      let comparison = 0;
      if (sortKey === 'nickname') {
        comparison = nameA.localeCompare(nameB);
      } else if (sortKey === 'dayPoints') {
        comparison = dayA - dayB;
      } else if (sortKey === 'totalPoints') {
        comparison = totalA - totalB;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [sortKey, sortOrder]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      // Inverser l'ordre si on clique sur la même colonne
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Ranking</Text>

      {/* En-tête cliquable */}
      <View style={[styles.row, styles.header]}>
        <Pressable style={styles.cell} onPress={() => toggleSort('nickname')}>
          <Text style={styles.headerText}>Nickname {sortKey === 'nickname' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</Text>
        </Pressable>
        <Pressable style={styles.cell} onPress={() => toggleSort('dayPoints')}>
          <Text style={styles.headerText}>Day points {sortKey === 'dayPoints' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</Text>
        </Pressable>
        <Pressable style={styles.cell} onPress={() => toggleSort('totalPoints')}>
          <Text style={styles.headerText}>Total points {sortKey === 'totalPoints' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</Text>
        </Pressable>
      </View>

      {/* Liste triée */}
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
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
