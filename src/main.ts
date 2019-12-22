import "../libs/createjs/easeljs.js";
import "../libs/createjs/tweenjs.js";
import "../libs/createjs/preloadjs.js";

import core from "./core";
import Loader from "./Loader";

import resConfig from "../resource/default.res.json";

import ShapePreloadUI from "./cui/ShapePreloadUI";
import GameScene from "./game/GameScene";
import ResultPanel from "./game/ResultPanel";

class Main {
    private _preloadUI: ShapePreloadUI;

    constructor () {
        createjs.Ticker.on( 'tick', this._onTick );
        createjs.Ticker.setFPS( 20 );
        core.STAGE.enableMouseOver();

        this._initPreload();
    }

    /** 初始化进度条 */
    private _initPreload(): void {
        this._preloadUI = new ShapePreloadUI( "#FFF", "#5e5e5e" );
        core.STAGE.addChild( this._preloadUI );
        this._preloadUI.anchorOffX = 0.5;
        this._preloadUI.anchorOffY = 0.5;
        this._preloadUI.x = core.STAGE_WIDTH / 2;
        this._preloadUI.y = core.STAGE_HEIGHT / 2;

        Loader.getIns().setLoadProgress( this._preloadUI );
        Loader.getIns().loadConfig( resConfig, this._createScene, this );
        // console.log( this._preloadUI.width, this._preloadUI.height );
    }

    /** 创建场景 */
    private _createScene(): void {
        core.STAGE.removeChild( this._preloadUI );

        core.STAGE.addChild( new GameScene() );
        // core.STAGE.addChild( new ResultPanel() );
    }

    private _onTick( evt: Object ): void {
        core.STAGE.update( evt );
    }
}

new Main();

