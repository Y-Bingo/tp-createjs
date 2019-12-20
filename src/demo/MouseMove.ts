import core from "../core";

import BaseContainer from "../cui/BaseContainer";

/**
 * 鼠标移动炫酷
 */
export default class MouseMove extends BaseContainer {

    private _sheetJson = {
        images: [ "resource/assets/2.png" ],
        frames: { width: 20, height: 20, regX: 10, regY: 10 }
    };
    private _sprite: MySprite;

    constructor () {
        super();
        this._initUI();
    }

    _initUI() {
        this._sprite = new MySprite( new createjs.SpriteSheet( this._sheetJson ) );
    }

    protected $addEvent(): void {
        super.$addEvent();
        this.on( "tick", this.onTick );
        this.stage.on( "stagemousedown", this._onMouseDown, this );
        this.stage.on( "stagemousemove", this._onMouseMove, this );
    }

    private _onMouseDown() {
        this.addS( Math.round( Math.random() * 200 ) + 100, this.stage.mouseX, this.stage.mouseY, 2 );
    }

    private _onMouseMove() {
        this.addS( Math.round( Math.random() * 2 ) + 1, this.stage.mouseX, this.stage.mouseY, 1 );
    }

    onTick() {
        let t = this.numChildren;
        for ( let i = t - 1; i >= 0; i-- ) {
            let s = this.getChildAt( i ) as MySprite;
            s.vX += 1;
            s.vY += 2;
            s.x += s.vX;
            s.y += s.vY;
            s.alpha += s.vA;
            s.scaleX = s.scaleY = s.scaleX + s.vS;
            this._checkOut( s, i );
        }
    }

    /** 检查是否移出 */
    private _checkOut( target: MySprite, i: number ): void {
        let width = core.STAGE_WIDTH;
        let height = core.STAGE_HEIGHT;
        if (
            target.alpha <= 0
            || target.y > height
            || target.x > width
            || target.y < 0
            || target.x < 0
        )
            this.removeChildAt( i );
    }

    addS( count, x, y, speed ): void {
        for ( let i = 0; i < count; i++ ) {
            let s = this._sprite.clone() as MySprite;
            s.x = x;
            s.y = y;
            s.alpha = Math.random() * 0.5 + 0.5;
            s.scaleX = s.scaleY = Math.random() + 0.3;

            let a = Math.PI * 2 * Math.random();
            let v = ( Math.random() - 0.5 ) * 30 * speed;
            s.vX = Math.cos( a ) * v;
            s.vY = Math.sin( a ) * v;
            s.vS = ( Math.random() - 0.5 ) * 0.2;       // scale
            s.vA = -( Math.random() - 0.05 - 0.01 );       // alpha
            this.addChild( s );
        }
    }
}

class MySprite extends createjs.Sprite {
    /** X轴方向上的速度 */
    vX: number;
    /** Y轴方向上的速度 */
    vY: number;
    /** 透明度变化速度 */
    vA: number;
    /** 缩放变化速度 */
    vS: number;
}