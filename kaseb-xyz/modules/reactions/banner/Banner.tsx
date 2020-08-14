import React from 'react';
import { Component } from 'preact';
import { storage } from '../../utils';

interface IProps {
	id: string;
	data: any;
	position: 'top' | 'bottom';
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
		const { id } = this.props;
		const { showOnce } = this.props.data;
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
		const { data, position } = this.props;
		const {
			isRTL,
			description,
			textColor,
			btnText,
			btnColor,
			btnTextColor,
			bgColor,
			url,
			isCloseable
		} = data;
		const classStr = `kio-banner kio-${position}-banner kio-a-animated kio-a-bounceIn${
			position == 'top' ? 'Down' : 'Up'
		} ${isRTL === true ? 'is-rtl' : ''}`;
		return (
			isVisible && (
				<div
					class={classStr}
					style={{
						backgroundColor: bgColor,
						color: textColor || '#fff'
					}}
				>
					<div class="description">{description}</div>
					{btnText && btnText != '' && (
						<a
							href={url}
							class="kio-btn"
							style={{
								backgroundColor: btnColor,
								color: btnTextColor || '#fff'
							}}
						>
							{btnText}
						</a>
					)}
					{isCloseable && (
						<span class="kio-close-btn" onClick={this.close}>
							close
						</span>
					)}
					<a class="kio-logo" href="https://kaseb.xyz">
						K
					</a>
				</div>
			)
		);
	}
}
