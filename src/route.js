//#region Pages
import Main from './pages/Main.svelte';
import Login from './pages/Login.svelte';
import MoodView from './pages/MoodView.svelte';
//#endregion Pages

export default [
  { path: '/', component: Main },
  { path: '/login', component: Login },
  { path: './mood-view', component: MoodView }
];
