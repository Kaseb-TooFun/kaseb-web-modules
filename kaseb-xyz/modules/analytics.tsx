import { storage, uuid4, xhr } from './utils';

class User {
	constructor() {
		const userId = storage.getItem('user-id');
		if (userId) {
			this.userId = userId;
		} else {
			this.userId = this.generateUserId();
		}
	}

	public userId = '';

	private generateUserId = () => {
		const newId = uuid4();
		storage.setItem('user-id', newId);
		storage.setItem('new-user', newId);
		return newId;
	};
}

export class Analytics {
	constructor() {
		const script = Array.from(document.scripts)
			.map((item) => item.src)
			.find((src) => (src || '').indexOf('kio.js?id=') != -1);
		this.websiteId = script.replace(/(.*)id=/, '');
		this.user = new User();
		this.deviceType = this.getDeviceType();
		this.OS = this.getDeviceOS();
		const browser = this.getBrowserInfo();
		this.borwserName = browser.name;
		this.borwserVer = browser.version;
	}

	websiteId = '';
	user: User = null;
	deviceType = 'desktop';
	OS = 'LINUX';
	borwserName = 'Chrome';
	borwserVer = '0';

	init = (configId: string) => {
		const newId = storage.getItem('new-user');
		if (newId) {
			this.trackEvent(configId, 'NEW_USER_REGISTER');
			storage.removeItem('new-user');
		}
	};

	getDeviceType = () => {
		const ua = navigator.userAgent;
		if (
			/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(
				ua
			)
		) {
			return 'Tablet';
		}
		if (
			/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
				ua
			)
		) {
			return 'Mobile';
		}
		return 'Desktop';
	};

	getDeviceOS = () => {
		const version = navigator.appVersion;
		if (version.indexOf('Win') != -1) return 'Windows';
		if (version.indexOf('Mac') != -1) return 'MacOS';
		if (version.indexOf('X11') != -1) return 'UNIX';
		if (version.indexOf('Linux') != -1) return 'Linux';

		return 'Unknown OS';
	};

	getBrowserInfo = () => {
		let ua = navigator.userAgent;
		let browserName = navigator.appName;
		let fullVersion = '' + parseFloat(navigator.appVersion);
		let nameOffset = 0,
			verOffset = 0,
			ix = 0;

		// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset = ua.indexOf('Opera')) != -1) {
			browserName = 'Opera';
			fullVersion = ua.substring(verOffset + 6);
			if ((verOffset = ua.indexOf('Version')) != -1)
				fullVersion = ua.substring(verOffset + 8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if ((verOffset = ua.indexOf('MSIE')) != -1) {
			browserName = 'IE';
			fullVersion = ua.substring(verOffset + 5);
		}
		// In Chrome, the true version is after "Chrome"
		else if ((verOffset = ua.indexOf('Chrome')) != -1) {
			browserName = 'Chrome';
			fullVersion = ua.substring(verOffset + 7);
		}
		// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset = ua.indexOf('Safari')) != -1) {
			browserName = 'Safari';
			fullVersion = ua.substring(verOffset + 7);
			if ((verOffset = ua.indexOf('Version')) != -1)
				fullVersion = ua.substring(verOffset + 8);
		}
		// In Firefox, the true version is after "Firefox"
		else if ((verOffset = ua.indexOf('Firefox')) != -1) {
			browserName = 'Firefox';
			fullVersion = ua.substring(verOffset + 8);
		}
		// In most other browsers, "name/version" is at the end of userAgent
		else if (
			(nameOffset = ua.lastIndexOf(' ') + 1) <
			(verOffset = ua.lastIndexOf('/'))
		) {
			browserName = ua.substring(nameOffset, verOffset);
			fullVersion = ua.substring(verOffset + 1);
			if (browserName.toLowerCase() == browserName.toUpperCase()) {
				browserName = navigator.appName;
			}
		}
		// trim the fullVersion string at semicolon/space if present
		if ((ix = fullVersion.indexOf(';')) != -1)
			fullVersion = fullVersion.substring(0, ix);
		if ((ix = fullVersion.indexOf(' ')) != -1)
			fullVersion = fullVersion.substring(0, ix);

		return {
			name: browserName,
			version: fullVersion
		};
	};

	trackEvent = (
		configId: string,
		type:
			| 'GOAL'
			| 'BANNER_SHOW'
			| 'BANNER_CLOSE'
			| 'BANNER_BUTTON_CLICK'
			| 'ANIMATION_RUN'
			| 'ANIMATION_CLICK_ITEM'
			| 'NEW_USER_REGISTER'
			| 'SESSION_DURATION',
		properties?: {
			[key: string]: string[];
		}
	) => {
		const deviceProps = {
			OS: [`${this.OS}`],
			deviceType: [`${this.deviceType}`],
			borwser: [`${this.borwserName}`],
			borwserVer: [`${this.borwserVer}`]
		};
		const eventObj = {
			entityId: this.user.userId,
			eventType: type,
			targetEntityId: configId,
			websiteId: this.websiteId,
			properties: properties
				? {
						...deviceProps,
						...properties
				  }
				: deviceProps
		};

		xhr(
			'POST',
			`${process.env.TRACK_BASE_URL}/api/v1/tracking`,
			eventObj
		).catch((e) => e);
	};
}

export default new Analytics();
