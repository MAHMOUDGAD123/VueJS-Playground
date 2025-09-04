<script lang="ts">
  import ListSearch from './ListSearch.vue';

  export default {
    name: 'MaleSearch',

    data: () => ({
      names: [
        // A
        'Adam',
        'Aaron',
        'Adrian',
        // B
        'Brian',
        'Blake',
        'Benjamin',
        // C
        'Charles',
        'Caleb',
        'Christopher',
        // D
        'David',
        'Daniel',
        'Dominic',
        // E
        'Ethan',
        'Edward',
        'Elias',
        // F
        'Frank',
        'Felix',
        'Frederick',
        // G
        'George',
        'Gavin',
        'Grant',
        // H
        'Henry',
        'Hunter',
        'Harrison',
        // I
        'Isaac',
        'Ian',
        'Ivan',
        // J
        'Jack',
        'James',
        'Jonathan',
        // K
        'Kevin',
        'Kyle',
        'Kenneth',
        // L
        'Liam',
        'Logan',
        'Lucas',
        // M
        'Matthew',
        'Michael',
        'Mason',
        // N
        'Nathan',
        'Noah',
        'Nicholas',
        // O
        'Oliver',
        'Owen',
        'Oscar',
        // P
        'Paul',
        'Patrick',
        'Philip',
        // Q
        'Quentin',
        'Quincy',
        'Quinn',
        // R
        'Robert',
        'Ryan',
        'Raymond',
        // S
        'Samuel',
        'Simon',
        'Steven',
        // T
        'Thomas',
        'Timothy',
        'Theodore',
        // U
        'Ulysses',
        'Uriel',
        'Ulrich',
        // V
        'Victor',
        'Vincent',
        'Vernon',
        // W
        'William',
        'Wesley',
        'Wyatt',
        // X
        'Xander',
        'Xavier',
        'Xerxes',
        // Y
        'Yusuf',
        'Yahir',
        'Yannick',
        // Z
        'Zachary',
        'Zane',
        'Zion',
      ],
    }),

    components: { ListSearch },
  };
</script>

<template>
  <ListSearch :list="names" />
</template>
