// Theme registry. A theme only changes how cards and the table look — never the rules.
// To add a theme: copy one of the blocks below, give it a new key, and change the values.
//
//   colors  – the 4 light-side colours (red/yellow/green/blue) and 4 UNO Flip dark-side colours
//             (pink/teal/orange/purple). `label` is what players see ("Elsa Blue").
//   labels  – names shown on action cards.
//   icons   – symbols shown in the middle of action cards.
//   back    – the card back.
//   table   – page background; `dark` is used when an UNO Flip game is on its dark side.
//   fx      – optional falling particles.
(function () {
  const baseLabels = {
    skip: 'Skip', reverse: 'Reverse', draw: 'Draw', wild: 'Wild', wildDraw: 'Wild Draw',
    skipAll: 'Skip All', discardAll: 'Discard All', colorRoulette: 'Roulette', flip: 'Flip',
    wildDrawColor: 'Draw Colour', wildReverseDraw: 'Rev. Draw',
  };
  const baseIcons = {
    skip: '⊘', reverse: '⇄', wild: '★', skipAll: '⊘⊘', discardAll: '♻', colorRoulette: '🎯',
    flip: '↻', wildDrawColor: '🎨', wildReverseDraw: '⇄',
  };

  window.UNO_THEMES = {
    classic: {
      name: 'Classic',
      font: "'Nunito', system-ui, sans-serif",
      colors: {
        red: { hex: '#e5322d', label: 'Red' },
        yellow: { hex: '#f7c400', label: 'Yellow' },
        green: { hex: '#2ea44f', label: 'Green' },
        blue: { hex: '#1e6fd9', label: 'Blue' },
        pink: { hex: '#e8368f', label: 'Pink' },
        teal: { hex: '#0fa3a3', label: 'Teal' },
        orange: { hex: '#f26b1d', label: 'Orange' },
        purple: { hex: '#7b3fc4', label: 'Purple' },
      },
      labels: baseLabels,
      icons: baseIcons,
      back: { bg: 'radial-gradient(circle at 50% 40%, #ff3d2e 0%, #b30f0f 70%)', text: 'UNO', color: '#ffd23f' },
      table: {
        light: 'radial-gradient(ellipse at 50% 30%, #1d2a44 0%, #0b0f1a 70%)',
        dark: 'radial-gradient(ellipse at 50% 30%, #2a1238 0%, #07030c 70%)',
      },
      accent: '#ffb31a',
      fx: null,
    },

    frozen: {
      name: 'Frozen ❄',
      font: "'Nunito', system-ui, sans-serif",
      colors: {
        red: { hex: '#c2185b', label: 'Anna Rose' },
        yellow: { hex: '#f3c969', label: 'Olaf Gold' },
        green: { hex: '#2e8b75', label: 'Kristoff Pine' },
        blue: { hex: '#2fa8e0', label: 'Elsa Ice' },
        pink: { hex: '#e86fb0', label: 'Aurora Pink' },
        teal: { hex: '#20c2c2', label: 'Glacier Teal' },
        orange: { hex: '#f29b50', label: 'Sven Amber' },
        purple: { hex: '#7e57c2', label: 'Northern Violet' },
      },
      labels: { ...baseLabels, skip: 'Freeze', reverse: 'Whirl', draw: 'Snowball', wild: 'Ice Magic', wildDraw: 'Blizzard', skipAll: 'Deep Freeze', flip: 'Thaw', wildDrawColor: 'Avalanche' },
      icons: { ...baseIcons, skip: '🧊', reverse: '🌀', wild: '❄️', skipAll: '🥶', flip: '☃️', wildDrawColor: '🏔️', colorRoulette: '🔮' },
      back: { bg: 'linear-gradient(145deg, #bde8ff 0%, #5fb4e8 45%, #2c5aa0 100%)', text: '❄', color: '#ffffff' },
      table: {
        light: 'linear-gradient(180deg, #0e3a5c 0%, #1b6aa0 55%, #a9dcf5 140%)',
        dark: 'linear-gradient(180deg, #0a0f2c 0%, #26195a 60%, #4b3a8f 140%)',
      },
      accent: '#9fe3ff',
      fx: { chars: ['❄', '❅', '❆', '•'], color: 'rgba(255,255,255,.85)', count: 36 },
    },

    ramayanam: {
      name: 'Ramayanam 🏹',
      font: "'Nunito', system-ui, sans-serif",
      colors: {
        red: { hex: '#d9480f', label: 'Hanuman Saffron' },
        yellow: { hex: '#f2b705', label: 'Sita Gold' },
        green: { hex: '#2b8a3e', label: 'Lakshmana Green' },
        blue: { hex: '#1c5fb8', label: 'Rama Blue' },
        pink: { hex: '#d6336c', label: 'Surpanakha Rose' },
        teal: { hex: '#0c8599', label: 'Vibhishana Teal' },
        orange: { hex: '#e8590c', label: 'Agni Flame' },
        purple: { hex: '#6a1b9a', label: 'Ravana Violet' },
      },
      labels: { ...baseLabels, skip: 'Vanavasa', reverse: 'Pushpaka', draw: 'Bana', wild: 'Brahmastra', wildDraw: 'Vanara Sena', skipAll: 'Setu', flip: 'Lanka', wildDrawColor: 'Dashanana', discardAll: 'Agni Pariksha', colorRoulette: 'Maya Mriga' },
      icons: { ...baseIcons, skip: '🏹', reverse: '🕊️', wild: '🐒', wildDraw: '🐒', skipAll: '🌉', flip: '🔥', wildDrawColor: '👹', discardAll: '🔥', colorRoulette: '🦌' },
      back: { bg: 'radial-gradient(circle at 50% 45%, #ffb347 0%, #d9480f 55%, #7a1f00 100%)', text: 'राम', color: '#fff3c4' },
      table: {
        light: 'radial-gradient(ellipse at 50% 20%, #7a2e0e 0%, #3b1206 60%, #1a0703 100%)',
        dark: 'radial-gradient(ellipse at 50% 20%, #3d0f4f 0%, #1a0524 60%, #080210 100%)',
      },
      accent: '#ffc53d',
      fx: { chars: ['✿', '❀', '✦'], color: 'rgba(255, 190, 90, .7)', count: 22 },
    },

    mahabharatam: {
      name: 'Mahabharatam ⚔',
      font: "'Nunito', system-ui, sans-serif",
      colors: {
        red: { hex: '#c92a2a', label: 'Bhima Red' },
        yellow: { hex: '#e8a317', label: 'Yudhishthira Gold' },
        green: { hex: '#2f9e44', label: 'Nakula-Sahadeva Green' },
        blue: { hex: '#1864ab', label: 'Arjuna Blue' },
        pink: { hex: '#c2255c', label: 'Draupadi Rose' },
        teal: { hex: '#0b7285', label: 'Krishna Teal' },
        orange: { hex: '#e67700', label: 'Karna Sun' },
        purple: { hex: '#5f3dc4', label: 'Duryodhana Violet' },
      },
      labels: { ...baseLabels, skip: 'Chakravyuha', reverse: 'Sudarshana', draw: 'Gandiva', wild: 'Vishwaroopa', wildDraw: 'Bhishma Vow', skipAll: 'Kurukshetra', flip: 'Maya Sabha', wildDrawColor: 'Shakuni Dice', discardAll: 'Gita', colorRoulette: 'Dice Game' },
      icons: { ...baseIcons, skip: '🛡️', reverse: '☸️', wild: '🪈', wildDraw: '⚔️', skipAll: '🏹', flip: '🏛️', wildDrawColor: '🎲', discardAll: '📜', colorRoulette: '🎲' },
      back: { bg: 'radial-gradient(circle at 50% 45%, #f1c27d 0%, #9c6b30 55%, #3e2410 100%)', text: '⚔', color: '#fff4d6' },
      table: {
        light: 'radial-gradient(ellipse at 50% 20%, #4a3218 0%, #221507 60%, #0d0803 100%)',
        dark: 'radial-gradient(ellipse at 50% 20%, #2b1a3f 0%, #120a1d 60%, #05030a 100%)',
      },
      accent: '#f5c16c',
      fx: { chars: ['✦', '·'], color: 'rgba(255, 210, 140, .6)', count: 26 },
    },
  };
})();
