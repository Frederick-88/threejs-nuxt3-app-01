const loadImageAssets = import.meta.glob("~/assets/images/**/*", {
  eager: true,
  import: "default",
});

export const getImageAssets = (path) => {
  return loadImageAssets["/assets/images/" + path];
};
