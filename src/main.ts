import "../libs/createjs/easeljs.js";

import core from "./core";
import ShapePreloadUI from "./cui/ShapePreloadUI";
import ShapeButton from "./cui/ShapeButton";

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
    }

    /** 创建场景 */
    private _createScene(): void {

    }

    private _onTick( evt: Object ): void {
        core.STAGE.update( evt );
    }
}

new Main();

