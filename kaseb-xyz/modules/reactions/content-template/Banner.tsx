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
			case 'scroll-to-end':
				return this.initOnScollToEnd();
			case 'on-hover':
				return this.initOnHover();
			case 'on-click':
				return document.addEventListener('click', this.onClick);

			default:
				break;
		}
	}

	logEvent = (
		type: 'GOAL' | 'BANNER_SHOW' | 'BANNER_CLOSE' | 'BANNER_BUTTON_CLICK',
		properties?: {
			[key: string]: string[];
		}
	) => {
		const { id } = this.props;
		if (id !== 'preview') {
			analytics.trackEvent(id, type, properties);
		}
	};

	initOnScollToEnd = () => {
		window.addEventListener('scroll', this.onScroll);
	};

	onScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			this.onScrollToEnd()
		}
	};

	onScrollToEnd = () => {
		window.removeEventListener('scroll', this.onScroll);
		this.show();
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
		const { id, template, data } = this.props;
		const { condition } = data;
		this.showTime = Math.floor(new Date().getTime() / 1000);
		this.setState({ isVisible: true });
		document.removeEventListener('click', this.onClick);
		this.logEvent('BANNER_SHOW');

		if (
			template == 'top-banner' &&
			(condition == 'wait-0' || condition == 'on-load')
		) {
			setTimeout(() => {
				const banner = document.querySelector(`.kio-banner-${id}`);
				banner.classList.add('kio-top-banner-prepend');
				document.body.prepend(banner);
				setTimeout(() => {
					banner.classList.add('kio-top-banner-visible');
				}, 300);
			}, 1);
		}
	};

	close = () => {
		const { id, data } = this.props;
		const isPreview = id === 'preview';
		const { showOnce } = data;

		const duration =
			Math.floor(new Date().getTime() / 1000) - this.showTime;
		this.logEvent('BANNER_CLOSE', {
			duration: [`${duration}`]
		});

		const banner = document.querySelector(
			`.kio-banner-${id}.kio-top-banner-prepend`
		);
		if (banner) {
			banner.remove();
		}

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
		const { id, data, template } = this.props;
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
		const classStr = `kio-banner-${id} kio-${template} kio-a-animated ${entranceAnimation} ${
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
							onClick={() => this.logEvent('BANNER_BUTTON_CLICK')}
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
