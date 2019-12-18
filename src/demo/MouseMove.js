
import { STAGE, STAGE_HEIGHT } from "../core.js";

/**
 * 鼠标移动炫酷
 */
export default class MouseMove extends createjs.Container {
    data = {
        images: [ "resource/assets/demo/2.png" ],
        frames: { width: 20, height: 20, regX: 10, regY: 10 }
    }
    sprite;

    constructor () {
        super();
        this._initUI();
    }

    _initUI () {
       
        this.sprite = new createjs.Sprite( new createjs.SpriteSheet( this.data ) );
    }

    onMouseDown () {
        this.addS( Math.random() * 200 + 100, STAGE.mouseX, STAGE.mouseY, 2 );
    }

    onMouseMove () {
        this.addS( Math.random() * 2 + 1, STAGE.mouseX, STAGE.mouseY, 1 );
    }

    onTick () {
        let t = this.numChildren;
        for ( let i = t - 1; i > 0; i-- ) {
            let s = this.getChildAt( i );
            s.vY += 2;
            s.vX += 1;
            s.x += s.vX;
            s.y += s.vY;
            s.alpha += s.vA;
            s.scaleX = s.scaleY = s.scaleX + s.vS;
            if ( s.alpha <= 0 || s.y > STAGE_HEIGHT ) {
                this.removeChildAt( i );
            }
        }
    }

    addS ( count, x, y, speed ) {
        for ( let i = 0; i < count; i++ ) {
            let s = this.sprite.clone();
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