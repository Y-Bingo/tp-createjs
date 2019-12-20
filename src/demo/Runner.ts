
export default class Runner extends createjs.Sprite {

    /** 移动速度 */
    speed = 0;

    constructor ( spriteSheet: createjs.SpriteSheet, animations: string = "idle" ) {
        super( spriteSheet, animations );
    }

    run() {
        if ( this.currentAnimation === 'idle' ) {
            this.gotoAndPlay( 'run' );
            this.speed = 10;
        }
    }

    jump() {
        if ( this.currentAnimation != 'jump' ) {
            this.gotoAndPlay( 'jump' );
            this.on( 'animationend', function ( e ) {
                if ( this.speed > 0 ) {
                    this.gotoAndPlay( 'run' );
                }
            } );
        }
    }

    stand() {
        if ( this.currentAnimation === 'run' ) {
            this.gotoAndStop( 'idle' );
            this.speed = 0;
        }
    }
}