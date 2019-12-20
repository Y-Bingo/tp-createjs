import "../libs/createjs/easeljs.js";
import "../libs/createjs/tweenjs.js";
import "../libs/createjs/preloadjs.js";

import core from "./core";
import Loader from "./Loader";

import resConfig from "../resource/default.res.json";

import ShapePreloadUI from "./cui/ShapePreloadUI";
import ShapeButton from "./cui/ShapeButton";

import CircleTween from "./demo/CircleTween";
import ColorPuzzle from "./demo/ColorPuzzle";
import MouseMove from "./demo/MouseMove";
import RunningMan from "./demo/RunningMan";

class Main {

    private _preloadUI: ShapePreloadUI;

    constructor () {
        createjs.Ticker.on( 'tick', this._onTick );
        createjs.Ticker.setFPS( 30 );
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

        this._create();
    }

    private _create(): void {
        let next = { x: 0, y: 20, width: 0 };

        let circle = new ShapeButton( "circle" );
        circle.x = next.x + next.width + 20;
        circle.y = next.y;
        circle.on( "click", () => {
            core.STAGE.removeAllChildren();

            let circleTween = new CircleTween;
            core.STAGE.addChild( circleTween );
        } );
        next = circle;

        let color = new ShapeButton( "color" );
        color.x = next.x + next.width + 20;
        color.y = next.y;
        color.on( "click", () => {
            core.STAGE.removeAllChildren();

            let colorPuzzle = new ColorPuzzle;
            core.STAGE.addChild( colorPuzzle );
        } );
        next = color;

        let mouse = new ShapeButton( "mouse" );
        mouse.x = next.x + next.width + 20;
        mouse.y = next.y;
        mouse.on( "click", () => {
            core.STAGE.removeAllChildren();

            let mouseMove = new MouseMove;
            core.STAGE.addChild( mouseMove );
        } );
        next = mouse;

        let run = new ShapeButton( "run" );
        run.x = next.x + next.width + 20;
        run.y = next.y;
        run.on( "click", () => {
            core.STAGE.removeAllChildren();

            let runningMan = new RunningMan();
            core.STAGE.addChild( runningMan );
        } );
        next = run;

        core.STAGE.addChild( circle, mouse, color, run );
    }


    private _onTick( evt: Object ): void {
        core.STAGE.update( evt );
    }
}

new Main();

