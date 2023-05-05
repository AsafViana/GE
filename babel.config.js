module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
<<<<<<< HEAD
    plugins: ["nativewind/babel", 'react-native-reanimated/plugin'],
=======
    plugins: ["nativewind/babel"],
>>>>>>> login
  };
};
