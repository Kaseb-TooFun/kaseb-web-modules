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
				setTimeout(this.show, 5000);
				break;
			case 'wait-10':
				setTimeout(this.show, 10000);
				break;
			case 'wait-30':
				setTimeout(this.show, 30000);
				break;
			case 'wait-60':
				setTimeout(this.show, 60000);
				break;

			default:
				break;
		}
	}

	show = () => {
		const { id } = this.props;
		const banners = storage.getItem('banners') || {};
		if (banners[id]) {
			banners[id].show == true;
		} else {
			banners[id] = { show: true };
		}
		storage.setItem('banners', banners);
		this.setState({ isVisible: true });
	};

	render() {
		const { isVisible } = this.state;
		const { data, position } = this.props;
		const {
			description,
			btnText,
			btnColor,
			bgColor,
			url,
			isCloseable
		} = data;
		const classStr = `kio-banner kio-${position}-banner kio-a-animated kio-a-bounceIn${
			position == 'top' ? 'Down' : 'Up'
		}`;
		return (
			isVisible && (
				<div class={classStr} style={{ backgroundColor: bgColor }}>
					<div class="description">{description}</div>
					<a
						href={url}
						class="kio-btn"
						style={{ backgroundColor: btnColor }}
					>
						{btnText}
					</a>
					{isCloseable && (
						<span
							class="kio-close-btn"
							onClick={() => {
								this.setState({ isVisible: false });
							}}
						>
							close
						</span>
					)}
				</div>
			)
		);
	}
}
