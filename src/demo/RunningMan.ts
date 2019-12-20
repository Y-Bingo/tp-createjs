/**
 * demo: 奔跑者
 */
import core from "../core";

import BaseContainer from "../cui/BaseContainer";
import ShapeButton from "../cui/ShapeButton";
import Runner from "./Runner";

import runningManJson from "../../resource/assets/runningMan.json";

export default class RunningMan extends BaseContainer {

    // runner图集
    private _spriteSheet: createjs.SpriteSheet;
    // 跑者
    private _runner: Runner;

    constructor () {
        super();
        this._spriteSheet = new createjs.SpriteSheet( runningManJson );
        this._initUI();
    }

    private _initUI() {
        this._buildRunner();
        this._buildButton();
    }

    private _buildRunner() {
        this._runner = new Runner( this._spriteSheet, "idle" );
        this._runner.y = 100;
        this.addChild( this._runner );
    }

    private _buildButton() {
        let jumpBtn = new ShapeButton( "JUMP" );
        jumpBtn.x = core.STAGE_HEIGHT - jumpBtn.width - 20;
        jumpBtn.y = core.STAGE_HEIGHT - jumpBtn.height - 20;
        jumpBtn.on( 'click', this._runner.jump, this._runner );

        let runBtn = new ShapeButton( "RUN" );
        runBtn.x = jumpBtn.x - runBtn.width - 10;
        runBtn.y = jumpBtn.y;
        runBtn.on( 'click', this._runner.run, this._runner );

        let idleBtn = new ShapeButton( "IDLE" );
        idleBtn.x = runBtn.x - idleBtn.width - 10;
        idleBtn.y = jumpBtn.y;
        idleBtn.on( 'click', this._runner.stand, this._runner );

        this.addChild( jumpBtn, runBtn, idleBtn );
    }

    protected $addEvent(): void {
        super.$addEvent();
        this.on( "tick", this._onTick, this );
    }

    private _onTick( evt ): void {
        this._runner.x += this._runner.speed;
        if ( this._runner.x > core.STAGE_WIDTH ) {
            this._runner.x = -this._runner.getBounds().width;
        }
    }
}

