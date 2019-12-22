import Loader from "../Loader";
import { DOT_START_X, DOT_START_Y, RADIUS, OFF_X, OFF_Y, DOT_TYPE } from "./Constants";

enum ECatStatus {
    RELAX = 0,
    HIGHT = 2
}

/**
 * 猫对象
 */
const D = [ [ -1, -1 ], [ -1, 0 ], [ 0, -1 ], [ 0, 1 ], [ 1, -1 ], [ 1, 0 ] ];

export default class Cat extends createjs.Container {

    row: number;        // 当前横坐标
    col: number;        // 当前纵坐标

    nextRow: number;    // 下一步
    nextCol: number;    // 下一步

    private _state: ECatStatus;          // 状态

    private _relaxSheet: createjs.SpriteSheet;  // 放松的
    private _hightSheet: createjs.SpriteSheet;   // 紧张的

    private _sprite_1;    // 动画显示
    private _sprite_2;    // 动画显示

    constructor () {
        super();

        this.row = 0;
        this.col = 0;
        this.nextCol = -1;
        this.nextRow = -1;
        // this.state = 0;

        this._relaxSheet = new createjs.SpriteSheet( {
            'images': [ Loader.getIns().getRes( "stayCat" ) ],
            'frames': { 'regX': 0, 'height': 93, 'count': 16, 'regY': 0, 'width': 61 },
        } );

        this._hightSheet = new createjs.SpriteSheet( {
            'images': [ Loader.getIns().getRes( "crazyCat" ) ],
            'frames': { 'regX': 0, 'height': 91, 'count': 15, 'regY': 0, 'width': 64 },
        } );


        this._initSheet();
    }

    private _initSheet() {
        this._sprite_1 = new createjs.Sprite( this._relaxSheet );
        this._sprite_2 = new createjs.Sprite( this._hightSheet );

        // this.on( 'tick' );
        this.setState( 0 );
        // this.sprite.gotoAndPlay( "cut" );
        this.addChild( this._sprite_1 );
        this.addChild( this._sprite_2 );
    }

    setPos( row, col ) {
        this.row = row;
        this.col = col;

        this.x = DOT_START_X + ( RADIUS + OFF_X ) * col + RADIUS / 2 * ( row % 2 );
        this.y = DOT_START_Y + ( RADIUS + OFF_Y ) * row;

        console.error( `神经猫经过：${ row }:${ col }` );

    }

    start( map ) {
        let row = Math.ceil( Math.random() * 3 ) + 2;
        let col = Math.ceil( Math.random() * 3 ) + 2;
        if ( map[ row ][ col ] == DOT_TYPE.SELECT )
            this.start( map );
        else
            this.setPos( row, col );
    }

    // 跳
    jump() {

    }

    // 寻找下一条路
    findNext( map ) {
        let visit = this.cloneMap( map );
        let nodeArr = this.cloneMap( map, null );

        let rows = map.length;
        let cols = map[ 0 ].length;

        let curFloor = [];
        let nextFloor = [];
        nextFloor.push( new Node( this.row, this.col ) );

        while ( curFloor.length || nextFloor.length ) {
            // 判空
            if ( !curFloor.length ) {
                curFloor = null;
                curFloor = nextFloor;
                nextFloor = [];
                // 标记
                for ( let i = 0;i < curFloor.length;i++ ) {
                    visit[ curFloor[ i ].row ][ curFloor[ i ].col ] = 1;
                    nodeArr[ curFloor[ i ].row ][ curFloor[ i ].col ] = curFloor[ i ];
                }
            }

            let curNode = curFloor.pop();
            let point = 0;

            if ( curNode.row == 0 || curNode.row == rows - 1 || curNode.col == 0 || curNode.col == cols - 1 ) {
                this._addPoint( curNode, 100, 0 );
                continue;
            }

            for ( var i = D.length - 1;i >= 0;i-- ) {
                let offY = !D[ i ][ 0 ] ? 0 : ( curNode.row % 2 );
                let nextRow = D[ i ][ 0 ] + curNode.row;
                let nextCol = D[ i ][ 1 ] + curNode.col + offY;

                if ( visit[ nextRow ][ nextCol ] ) continue;
                point++;

                let nextNode = this._search( nextFloor, nextRow, nextCol );
                if ( !nextNode ) {
                    nextNode = new Node( nextRow, nextCol );
                    nextFloor.push( nextNode );
                }
                nextNode.addPre( curNode );
            }
            this._addPoint( curNode, point, 0 );
        }

        // console.table( map );
        // console.table( visit );
        // console.table( nodeArr );
        let score = [];
        for ( let i = nodeArr.length - 1;i >= 0;i-- ) {
            score[ i ] = [];
            for ( let j = nodeArr[ i ].length - 1;j >= 0;j-- ) {
                if ( nodeArr[ i ][ j ] )
                    score[ i ][ j ] = nodeArr[ i ][ j ].point;
                else
                    score[ i ][ j ] = 0;
            }
        }
        console.table( score );

        if ( this._checkClose( score, rows, cols ) ) {
            this.setState( 1 );
        }

        return this._findBest( nodeArr, this.row, this.col );
    }

    _findBest( nodeArr, startRow, startCol ) {
        let rows = nodeArr.length;
        let cols = nodeArr[ 0 ].length;

        let curNode = nodeArr[ startRow ][ startCol ];
        let bestNode = null;

        for ( let i = D.length - 1;i >= 0;i-- ) {
            let offY = !D[ i ][ 0 ] ? 0 : ( curNode.row % 2 );
            let nextRow = D[ i ][ 0 ] + curNode.row;
            let nextCol = D[ i ][ 1 ] + curNode.col + offY;

            if ( this._check( nextRow, nextCol, rows, cols ) )
                return new Node( nextRow, nextCol );

            if ( nodeArr[ nextRow ][ nextCol ] ) {
                if ( !bestNode )
                    bestNode = nodeArr[ nextRow ][ nextCol ];
                else if ( bestNode.point < nodeArr[ nextRow ][ nextCol ].point )
                    bestNode = nodeArr[ nextRow ][ nextCol ];
            }

        }
        return bestNode;
    }

    private _search( nodeArr, row, col ) {
        for ( let i = 0;i < nodeArr.length;i++ ) {
            if ( nodeArr[ i ].row == row && nodeArr[ i ].col == col )
                return nodeArr[ i ];
        }
        return null;
    }

    _visit( visit, row, col ) {
        if ( !visit[ row ] )
            visit[ row ] = [];
        visit[ row ][ col ] = 1;
    }

    // 检查闭合
    private _checkClose( nodeArr, rows, cols ) {
        let isClose = true;
        for ( let row = 0;row < rows;row++ ) {
            if ( nodeArr[ row ][ 0 ] || nodeArr[ row ][ cols - 1 ] ) {
                isClose = false;
                continue;
            }
        }
        for ( let col = 0;col < cols;col++ ) {
            if ( nodeArr[ 0 ][ col ] || nodeArr[ rows - 1 ][ col ] ) {
                isClose = false;
                continue;
            }
        }
        return isClose;
    }

    private _check( row, col, maxRow, maxCol ) {
        return row < 0 || row >= maxRow || col < 0 || col >= maxCol;
    }


    private _addPoint( node, point, step ) {
        if ( !node ) return;
        node.point += point - step * 70;
        for ( let i = 0;i < node.preNodes.length;i++ )
            this._addPoint( node.preNodes[ i ], point, step++ );
    }

    // 当前状态
    setState( newState ) {
        if ( this._state == newState ) return;
        this._state = newState;
        if ( newState ) {
            this._sprite_1.stop();
            this._sprite_2.play();

            this._sprite_1.visible = false;
            this._sprite_2.visible = true;

            this.regX = this._sprite_2.getBounds().width / 2 + 13;
            this.regY = this._sprite_2.getBounds().height + 7;
        } else {
            this._sprite_1.play();
            this._sprite_2.stop();

            this._sprite_1.visible = true;
            this._sprite_2.visible = false;

            this.regX = this._sprite_1.getBounds().width / 2 + 13;
            this.regY = this._sprite_1.getBounds().height + 7;
        }
    }

    cloneMap( dir: number[][], value?: number ) {
        let dst = [];
        for ( let i = dir.length - 1;i >= 0;i-- ) {
            for ( let j = dir[ i ].length - 1;j >= 0;j-- ) {
                if ( !dst[ i ] )
                    dst[ i ] = [];
                if ( dir[ i ][ j ] == DOT_TYPE.NULL )
                    dst[ i ][ j ] = 0;
                else if ( dir[ i ][ j ] == DOT_TYPE.SELECT )
                    dst[ i ][ j ] = 1;
                if ( value !== undefined )
                    dst[ i ][ j ] = value;
            }
        }
        return dst;
    }
}


class Node {
    row: number;
    col: number;
    preNodes: Node[];

    point: number;

    constructor ( row, col ) {
        this.row = row;
        this.col = col;
        this.preNodes = [];

        this.point = 0;
    }
    addPre = function ( pre ) {
        this.preNodes.push( pre );
    };
}