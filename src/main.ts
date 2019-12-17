import * as config from "../resource/default.res.json";

import "../libs/createjs/easelJS/easeljs.js";
import "../libs/createjs/preloadJS/preloadjs.js";
import "../libs/createjs/soundJS/soundjs.js";
import "../libs/createjs/tweenJS/tweenjs.js";

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

