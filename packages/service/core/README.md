# CORE

[![CORE SERVICE CI](https://github.com/telly-health/tellyhealth/actions/workflows/core-service.yml/badge.svg)](https://github.com/telly-health/tellyhealth/actions/workflows/core-service.yml)

### Unit Tests

#### Setup a firebase emulator

* setup the firebase-cli

```shell
$ npm install -g firebase-tools
```

* login using a google account connected to firebase:

```shell
$ firebase login
```

* setup the emulator:

```shell
$ firebase init
```

select the `tellyhealth` project, in the menu use ` Emulators: Set up local emulators for Firebase features`, in the next menu select `Authentication Emulator, Firestore Emulator`