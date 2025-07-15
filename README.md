# ✅ React Native Take-home Assignment — "tasked"

## 🧠 Objective

This assignment is intended to evaluate your understanding of UI development and local state management in **React Native**.

You will build a TODO list app based on a provided Figma design, with a focus on **styling, interactions, and local persistence**.

---

## 🎨 Design

Please use the following Figma file as the reference for your design:

👉 [Figma Design – tasked](https://www.figma.com/design/snheK7vmaMYoedBuBPACWo/tasked-%E2%80%94-the-to-do-list-app?node-id=0-1&p=f&m=dev)

Aim to match the layout, spacing, font weights, and interaction patterns as closely as possible.

---

## 🚧 Features

The app should allow users to:

- ✅ View a list of TODO items
- ➕ Add a new TODO item using the input field
- ✏️ Edit a TODO item's title
- ✅ Toggle completion (checked/unchecked)
- ❌ Delete a TODO item

All TODOs must be **persisted on the device** using a local storage solution of your choice.

---

## 💾 Data Persistence

- You must persist data locally on the device.
- You are free to choose **any storage medium**.
- Please include a short explanation in your pull request explaining:
  - Why you chose that storage method
  - What trade-offs you considered (e.g., performance, ease of use, scalability)

---

## 🧠 State Management

Global state management (e.g., using Zustand, Redux, Recoil, Jotai, etc.) is **optional**.

- If you choose to use global state, please explain:
  - Why it was necessary
  - What benefits it provided in this case

Otherwise, using `useState`/`useReducer` locally is completely acceptable.

---

## 📱 Development Guidelines

- You may use **any React Native setup** (e.g., React Native CLI, Expo, or a custom configuration)
- Feel free to use community libraries for icons, UI, or gesture handling
- Try to match the visual design as closely as possible
- Focus on writing clean, readable, and maintainable code

---

## 💫 Bonus (Optional)

If you'd like to go the extra mile, feel free to enhance the user experience by adding animations using [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/).

Examples could include:
- Animating list item additions/removals
- Animating checkbox toggles
- Transitions on input focus or interactions

Please consider these as mere examples. You have the complete creative freedom to animate however you see fit. Additionally, please remember this is purely optional and **not required** to complete the exercise.

---

## 🧾 Submission Instructions

1. **Fork** this repository to your own GitHub account.
2. Create a new branch named `develop`.
3. Complete your work on this branch.
4. Create a **Pull Request to your own fork** (`develop` → `main`).
5. Make sure to fill out the provided **PR template**, including:
   - Summary of your implementation
   - Rationale for chosen local storage method
   - (If used) Rationale for global state management
   - A short demo video or GIF of the app in use
6. Fill [this form](https://coda.io/form/Type-B-Digital-Take-Home-assessment-submission_dhoOxXXJp0V) to officially submit your work

> ⚠️ Submissions may not be considered if the instructions are not followed correctly

---

## ⏳ Time Expectation

We expect this task to take around **4–6 hours**. Please don’t over-optimize — the goal is to assess your ability to build and ship clean, functional React Native UIs with basic persistence.

---

## ✅ Evaluation Criteria

- Instructions followed
- Visual accuracy to the Figma design
- Functional completeness of all features
- Code structure and modularity
- Correct use of local persistence
- Clarity in PR write-up and reasoning
- (Optional) Effective use of global state

---

Thank you for your time and effort — we’re excited to see what you build!
