import React, {Component} from 'react';
import {Stage, Line, Layer, Text} from 'react-konva';


//https://medium.com/@ibenthinkin/making-a-simple-drawing-app-with-react-and-konva-js-20784a9b3f93
export default class Canvas extends Component{

    // const [color, setColor] = useState('red');

    //Keeps track of points that are being clicked
    state = {
        line : [],
        color : "red"
    };

    handleMouseDown = ()=>{
        //Run when we start drawing
        this._drawing = true;
        this.setState({
            line : [...this.state.line, []]
        });
    }

    handleMouseUp = ()=>{
        this._drawing = false;
    }

    handleMouseEvent = (e)=>{
        if(!this._drawing)
            return;
        
        //Declaration of the ref element to get the context from canvas
        const stage = this.stageRef.getStage();
        const point = stage.getPointerPosition();

        const {line} = this.state;

        // console.log(line);
        // console.log(line.length);
        let lastLine = line[line.length - 1];
        // console.log(lastLine);

        lastLine = lastLine.concat([point.x, point.y]);
        
        line.splice(line.length - 1, 1, lastLine);

        this.setState({
            line: line.concat()
        });
        // console.log(this.state);
    }

    render(){
        return(
            <div>
            <label>Color</label>
            <input type="color" value={this.state.color.current} onClick={e=>this.setState({color: e.target.value})}/>
            <Stage
                width = {window.innerWidth}
                height = {window.innerHeight}
                onContentMousedown = {this.handleMouseDown}
                onContentMouseup = {this.handleMouseUp}
                onContentMousemove = {this.handleMouseEvent}
                ref = {node =>{
                    this.stageRef = node;
                }}
            >
                
                <Layer>
                    <Text text = "Draw a thing!"/>
                    {this.state.line.map((line, i)=>(
                        <Line key={i} points = {line} stroke = {this.state.color} />
                    ))}
                </Layer>
            </Stage>
            </div>
        );
    }
}