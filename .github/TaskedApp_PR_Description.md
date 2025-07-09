
🚀 Description:

This pull request implements the core functionality and UI for the Tasked app, aligned closely with the provided Figma design.

**Key Features:**
- Task creation, editing, deletion, and completion toggling
- Inline editing with animated transitions
- Clean, minimal UI matching Figma specs
- Input background color updated to #EEEEEE for editing mode
- Removal of card-style containers and visual dividers for task items
- Smooth, native-feeling long-press editing interaction
- Updated touch targets and icon usage for improved usability

💡 Solution Rationale & User Value

The implementation prioritizes:
- Visual accuracy with the design: spacing, colors, and UI structure were refined to closely match the Figma layout
- Readability & maintainability: cleanly separated view and logic components; styles are modular and scalable
- User experience: Animations and gestures enhance the interaction flow without cluttering the interface
- Touch-optimized interaction: Tasks are editable via long-press to prevent accidental triggers

This approach ensures users experience a responsive and visually consistent interface, while also making it easier for developers to iterate on the codebase.

💾 Local Persistence Rationale:
The app uses AsyncStorage for local persistence.

**Reasoning:**
- Lightweight and sufficient for simple key-value storage
- Native support via React Native APIs
- Minimal setup required; easy integration with Redux

🧠 Global State Management
The app uses Redux for global state.

**Rationale:**
- Centralizes task management across components
- Simplifies logic for updates, deletes, and persistence
- Scales well for future features (e.g. filtering, syncing)
- Avoids prop drilling and improves maintainability

Redux was selected to provide a predictable and scalable architecture, while ensuring consistency across the UI.

💫 Animations
While not using react-native-reanimated, the app includes animations via the built-in Animated API:

- Smooth fade transitions between text and editable input views
- Enhances feedback when switching to and from edit mode
- Lightweight and easy to maintain

These animations improve user clarity without adding external dependencies.

🎥 Demo Video
✅ Included  
https://drive.google.com/drive/folders/1_vY_5d0JgQA9adRXXWs5CrNusuuKUGNJ?usp=drive_link

🛠️ Setup Instructions
No additional setup required beyond the default instructions:
```bash
npm install
cd tasked
cd tasked-todo
npx expo start
```
Ensure your Redux store and AsyncStorage setup is completed as per the project documentation.

✅ Checklist
- [x] Task creation functionality
- [x] Task viewing
- [x] Task editing with inline input
- [x] Task completion toggling
- [x] Task deletion
- [x] Data persisted locally via AsyncStorage
- [x] Global state managed with Redux
- [x] UI matches Figma design (including spacing and colors)
- [x] Transitions/animations implemented for editing mode
- [x] Demo video recorded and linked
- [x] Code and solution rationale documented
