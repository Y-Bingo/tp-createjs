import Circle from "./Circle";
import Loader from "../Loader";

import { MAP, RADIUS, OFF_X, OFF_Y, DOT_START_X, DOT_START_Y } from "./Constants";

import Cat from "./Cat";
import BaseContainer from "../cui/BaseContainer";
import ButtonBitmap from "../cui/ButtonBitmap";
import core from "../core";

/**
 * 围住神经猫主函数
 */
export default class GameScene extends BaseContainer {

    private _bg: createjs.Bitmap;               // 背景
    private _dotContainer: createjs.Container;  // 容器

    private _startBtn: ButtonBitmap;    // 开始按钮

    private _cat: Cat;            // 猫

    private _map: number[][];

    private _count: number;         // 计步

    constructor () {
        super();
        this._map = MAP.concat( [] );

        this._initUI();
    }

    private _initUI() {
        this._initBg();
        this._initDot();
        this._initCat();
    }

    private _initBg() {
        this._bg = new createjs.Bitmap( Loader.getIns().getRes( "bg" ) );
        this.addChild( this._bg );

        this._dotContainer = new createjs.Container();
        this._dotContainer.x = DOT_START_X;
        this._dotContainer.y = DOT_START_Y;
        this._dotContainer.addEventListener( "click", this._onClick.bind( this ) );
        this.addChild( this._dotContainer );

        // this._startBtn = new ButtonBitmap( "btn_start" );
        // this._startBtn.x = core.SCREEN_WIDTH;
        // this._startBtn.y = core.SCREEN_HEIGHT - this._startBtn.height;
        // this.addChild( this._startBtn );
    }

    // 初始化点
    private _initDot() {
        let n = Math.round( Math.random() * 20 ) + 5;
        for ( let k = 0;k < n;k++ ) {
            let row = Math.floor( Math.random() * 9 );
            let col = Math.floor( Math.random() * 9 );

            this._map[ row ][ col ] = 2;
        }

        for ( let row = 0;row < MAP.length;row++ ) {
            for ( let col = 0;col < MAP[ row ].length;col++ ) {
                let dot = new Circle( MAP[ row ][ col ] );
                dot.x = ( RADIUS + OFF_X ) * col + RADIUS / 2 * ( row % 2 );
                dot.y = ( RADIUS + OFF_Y ) * row;
                dot.row = row;
                dot.col = col;
                this._dotContainer.addChild( dot );
            }
        }
    }

    private _initCat() {
        this._cat = new Cat();
        this.addChild( this._cat );

        this._cat.start( this._map );
        // this.cat.setPos( 4, 4 );
        // this.cat.findNext( map )
    }

    private _onClick( e ) {
        let dot = e.target;
        if ( dot.type == 2 || ( dot.row == this._cat.row && dot.col == this._cat.col ) ) return;
        this._count++;
        dot.setType( 2 );
        this._map[ dot.row ][ dot.col ] = 2;

        let nextNode = this._cat.findNext( this._map );
        if ( !nextNode )
            alert( "神经猫无路可逃了！" );
        else {
            console.error( `！！神经猫下一步：${ nextNode.row }:${ nextNode.col }` );
            if ( this._checkWin( nextNode.row, nextNode.col ) )
                alert( "神经猫出院了！" );
            else
                this._cat.setPos( nextNode.row, nextNode.col );

        }
    }

    // 检查胜利条件
    _checkWin( row, col ) {
        return ( row < 0 || row >= this._map.length || col < 0 || col >= this._map[ row ].length );
    }

    // 检查失败条件
    _checkLose() {

    }

}