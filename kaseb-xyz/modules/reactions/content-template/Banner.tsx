import React from 'react';
import { Component } from 'preact';
import { storage, setIdleTimeout } from '../../utils';
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

	componentDidMount() {
		const { data, id } = this.props;
		const { condition } = data;
		if (id == 'preview') return this.setState({ isVisible: true });

		const banners = storage.getItem('banners');
		if (banners && banners[id] && banners[id].show == true) return;
		switch (condition) {
			case 'wait-0':
			case 'on-load':
				return setTimeout(this.show, 1);
			case 'wait-5':
				return setTimeout(this.show, 500);
			case 'wait-5':
				return setTimeout(this.show, 5000);
			case 'wait-10':
				return setTimeout(this.show, 10000);
			case 'wait-20':
				return setTimeout(this.show, 20000);
			case 'wait-30':
				return setTimeout(this.show, 30000);
			case 'wait-60':
				return setTimeout(this.show, 60000);
			case 'idle-5':
				return setIdleTimeout(this.show, 5000);
			case 'idle-10':
				return setIdleTimeout(this.show, 10000);
			case 'idle-20':
				return setIdleTimeout(this.show, 20000);
			case 'idle-30':
				return setIdleTimeout(this.show, 30000);
			case 'idle-60':
				return setIdleTimeout(this.show, 60000);
			case 'on-hover':
				return this.onHover();
			case 'on-click':
				return this.onClick();

			default:
				break;
		}
	}

	onHover = () => {
		const { sourceSelector } = this.props.data;
		const item = document.querySelector(sourceSelector || 'x');
		if (item) {
			item.addEventListener('mouseenter', this.show, { once: true });
		}
	};

	onClick = () => {
		const { sourceSelector } = this.props.data;
		const item = document.querySelector(sourceSelector || 'x');
		if (item) {
			item.addEventListener('click', this.show, {
				once: true,
				passive: true
			});
		}
	};

	show = () => {
		this.setState({ isVisible: true });
	};

	close = () => {
		const { id, data } = this.props;
		const { showOnce } = data;
		if (showOnce != true) return this.setState({ isVisible: false });

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
				? 'kio-a-bounceInUp'
				: 'kio-a-bounceInDown';
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
