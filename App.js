import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
const PushNotification = require("react-native-push-notification");

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.setupPushNotification = this.setupPushNotification.bind(this);
	}

	async componentDidMount() {
		this.setupPushNotification();
	}

	render() {
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ fontSize: 20 }}>Received Push Notification</Text>
			</View>
		);
	}

	setupPushNotification() {
		// Must be outside of any component LifeCycle (such as `componentDidMount`).
		PushNotification.configure({
			// (optional) Called when Token is generated (iOS and Android)
			onRegister: function (token) {
				console.log("TOKEN:", token);
			},

			// (required) Called when a remote is received or opened, or local notification is opened
			onNotification: function (notification) {
				console.log("NOTIFICATION:", notification);

				// process the notification

				// (required) Called when a remote is received or opened, or local notification is opened
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},

			// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
			onAction: function (notification) {
				console.log("ACTION:", notification.action);
				console.log("NOTIFICATION:", notification);

				// process the action
			},

			// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
			onRegistrationError: function (err) {
				console.error(err.message, err);
			},

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},

			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,

			/**
			 * (optional) default: true
			 * - Specified if permissions (ios) and token (android and ios) will requested or not,
			 * - if not, you must call PushNotificationsHandler.requestPermissions() later
			 * - if you are not using remote notification or do not have Firebase installed, use this:
			 *     requestPermissions: Platform.OS === 'ios'
			 */
			requestPermissions: true,
		});
	}
}

function testPush(notification) {
	PushNotification.localNotification({
		title: notification.title, // (optional)
		message: notification.message, // (required)
	});
}

function testCancel() {
	PushNotification.cancelAllLocalNotifications();
}

function testScheduleNotification() {
	PushNotification.localNotificationSchedule({
		//... You can use all the options from localNotifications
		message: "My First Notification", // (required)
		date: new Date(Date.now() + 60 * 1000), // in 60 secs
		allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
	});
}
