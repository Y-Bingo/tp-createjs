import { STAGE_HEIGHT, STAGE_WIDTH } from '../core.js';

export default class Runner extends createjs.Sprite {
    speed = 0;
    constructor ( spriteSheet ) {
        super();
        this.initialize( spriteSheet );
    }

    initialize ( spriteSheet ) {
        super.initialize( spriteSheet, 'idle' );
        this.on( 'tick', function ( e ) {
            this.x += this.speed;
            if ( this.x > STAGE_WIDTH ) {
                this.x = -this.getBounds().width;
            }
        } )
    }

    run () {
        if ( this.currentAnimation === 'idle' ) {
            this.gotoAndPlay( 'run' );
            this.speed = 10;
        }
    }

    jump () {
        if ( this.currentAnimation != 'jump' ) {
            this.gotoAndPlay( 'jump' );
            this.on( 'animationend', function ( e ) {
                if ( this.speed > 0 ) {
                    this.gotoAndPlay( 'run' );
                }
            } )
        }
    }

    stand () {
        if ( this.currentAnimation === 'run' ) {
            this.gotoAndStop( 'idle' );
            this.speed = 0;
        }
    }
}