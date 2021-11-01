export default async ({ store }) => {
  await store.dispatch('pages/getNavigation');
}
