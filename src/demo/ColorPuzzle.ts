/**
 * 颜色拼图游戏
 */
import BaseContainer from "../cui/BaseContainer";

export default class ColorPuzzle extends BaseContainer {

    // 积分
    score = 0;
    // 颜色
    private _colors = [ "red", "blue", "yellow", "green" ];
    // 图形缓存
    private _shapes: createjs.Shape[] = [];
    // 插槽
    private _slots: createjs.Shape[] = [];

    constructor () {
        super();
        this._initUI();
    }

    private _initUI() {
        this.cursor = "point";
        this._shapes.length = 0;
        this._slots.length = 0;

        let slot: createjs.Shape;       // 插槽
        let shape: createjs.Shape;      // 图形
        for ( let i = 0;i < this._colors.length;i++ ) {
            // 插槽初始化
            slot = new createjs.Shape();
            slot.graphics.setStrokeStyle( 4 );
            slot.graphics.beginStroke( this._colors[ i ] );
            slot.graphics.beginFill( createjs.Graphics.getRGB( 255, 255, 255, 1 ) );
            slot.graphics.drawRect( 0, 0, 100, 100 );
            slot.regX = slot.regY = 50;
            slot.name = i + '';
            slot.y = 80;
            slot.x = ( i * 130 ) + 100;
            this.addChild( slot );
            this._slots.push( slot );

            // 图形初始化
            shape = new createjs.Shape();
            shape.graphics.beginFill( this._colors[ i ] );
            shape.graphics.drawRect( 0, 0, 100, 100 );
            shape.regX = shape.regY = 50;
            shape.name = i + "";
            this._shapes.push( shape );
        }
        this._setShapePos();
    }

    // 设置图形位置
    private _setShapePos() {
        let len = this._colors.length;
        let shape: createjs.Shape;
        let shapes = this._shapes.concat( [] );
        for ( let i = 0;i < this._colors.length;i++ ) {
            let r = Math.floor( Math.random() * shapes.length );
            shape = shapes[ r ];
            shape[ "homeY" ] = 320;
            shape[ "homeX" ] = ( i * 130 ) + 100;
            shape.y = shape[ "homeY" ];
            shape.x = shape[ "homeX" ];
            shape.on( "mousedown", this._onMouseDown, this );
            this.addChild( shape );
            shapes.splice( r, 1 );
        }
    }

    private _startX: number;
    private _startY: number;
    private _dragObj: createjs.Shape;
    private _fixeSlot: createjs.Shape;
    private _onMouseDown( evt ) {
        let shape = evt.target;
        this._dragObj = shape;

        this._fixeSlot = this._slots[ shape.name ];
        this._startX = evt.stageX;
        this._startY = evt.stageY;
        this.setChildIndex( shape, this.numChildren - 1 );

        this.stage.addEventListener( 'stagemousemove', this._onStageMousemove.bind( this ) );
        this.stage.addEventListener( 'stagemouseup', this._onStageMouseup.bind( this ) );
    }

    private _onStageMousemove( evt ): void {
        let offX = evt.stageX - this._startX;
        let offY = evt.stageY - this._startY;

        this._dragObj.x = this._dragObj[ "homeX" ] + offX;
        this._dragObj.y = this._dragObj[ "homeY" ] + offY;
    }

    private _onStageMouseup( evt ): void {
        this.stage.removeAllEventListeners();
        let pt = this._fixeSlot.globalToLocal( this.stage.mouseX, this.stage.mouseY );
        if ( this._fixeSlot.hitTest( pt.x, pt.y ) ) {
            this._dragObj.removeEventListener( "mousedown", this._onMouseDown );
            this.score++;
            createjs.Tween.get( this._dragObj )
                .to( { x: this._fixeSlot.x, y: this._fixeSlot.y }, 200, createjs.Ease.quadOut )
                .call( this._checkGame.bind( this ) );
        } else {
            createjs.Tween.get( this._dragObj ).to( { x: this._dragObj[ "homeX" ], y: this._dragObj[ "homeY" ] }, 200, createjs.Ease.quadOut );

        }
    }

    private _checkGame() {
        if ( this.score == 4 ) {
            alert( "You Win" );
        }
    }
}