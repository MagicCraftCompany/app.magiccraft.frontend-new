type RoadmapDataType = {
  quarter: number
  variant: 'default' | 'purple'
  goals: {
    features: string[]
  }[]
}[]

export const roadmapData: RoadmapDataType = [
  {
    quarter: 1,
    variant: 'default',
    goals: [
      {
        features: [
          'Addition of 3 new games to the MagicCraft Ecosystem',
          'Full UI/UX overhaul of the MagicCraft game',
          'Releasing a league system for ranked progression.',
        ],
      },
      {
        features: [
          'Releasing an NFT season pass for special benefits in the MagicCraft Ecosystem.',
          'Releasing an event calendar for tournaments, competitions, and special events.',
        ],
      },
      {
        features: [
          'New whitepaper release.',
          'Adding automatic matchmaking functionality to the MagicCraft Lobby.',
        ],
      },
    ],
  },
  {
    quarter: 2,
    variant: 'purple',
    goals: [
      {
        features: [
          'Addition of 3 new games to the MagicCraft Ecosystem.',
          'Major storyline updates for MagicCraft world and characters.',
        ],
      },
      {
        features: [
          'Enabling a 5v5 multiplayer quickplay mode with automatic matchmaking in MagicCraft game.',
          'Adding in-game items, including NFT skins, voice lines, and emotes for the MagicCraft game.',
        ],
      },
      {
        features: [
          'Renewing the season pass with added utilities in the MagicCraft Ecosystem.',
          'Overhauling the MagicCraft website to prioritize its Ecosystem of games.',
        ],
      },
    ],
  },
  {
    quarter: 3,
    variant: 'default',
    goals: [
      {
        features: [
          'Addition of 3 new games to the MagicCraft Ecosystem.',
          'Releasing a dynamic daily task system for the full MagicCraft Ecosystem.',
        ],
      },
      {
        features: [
          'Unveiling a comprehensive player reward system that ties all ecosystem games together, rewarding cross-game achievements.',
          'Collaborating with fantasy writers to expand the MagicCraft universe.',
        ],
      },
      {
        features: [
          'Renewing the season pass with added utilities in the MagicCraft Ecosystem',
          'Creating a MagicCraft marketplace for official merchandise.',
        ],
      },
    ],
  },
  {
    quarter: 4,
    variant: 'purple',

    goals: [
      {
        features: [
          'Addition of 1-3 new games to the MagicCraft Ecosystem.',
          'Developing a storyline expansion that introduces a new antagonist and questline.',
        ],
      },
      {
        features: [
          'Renewing the season pass with added utilities in the MagicCraft Ecosystem.',
        ],
      },
      {
        features: [
          "Planning an end-of-year celebratory event with surprise announcements for the next year's roadmap.",
        ],
      },
    ],
  },
]
