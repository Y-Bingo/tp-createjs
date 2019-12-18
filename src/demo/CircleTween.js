import { STAGE } from "./core.js";
/**
 * 创建非常炫酷的Tween实例
 */
class CircleTween {

    circleCount = 25;
    activeCount = 0;

    tweens = [];

    constructor () {
        this.initCircles();
        STAGE.addEventListener( "stagemouseup", this.handlerMouseup.bind( this ) );

        createjs.Ticker.addEventListener( "tick", STAGE );
    }

    initCircles () {
        for ( let i = 0; i < this.circleCount; i++ ) {
            let circle = new createjs.Shape();
            circle.graphics.setStrokeStyle( 10 );
            circle.graphics.beginStroke( "#443300" );
            circle.graphics.drawCircle( 0, 0, ( i + 1 ) * 5 );
            circle.compositeOperation = "lighter";

            let tween = createjs.Tween.get( circle )
                .to( { x: 300, y: 200 }, ( 0.5 + i * 0.04 ) * 1500, createjs.Ease.backInOut )
                .call( this.tweenComplete, this );

            this.tweens.push( tween );

            STAGE.addChild( circle );
        }

        this.activeCount = this.circleCount;
    }

    isFlag = true;
    handlerMouseup ( e ) {
        if ( this.activeCount > this.circleCount / 2 ) {
            for ( let i = this.circleCount - 1; i >= 0; i-- ) {
                let ref = this.tweens[ i ].target;
                createjs.Tween.get( ref, { override: true } )
                    .to( { x: STAGE.mouseX, y: STAGE.mouseY }, ( 0.5 + i * 0.04 ) * 1500, createjs.Ease.backInOut.call( this.tweenComplete ) );
            }
        } else {
            for ( let i = 0; i > this.circleCount; i++ ) {
                let ref = this.tweens[ i ].target;
                createjs.Tween.get( ref, { override: true } )
                    .to( { x: STAGE.mouseX, y: STAGE.mouseY }, ( 0.5 + i * 0.04 ) * 1500, createjs.Ease.backInOut.call( this.tweenComplete ) );
            }
        }
        this.activeCount = this.circleCount;
    }

    tweenComplete () {
        this.activeCount--;
    }

}

new CircleTween();