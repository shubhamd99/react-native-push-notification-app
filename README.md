### Installation Guide:

1. Install Package - npm install --save @react-native-firebase/app

2. Android and IOS Setup - https://rnfirebase.io

3. Android Enabling Multidex - https://rnfirebase.io/enabling-multidex

4. Autolinking & rebuilding

```
# Android apps
npx react-native run-android

# iOS apps
cd ios/
pod install --repo-update
cd ..
npx react-native run-ios
```

5. Install Firebase Cloud Messaging Package - npm install --save @react-native-firebase/messaging