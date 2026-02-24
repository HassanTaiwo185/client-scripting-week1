-- Installation and Run Instructions
npm install
npm run dev

-- Overview of implemented features

Create, Edit, and Delete products – User can add new products by a toggling form, edit existing products, or delete them with.

Form with inline validation – All form fields are validated on blur and on submit, with error messages displayed under each input fields.


Search – User can search products by name or description in real time as they type.

Sort – User can sort products by name (A–Z / Z–A) or price (low–high / high–low) through a dropdown.


Toolbar – Search input field, sort dropdown button, and a Show/Hide Form toggle button are in the tool bar for user interaction.

localStorage persistence – Products are  automatically saved and remain after a page reload.

Reset Storage – Clears all persisted products from localStorage.

Auto-dismissing banners – Success messages appear to user  after every action and disappear automatically after 2 seconds and vice versa.

Empty state – when products does not exist in local storage a friendly message is shown .


