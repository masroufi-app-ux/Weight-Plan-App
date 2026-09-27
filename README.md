# Weight Plan App

A mobile-first nutrition and weight-management app designed around Lebanese meals, local products, personal goals, activity, and realistic weekly routines.

## Current milestone

The first interactive product flow includes:

- Animated splash and welcome portal
- Delayed account creation
- Adaptive eight-step personal setup
- Goal, timeline, activity, steps, flexible-meal, gym, and supplement questions
- Personalized calorie-plan preview with a pace warning
- Free and Plus plan selection
- Sign-up, login, and OTP preview (`123456`)
- Initial daily dashboard
- Local draft persistence with AsyncStorage

Authentication, email delivery, subscriptions, nutrition data, and cloud persistence are UI previews in this milestone and will be connected to production services later.

## Run locally

```bash
npm install
npm run web
```

For mobile testing:

```bash
npm start
```

Open the QR code in Expo Go. The project uses Expo SDK 57, React Native, TypeScript, and Expo Router.

## Validation

```bash
npm run typecheck
npm run lint
npm run build:web
npx expo-doctor
```
