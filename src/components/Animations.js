import React, { Component } from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import asset from '../assets/images/asset.png';

const BlockLinkPose = posed.div({
    hidden: {
        opacity: 0,
        scale: 0.5
    },

    visible: {
        opacity: 1,
        scale: 1
    }
})

class BlockLink extends Component {
    state = { isVisible: false };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: !this.state.isVisible });
        }, 300);
    }

    render() {
        return (
            <BlockLinkPose className={this.props.className} pose={this.state.isVisible ? 'visible' : 'hidden'}>
                {
                    this.props.custom ? (
                        <React.Fragment>
                            <Link to={{ pathname: this.props.link, state: { title: this.props.title } }}>
                                <div className={'button-wrap-goals'}>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div className='col-12 mt-2 mb-2'>
                                            <img src={this.props.img} height='40px' width='40px' />
                                        </div>
                                        <div className='col-12 mb-2 mt-2'>{this.props.title}</div>
                                    </div>
                                </div>
                            </Link>
                        </React.Fragment>

                    ) : (
                        <Link to={{ pathname: this.props.link, state: { title: this.props.title } }}>
                            <div className="row">
                                <div className="col-12 mb-2 mt-4">
                                    <img src={this.props.img} className="img-btn" />
                                </div>
                                <div className="col-12 container d-flex align-items-center justify-content-center">
                                    {this.props.title}
                                </div>
                            </div>
                        </Link>
                    )
                }
                {/* <Link to={{ pathname: this.props.link, state: {title: this.props.title} }}>
                    <div className="row">
                        <div className="col-12 mb-2 mt-4">
                            <img src={this.props.img} className="img-btn" />
                        </div>
                        <div className="col-12 container d-flex align-items-center justify-content-center">
                            {this.props.title}
                        </div>
                    </div>
                </Link>
                <React.Fragment>
                    <div className={'button-wrap-goals'}>
                        <div style={{ flexDirection: 'column' }}>
                            <div className='col-12 mt-2 mb-2'>
                                <img src={this.props.img} height='40px' width='40px' />
                            </div>
                            <div className='col-12 mb-2 mt-2'>{this.props.title}</div>
                        </div>
                    </div>
                </React.Fragment> */}
            </BlockLinkPose>
        );
    }
}

const FormPagePoseOld = posed.div({
    visible: {
        x: '0%',
        // staggerChildren: 100 
    },
    hidden: {
        x: '-100%'
    }
})

class FormPage extends Component {
    state = { isVisible: false };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('componentDidMount');
        setTimeout(() => {
            this.setState({ isVisible: !this.state.isVisible });
        }, 1000);
    }

    render() {
        return (
            <FormPagePoseOld className={this.props.className} pose={this.state.isVisible ? 'visible' : 'hidden'}>
                {this.props.children}
            </FormPagePoseOld>
        );
    }
}

const FormPagePose = posed.div({
    visible: {
        x: '0%',
        // staggerChildren: 100 
        opacity: 1,
        transition: {
            ease: 'linear'
        }
    },
    hidden: {
        x: '-100%',
        opacity: 0
    }
})

export { BlockLink, FormPage, FormPagePose };