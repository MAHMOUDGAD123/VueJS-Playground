<script lang="ts">
  import ListSearch from './ListSearch.vue';

  export default {
    name: 'FemaleSearch',

    data: () => ({
      names: [
        // A
        'Alice',
        'Ava',
        'Abigail',
        // B
        'Bella',
        'Brooke',
        'Bianca',
        // C
        'Charlotte',
        'Chloe',
        'Clara',
        // D
        'Diana',
        'Daisy',
        'Danielle',
        // E
        'Emma',
        'Ella',
        'Evelyn',
        // F
        'Faith',
        'Fiona',
        'Freya',
        // G
        'Grace',
        'Gabriella',
        'Georgia',
        // H
        'Hannah',
        'Hailey',
        'Hazel',
        // I
        'Isabella',
        'Ivy',
        'Imogen',
        // J
        'Julia',
        'Jasmine',
        'Josephine',
        // K
        'Katherine',
        'Kayla',
        'Kiara',
        // L
        'Lily',
        'Lauren',
        'Leah',
        // M
        'Mia',
        'Madeline',
        'Morgan',
        // N
        'Natalie',
        'Naomi',
        'Nicole',
        // O
        'Olivia',
        'Ophelia',
        'Octavia',
        // P
        'Penelope',
        'Paige',
        'Phoebe',
        // Q
        'Quinn',
        'Queenie',
        'Quiana',
        // R
        'Rachel',
        'Rebecca',
        'Riley',
        // S
        'Sophia',
        'Scarlett',
        'Stella',
        // T
        'Taylor',
        'Tessa',
        'Trinity',
        // U
        'Uma',
        'Ulani',
        'Ursula',
        // V
        'Victoria',
        'Valeria',
        'Vanessa',
        // W
        'Willow',
        'Wendy',
        'Winter',
        // X
        'Ximena',
        'Xia',
        'Xandra',
        // Y
        'Yara',
        'Yasmine',
        'Yvette',
        // Z
        'Zoe',
        'Zara',
        'Zaria',
      ],
    }),

    components: { ListSearch },
  };
</script>

<template>
  <ListSearch :list="names" />
</template>
