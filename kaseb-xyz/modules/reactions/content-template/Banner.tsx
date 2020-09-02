import React from 'react';
import { Component } from 'preact';
import { storage, setIdleTimeout } from '../../utils';
import analytics from '../../analytics';
import KasebLogo from '../../../assets/KasebLogo';
import CloseIcon from '../../../assets/CloseIcon';

interface IProps {
	id: string;
	data: any;
	template: 'top-banner' | 'bottom-banner';
}

interface IState {
	isVisible: boolean;
}

export default class Banner extends Component<IProps, IState> {
	state = { isVisible: false };
	showTime = 0;

	componentDidMount() {
		const { data, id } = this.props;
		const isPreview = id === 'preview';
		const { condition } = data;

		if (!isPreview) {
			analytics.init(id);
		}

		const banners = storage.getItem('banners');
		if (!isPreview && banners && banners[id] && banners[id].show == true)
			return;
		switch (condition) {
			case 'wait-0':
			case 'on-load':
				return setTimeout(this.show, 1);
			case 'wait-5':
				return setTimeout(this.show, isPreview ? 1000 : 5000);
			case 'wait-10':
				return setTimeout(this.show, isPreview ? 1000 : 10000);
			case 'wait-20':
				return setTimeout(this.show, isPreview ? 1000 : 20000);
			case 'wait-30':
				return setTimeout(this.show, isPreview ? 1000 : 30000);
			case 'wait-60':
				return setTimeout(this.show, isPreview ? 1000 : 60000);
			case 'idle-5':
				return setIdleTimeout(this.show, isPreview ? 1000 : 5000);
			case 'idle-10':
				return setIdleTimeout(this.show, isPreview ? 1000 : 10000);
			case 'idle-20':
				return setIdleTimeout(this.show, isPreview ? 1000 : 20000);
			case 'idle-30':
				return setIdleTimeout(this.show, isPreview ? 1000 : 30000);
			case 'idle-60':
				return setIdleTimeout(this.show, isPreview ? 1000 : 60000);
			case 'on-hover':
				return this.initOnHover();
			case 'on-click':
				return document.addEventListener('click', this.onClick);

			default:
				break;
		}
	}

	logEvent = (
		type:
			| 'goal'
			| 'banner_show'
			| 'banner_close'
			| 'banner_button_click'
			| 'banner_preview_time',
		properties?: {
			[key: string]: string[];
		}
	) => {
		const { id } = this.props;
		if (id !== 'preview') {
			analytics.trackEvent(id, type, properties);
		}
	};

	initOnHover = () => {
		const { sourceSelector } = this.props.data;
		const item = document.querySelector(sourceSelector || 'x');
		if (item) {
			item.addEventListener('mouseenter', this.onHover);
		} else {
			window.setTimeout(this.initOnHover, 1000);
		}
	};

	onHover = () => {
		const { sourceSelector } = this.props.data;
		const item = document.querySelector(sourceSelector || 'x');
		if (item) {
			this.show();
			item.removeEventListener('mouseenter', this.onHover);
		}
	};

	onClick = (event: MouseEvent) => {
		const { sourceSelector } = this.props.data;
		const item = document.querySelector(sourceSelector || 'x');
		if (item && item.isEqualNode(event.target)) {
			event.preventDefault();
			this.show();
		}
	};

	show = () => {
		this.showTime = Math.floor(new Date().getTime() / 1000);
		this.setState({ isVisible: true });
		document.removeEventListener('click', this.onClick);
		this.logEvent('banner_show');
	};

	close = () => {
		const { id, data } = this.props;
		const isPreview = id === 'preview';
		const { showOnce } = data;

		const duration =
			Math.floor(new Date().getTime() / 1000) - this.showTime;
		this.logEvent('banner_close', {
			duration: [`${duration}`]
		});

		// this.logEvent('banner_preview_time', {
		// 	duration: [`${duration}`]
		// });
		if (!isPreview && showOnce != true)
			return this.setState({ isVisible: false });

		const banners = storage.getItem('banners') || {};
		if (banners[id]) {
			banners[id].show == true;
		} else {
			banners[id] = { show: true };
		}
		storage.setItem('banners', banners);
		this.setState({ isVisible: false });
	};

	render() {
		const { isVisible } = this.state;
		const { data, template } = this.props;
		const {
			isRTL,
			description,
			textColor = '#fff',
			btnText,
			btnColor,
			btnTextColor = '#fff',
			bgColor,
			fontFamily,
			url,
			isCloseable
		} = data;
		const entranceAnimation =
			template == 'top-banner'
				? 'kio-a-bounceInDown'
				: 'kio-a-bounceInUp';
		const classStr = `kio-banner kio-${template} kio-a-animated ${entranceAnimation} ${
			isRTL === true ? 'is-rtl' : ''
		}`;
		return (
			isVisible && (
				<div
					class={classStr}
					style={{
						backgroundColor: bgColor,
						color: textColor,
						fontFamily
					}}
				>
					<div class="kio-description">{description}</div>
					{btnText && btnText != '' && (
						<a
							href={url}
							class="kio-btn"
							style={{
								backgroundColor: btnColor,
								color: btnTextColor
							}}
							onClick={() => this.logEvent('banner_button_click')}
						>
							{btnText}
						</a>
					)}
					{isCloseable && (
						<CloseIcon class="kio-close-btn" onClick={this.close} />
					)}
					<a href="https://kaseb.xyz" target="_blank">
						<KasebLogo class="kio-logo" />
					</a>
				</div>
			)
		);
	}
}
