export const SPORTS_CONFIG = {
  Football: {
    type: "Team Sport",
    categories: [
      {
        id: "men",
        label: "Men's Team",
        minPlayers: 11,
        maxPlayers: 16,
        eventID: 3,
      },
      {
        id: "women",
        label: "Women's Team",
        minPlayers: 6,
        maxPlayers: 10,
        eventID: 4,
      },
    ],
  },
  Cricket: {
    type: "Team Sport",
    categories: [
      {
        id: "men",
        label: "Men's Team",
        minPlayers: 11,
        maxPlayers: 15,
        eventID: 1,
      },
      {
        id: "women",
        label: "Women's Team",
        minPlayers: 7,
        maxPlayers: 11,
        eventID: 2,
      },
    ],
  },
  Basketball: {
    type: "Team Sport",
    categories: [
      {
        id: "men",
        label: "Men's Team",
        minPlayers: 8,
        maxPlayers: 12,
        eventID: 9,
      },
      {
        id: "women",
        label: "Women's Team",
        minPlayers: 8,
        maxPlayers: 10,
        eventID: 10,
      },
    ],
  },
  Volleyball: {
    type: "Team Sport",
    categories: [
      {
        id: "men",
        label: "Men's Team",
        minPlayers: 9,
        maxPlayers: 11,
        eventID: 7,
      },
      {
        id: "women",
        label: "Women's Team",
        minPlayers: 9,
        maxPlayers: 11,
        eventID: 8,
      },
    ],
  },
  "Lawn Tennis": {
    type: "Team Entry",
    categories: [
      {
        id: "men",
        label: "Men's Team",
        minPlayers: 1,
        maxPlayers: 12,
        eventID: 16,
      },
      {
        id: "women",
        label: "Women's Team",
        minPlayers: 1,
        maxPlayers: 12,
        eventID: 17,
      },
    ],
  },
  Badminton: {
    type: "Team Entry",
    categories: [
      {
        id: "men",
        label: "Men's Team",
        minPlayers: 5,
        maxPlayers: 8,
        eventID: 11,
      },
      {
        id: "women",
        label: "Women's Team",
        minPlayers: 5,
        maxPlayers: 8,
        eventID: 12,
      },
    ],
  },
  "Table Tennis": {
    type: "Mixed",
    categories: [
      {
        id: "men_team",
        label: "Men's Team",
        minPlayers: 5,
        maxPlayers: 8,
        eventID: 18,
      },
      {
        id: "women_team",
        label: "Women's Team",
        minPlayers: 5,
        maxPlayers: 8,
        eventID: 19,
      },
      {
        id: "men_single",
        label: "Men's Singles",
        minPlayers: 1,
        maxPlayers: 1,
        eventID: 20,
      },
      {
        id: "women_single",
        label: "Women's Singles",
        minPlayers: 1,
        maxPlayers: 1,
        eventID: 21,
      },
      {
        id: "mixed_double",
        label: "Mixed Doubles",
        minPlayers: 2,
        maxPlayers: 2,
        eventID: 22,
      },
    ],
  },
  Carrom: {
    type: "Mixed",
    categories: [
      {
        id: "men_team",
        label: "Men's Team (3-5 Players)",
        minPlayers: 3,
        maxPlayers: 5,
        eventID: 23,
      },
      {
        id: "women_team",
        label: "Women's Team (3-5 Players)",
        minPlayers: 3,
        maxPlayers: 5,
        eventID: 24,
      },
      {
        id: "mixed_double",
        label: "Mixed Doubles",
        minPlayers: 2,
        maxPlayers: 2,
        eventID: 25,
      },
    ],
  },
  Chess: {
    type: "Team Entry",
    categories: [
      {
        id: "men",
        label: "Men's Team (4 Players)",
        minPlayers: 4,
        maxPlayers: 4,
        eventID: 5,
      },
      {
        id: "women",
        label: "Women's Team (4 Players)",
        minPlayers: 4,
        maxPlayers: 4,
        eventID: 6,
      },
    ],
  },
  "E-Sports": {
    type: "E-Sports",
    categories: [
      {
        id: "bgmi",
        label: "BGMI Team",
        minPlayers: 4,
        maxPlayers: 5,
        eventID: 13,
      },
      {
        id: "free_fire",
        label: "Free Fire Team",
        minPlayers: 4,
        maxPlayers: 5,
        eventID: 15,
      },
      {
        id: "valorant",
        label: "Valorant Team",
        minPlayers: 5,
        maxPlayers: 6,
        eventID: 14,
      },
    ],
  },
};
