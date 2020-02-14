import React from 'react';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';
import Slider from 'rc-slider';


class Palette extends React.Component {
    constructor(props) {
        super(props);
        this.state = { level: 500 };
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ))
        return (
            <div className="Palette">
                <div className="slider">
                    <Slider
                        defaultValue={this.state.level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={this.changeLevel}

                    />
                </div>

                {/* navbar goes here */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* footer here */}
            </div>
        )
    }
}

export default Palette;
