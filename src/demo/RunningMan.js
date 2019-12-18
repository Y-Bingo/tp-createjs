/**
 * demo: 奔跑者
 */

import { STAGE } from "../core.js";
import Loader from "../Loader.js";
import Runner from "./Runner.js";
import Button from "../ui/Button.js";

export const RM_RES_CONFIG = [
    { id: "runner", src: "resource/assets/demo/runningMan.png" },
    { id: "frank", src: "resource/assets/demo/frank.png" },
    { id: "villager1", src: "resource/assets/demo/villager1.png" },
    { id: "villager2", src: "resource/assets/demo/villager2.png" }
]

export class RunningMan extends createjs.Container {

    // runner图集
    spriteSheet;
    // 跑者
    runner;
    // 按钮

    constructor () {
        super();
        this.spriteSheet = new createjs.SpriteSheet( {
            'images': [ Loader.getIns().getRes( "runner" ) ],
            'frames': { 'regX': 0, 'height': 292, 'count': 64, 'regY': 0, 'width': 165 },
            'animations': { 'idle': [ 60 ], 'run': [ 0, 25 ], 'jump': [ 31, 60, 'idle' ] }
        } );
        this._initUI();
    }

    _initUI () {
        this._buildRunner( );
        this._buildButton();
    }

    _buildRunner () {
        this.runner = new Runner( this.spriteSheet  );
        this.runner.y = 100;
        this.addChild( this.runner );
    }

    _buildButton () {
        let jumpBtn = new Button( "JUMP" );
        let runBtn = new Button( "RUN" );
        let idleBtn = new Button( "IDLE" );

        jumpBtn.on( 'click', this.runner.jump.bind( this.runner ) );
        runBtn.on( 'click', this.runner.run.bind( this.runner ) );
        idleBtn.on( 'click', this.runner.stand.bind( this.runner ) );

        runBtn.x = jumpBtn.width + 10;
        idleBtn.x = runBtn.x + runBtn.width + 10;

        this.addChild( jumpBtn, runBtn, idleBtn );
    }
}

