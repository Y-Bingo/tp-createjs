import BaseContainer from "../cui/BaseContainer";
/**
 * 创建非常炫酷的Tween实例
 */
export default class CircleTween extends BaseContainer {

    private _circleCount: number = 25;
    private _activeCount: number = 0;
    private _tweenArr: createjs.Tween[] = [];

    constructor () {
        super();
        this._initUI();
    }

    private _initUI(): void {
        this._initCircles();
    }

    protected $addEvent(): void {
        super.$addEvent();
        this.stage.addEventListener( "stagemouseup", this._onMouseUP.bind( this ) );
    }

    private _initCircles() {
        for ( let i = 0;i < this._circleCount;i++ ) {
            let circle = new createjs.Shape();
            circle.graphics.setStrokeStyle( 10 );
            circle.graphics.beginStroke( "#443300" );
            circle.graphics.drawCircle( 0, 0, ( i + 1 ) * 5 );
            circle.compositeOperation = "lighter";

            let tween = createjs.Tween.get( circle )
                .to( { x: 300, y: 200 }, ( 0.5 + i * 0.04 ) * 1500, createjs.Ease.backInOut )
                .call( this._tweenComplete, null, this );

            this._tweenArr.push( tween );
            this.addChild( circle );
        }

        this._activeCount = this._circleCount;
    }

    private _onMouseUP( evt: any ) {
        if ( this._activeCount > this._circleCount / 2 ) {
            for ( let i = this._circleCount - 1;i >= 0;i-- ) {
                let ref = this._tweenArr[ i ].target;
                createjs.Tween.get( ref, { override: true } )
                    .to( { x: evt.stageX, y: evt.stageY }, ( 0.5 + i * 0.04 ) * 1500, createjs.Ease.backInOut )
                    .call( this._tweenComplete, null, this );
            }
            console.log( "c" );

        } else {
            for ( let i = 0;i < this._circleCount;i++ ) {
                let ref = this._tweenArr[ i ].target;
                createjs.Tween.get( ref, { override: true } )
                    .to( { x: evt.stageX, y: evt.stageY }, ( 0.5 + i * 0.04 ) * 1500, createjs.Ease.backInOut )
                    .call( this._tweenComplete, null, this );
            }
            console.log( "d" );
        }
        this._activeCount = this._circleCount;
    }

    private _tweenComplete() {
        this._activeCount--;
    }
}