import React from 'react';
import { Component } from 'preact';

interface IProps {
	description: string;
	btnText: string;
	url: string;
	condition: string;
	isCloseable: boolean;
	position: 'top' | 'bottom';
}

interface IState {
	show: boolean;
}

export default class Banner extends Component<IProps, IState> {
	state = { show: false };

	componentDidMount() {
		const { condition } = this.props;
		switch (condition) {
			case 'wait-5':
				setTimeout(() => {
					this.setState({ show: true });
				}, 5000);
				break;
			case 'wait-10':
				setTimeout(() => {
					this.setState({ show: true });
				}, 10000);
				break;
			case 'wait-30':
				setTimeout(() => {
					this.setState({ show: true });
				}, 30000);
				break;
			case 'wait-60':
				setTimeout(() => {
					this.setState({ show: true });
				}, 60000);
				break;

			default:
				break;
		}
	}

	render() {
		const { show } = this.state;
		const { description, btnText, url, isCloseable, position } = this.props;
		const classStr = `kio banner ${position}-banner animate__animated animate__bounceInDown`;
		return (
			show && (
				<div class={classStr}>
					<div class="description">{description}</div>
					<a href={url} class="btn">
						{btnText}
					</a>
					{isCloseable && (
						<span
							class="close-btn"
							onClick={() => {
								this.setState({ show: false });
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
