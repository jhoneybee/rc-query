# Brush 画笔工具

```tsx
/**
 * title: 绘画简单的直线
 * desc: 通过 beeline  方法来进行绘画一条直线
 */

import React from 'react';
import { PixiCanvas, Brush } from 'rc-query';
import * as PIXI from 'pixi.js'

export default () => <PixiCanvas onStart={(app: PIXI.Application)=>{
     const graphics = new PIXI.Graphics()
     Brush.linkLine(graphics , {
         x: 200,
         y: 100
     },{
         x: 300,
         y: 200
     })
     Brush.round(graphics,{
         x: 200,
         y: 100
     })
     Brush.round(graphics, {
         x: 300,
         y: 200
     })
     app.stage.addChild(graphics)
}} />;
```