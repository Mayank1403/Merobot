import React, {Component} from 'react';
import {Stage, Layer, Text, Rect} from 'react-konva';


export default class Rectangle extends Component{

    //Keeps track of points that are being clicked
    state = {
        line : []
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
                        // <Line key={i} points = {line} stroke = "red" />
                        <Rect 
                            key={i}
                            x={line[0]}
                            y={line[1]}
                            width={line[line.length-2]-line[0]}
                            height={line[line.length-1]-line[1]}
                            stroke="red"
                        />
                    ))}
                </Layer>
            </Stage>
        );
    }
}