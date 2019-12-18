import "../libs/createjs/createjs.min.js";

import config from "../resource/default.res.json";

class Main {
    public show(): void {
        console.log( "hello world" );
        console.log( config );
        this._log();
    }
    private _log() {
        console.log( "createjs", createjs.Stage );
        console.log( "preload", createjs.LoadQueue );
        console.log( "preload", createjs.Sound );
        console.log( "preload", createjs.Tween );
    }
}

( new Main() ).show();

