# Tender — Recipe Discovery App

Tender is a mobile app that helps you decide what to cook tonight. Inspired by dating apps, you swipe through recipes, keep the ones that look good, then narrow them down in a tournament-style face-off until you land on your pick. Save your favourites locally on your phone — no account, no cloud, no friction.

---

## How it works

```
Pick categories → Swipe recipes → Review your likes → Battle them down → Cook → Save to favourites
```

1. **Home** — Select one or more meal categories (Beef, Seafood, Dessert…)
2. **Swipe** — Swipe right to like a recipe, left to pass
3. **Your likes** — Review everything you liked, remove anything, or jump straight to a recipe
4. **Pick your favourite** — Head-to-head tournament: tap the one you'd rather cook, repeat until one wins
5. **Time to cook** — Full recipe with ingredients and step-by-step instructions
6. **Favourites** — Recipes you've hearted are saved locally and available any time

---

## Screenshots

| Home | Swipe | Liked list | Recipe |
|------|-------|------------|--------|
| ![Home screen](assets/screenshots/Home%20screen.png) | ![Selection screen](assets/screenshots/Selection%20screen.png) | ![Liked list screen](assets/screenshots/Liked%20list%20screen.png) | ![Recipe screen](assets/screenshots/Receipe%20screen.png) |

---

## Tech stack

| Layer | Package | Version | Role |
|---|---|---|---|
| Framework | [Expo](https://expo.dev) | 55 | Build toolchain, dev server, OTA updates |
| UI runtime | [React Native](https://reactnative.dev) | 0.83 | Core mobile UI primitives |
| React | [React](https://react.dev) | 19 | Component model |
| Navigation | [@react-navigation/stack](https://reactnavigation.org) | 7 | Stack-based screen navigation |
| UI components | [react-native-paper](https://callstack.github.io/react-native-paper) | 5 | Material Design 3 theme + components |
| Swipe cards | [react-tinder-card](https://github.com/3DJakob/react-tinder-card) | 1.6 | Tinder-style swipeable cards |
| HTTP | [axios](https://axios-http.com) | 1.6 | API calls to TheMealDB |
| Local storage | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage) | 2 | Persists favourites on-device |
| SVG | [react-native-svg](https://github.com/software-mansion/react-native-svg) + [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer) | 15 / 1.5 | Renders the SVG logo |
| Gestures | [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler) | 2 | Required by React Navigation stack |
| Animations | [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated) | 4 | Navigation transition animations |
| Recipe data | [TheMealDB API](https://www.themealdb.com/api.php) | free tier | ~300 recipes across 14 categories, free, no key needed |

All favourites are stored **on-device only** using AsyncStorage. No account, no backend, no internet required once a recipe is open.

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli` (or use `npx`)
- A device or simulator:
  - **iOS simulator** — requires Xcode (macOS only)
  - **Android emulator** — requires Android Studio
  - **Physical device** — install [Expo Go](https://expo.dev/go) on your phone (iOS or Android)

### Install

```bash
git clone <repo-url>
cd Tender-mobile
npm install
```

### Run

```bash
# Start the dev server
npx expo start --clear

# Then pick a target:
#   Press i  → iOS simulator
#   Press a  → Android emulator
#   Scan QR  → Expo Go on your phone
```

> The `--clear` flag wipes Metro's cache. Recommended on first run and after dependency changes.

### Run directly on a specific platform

```bash
npx expo start --ios      # iOS simulator
npx expo start --android  # Android emulator
```

---

## Project structure

```
Tender-mobile/
├── App.js                        # Root: navigation stack + theme
├── app.json                      # Expo config
├── metro.config.js               # Metro bundler (SVG support)
├── assets/                       # Icons, splash, logo SVG
├── screens/
│   ├── HomeScreen.js             # Category selection
│   ├── SelectScreen.js           # Swipe interface
│   ├── ListScreen.js             # Liked recipes list
│   ├── CompareSelectionScreen.js # Tournament bracket
│   ├── CookScreen.js             # Full recipe + favourite button
│   └── FavoritesScreen.js        # Saved favourites
├── components/
│   ├── RecipeListElement.js      # List card (thumbnail + Cook + Remove)
│   ├── CategoriesTicket.js       # Category checkbox chip
│   ├── IngredientsList.js        # Ingredient rows
│   └── IconButton.js             # Reusable icon button (AntDesign)
├── constants/
│   └── colors.js                 # Material Design 3 green palette
└── utils/
    ├── favorites.js              # AsyncStorage read/write helpers
    ├── shuffle.js                # Fisher-Yates shuffle
    └── uniqueArray.js            # Deduplicate meals by idMeal
```

---

## Data source

All recipe data comes from **[TheMealDB](https://www.themealdb.com)** — a free, open recipe database. No API key is required for the public tier. Recipes cover 14 categories and include ingredients, measurements, and step-by-step instructions.

---

## Notes

- Favourites survive app restarts and phone reboots. They do **not** transfer to a new phone (by design — no accounts).
- The swipe screen loads all meals for the selected categories into memory at once. Performance is fine for typical use (a few hundred recipes), but may slow down if many categories are selected simultaneously.
- `react-tinder-card` officially supports up to React 18. It works with React 19 in practice, but if swipe behaviour ever breaks, that's the first place to look.
