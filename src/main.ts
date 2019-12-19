import "../libs/createjs/easeljs.js";
import "../libs/createjs/tweenjs.js";

import core from "./core";
import ShapePreloadUI from "./cui/ShapePreloadUI";

import CircleTween from "./demo/CircleTween";
import BaseContainer from "./cui/BaseContainer";

class Main {

    private _preloadUI: ShapePreloadUI;

    constructor () {
        createjs.Ticker.on( 'tick', this._onTick );
        core.STAGE.enableMouseOver();

        this._initPreload();
    }

    /** 初始化进度条 */
    private _initPreload(): void {
        this._preloadUI = new ShapePreloadUI( "#FFF", "#5e5e5e" );
        core.STAGE.addChild( this._preloadUI );

        // console.log( this._preloadUI.width, this._preloadUI.height );

        this._createScene();
    }

    /** 创建场景 */
    private _createScene(): void {
        let circleTween = new CircleTween;
        core.STAGE.addChild( circleTween );
        // circleTween.setBounds(x, y, width, height)
    }

    private _onTick( evt: Object ): void {
        core.STAGE.update( evt );
    }
}

new Main();

