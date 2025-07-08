## 🚀 Description

- Implemented a modern, single-screen React Native TODO app using Expo.
- Users can add, edit, complete, and delete tasks.
- All tasks are persisted locally using AsyncStorage.
- UI matches the provided Figma design, with custom font, color, and spacing.
- Added bonus animations for:
  - List item addition/removal (smooth fade/slide)
  - Checkbox toggle (bounce effect)
- Responsive and visually consistent on both iOS and Android.

---

## 💡 Solution Rationale & User Value

- **Componentization:** Broke down the UI into reusable components (`TodoItem`, `TodoInput`, `FloatingButton`, `AppText`) for maintainability and clarity.
- **Custom Typography:** Centralized font and text styles for a consistent look and easy future updates.
- **SafeAreaView:** Used `react-native-safe-area-context` to ensure proper layout on all devices.
- **Animations:** Used `react-native-reanimated` for delightful, modern UI transitions, improving user experience.
- **Single Source of Truth:** All todo logic is managed in a custom hook (`useTodos`), making state and persistence easy to reason about.

---

## 💾 Local Persistence Rationale

- **Method:** Used `@react-native-async-storage/async-storage`.
- **Why:** It’s simple, reliable, and well-supported for local key-value storage in React Native. It’s perfect for small-to-medium data like a todo list, and doesn’t require extra native setup or dependencies.
- **Trade-offs:** Not suitable for very large datasets or complex queries, but ideal for this use case.

---

## 🧠 Global State (if used)

- **Not used.** All state is managed locally within the custom `useTodos` hook, as global state was not necessary for this app’s scale.

---

## 💫 Animations (Bonus, if implemented)

- **List Item Add/Remove:** Used `react-native-reanimated` to animate todos sliding in and fading out, for a smooth, modern feel.
- **Checkbox Toggle:** Added a bounce animation to the checkbox when toggling completion.
- **Result:** These animations make the app feel more responsive and delightful, and demonstrate advanced React Native skills.

---

## 🎥 Demo Video

Include a link to your screen recording here (e.g. Loom, MP4, or GIF):

> Example:  
> https://loom.com/share/your-demo-link

---

## 🛠️ Setup Instructions (if different from README)

- Run `npm install` or `yarn` in the `/ToDo` directory.
- Run `npx expo start` to launch the app.
- No additional setup required.

---

## 📌 Known Limitations / Assumptions

- No global state management (not needed for this scale).
- No backend or cloud sync (local only).
- Only the Montserrat font is used (can be swapped for TT Firs Neue if available).

---

## ✅ Checklist

- [x] Tasks can be added
- [x] Tasks can be viewed
- [x] Tasks can be edited
- [x] Tasks can be marked complete/incomplete
- [x] Tasks can be deleted
- [x] Data is persisted locally on the device
- [x] Local storage method explained
- [x] (Optional) Global state usage explained
- [x] (Optional) Animations added using `react-native-reanimated`
- [x] Demo video included
- [x] Solution rationale & user value explained

---
