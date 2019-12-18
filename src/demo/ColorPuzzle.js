/**
 * 颜色拼图游戏
 */

import { STAGE } from "../core.js";

class ColorPuzzle {

    // 积分
    score = 0;
    // 颜色
    colors = [ "red", "blue", "yellow", "green" ];
    // 图形缓存
    shapes = [];
    // 插槽
    slots = [];

    constructor () {
        this.initUI();
    }

    initUI () {
        let slot;
        let shape;
        for ( let i = 0; i < this.colors.length; i++ ) {
            // 插槽初始化
            slot = new createjs.Shape();
            slot.graphics.setStrokeStyle( 4 );
            slot.graphics.beginStroke( this.colors[ i ] );
            slot.graphics.beginFill( createjs.Graphics.getRGB( 255, 255, 255, 1 ) );
            slot.graphics.drawRect( 0, 0, 100, 100 );
            slot.regX = slot.regY = 50;
            slot.key = i;
            slot.y = 80;
            slot.x = ( i * 130 ) + 100;
            STAGE.addChild( slot );
            this.slots.push( slot );

            // 图形初始化
            shape = new createjs.Shape();
            shape.graphics.beginFill( this.colors[ i ] );
            shape.graphics.drawRect( 0, 0, 100, 100 );
            shape.regX = shape.regY = 50;
            shape.key = i;
            this.shapes.push( shape );
        }
        this.setShapePos();
    }

    // 设置图形位置
    setShapePos () {
        let len = this.shapes.length;
        let shapes = this.shapes.concat( [] );
        let shape;
        for ( let i = 0; i < len; i++ ) {
            let r = Math.floor( Math.random() * shapes.length );
            shape = shapes[ r ];
            shape.homeY = 320;
            shape.homeX = ( i * 130 ) + 100;
            shape.y = shape.homeY;
            shape.x = shape.homeX;
            shape.addEventListener( "mousedown", this.onMouseDown.bind( this ) );
            STAGE.addChild( shape );
            shapes.splice( r, 1 );
        }
    }

    startGame () {
        createjs.Ticker.setFPS( 60 );
        createjs.Ticker.addEventListener( 'tick', () => {
            STAGE.update();
        } );
    }

    onMouseDown ( e ) {
        let shape = e.target;
        let slot = this.slots[ shape.key ];
        let mouseDown = [ e.stageX, e.stageY ];
        STAGE.setChildIndex( shape, STAGE.numChildren - 1 );
        STAGE.addEventListener( "stagemousemove", ( e ) => {
            let offX = e.stageX - mouseDown[ 0 ];
            let offY = e.stageY - mouseDown[ 1 ];

            shape.x = shape.homeX + offX;
            shape.y = shape.homeY + offY;
            // console.log( e, e.stageX, e.stageY );
        } );

        STAGE.addEventListener( 'stagemouseup', () => {
            STAGE.removeAllEventListeners();
            let pt = slot.globalToLocal( STAGE.mouseX, STAGE.mouseY );
            if ( slot.hitTest( pt.x, pt.y ) ) {
                shape.removeEventListener( "mousedown", this.onMouseDown );
                this.score++;
                createjs.Tween.get( shape )
                    .to( { x: slot.x, y: slot.y }, 200, createjs.Ease.quadOut )
                    .call( this.checkGame.bind( this ) );
            } else {
                createjs.Tween.get( shape ).to( { x: shape.homeX, y: shape.homeY }, 200, createjs.Ease.quadOut );

            }
        } )
    }

    checkGame () {
        if ( this.score == 4 ) {
            alert( "You Win" );
        }
    }
}

export default ColorPuzzle;