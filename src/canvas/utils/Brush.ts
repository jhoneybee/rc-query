import * as PIXI from 'pixi.js'
import debounce from 'lodash.debounce'
import { Position } from '../../interface'

// 绘制一条连接线
const linkLine = (start: Position, end: Position) => {
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(1, 0x1e1f26); 
    graphics.moveTo(start.x, start.y)
    graphics.lineTo(start.x, start.y)
    graphics.lineTo(start.x, end.y)
    graphics.lineTo(end.x, end.y)
    return  graphics
}

let number = 0 
// 绘制一个圆形
const round = (position: Position, rightClick?: (position: Position) => void) => {
    var graphics = new PIXI.Graphics();
    graphics.beginFill()
    graphics.lineStyle(1, 0x1e1f26); 
    graphics.beginFill(0x1890ff, 1);
    graphics.drawCircle(position.x, position.y, 10);
    graphics.interactive = true;
    graphics.on('rightclick',() => {
        if(rightClick){
            debounce(rightClick, 80)(position)
        }
    })
    graphics.endFill();
    return graphics
}

export const Brush = {
    linkLine,
    round
}
