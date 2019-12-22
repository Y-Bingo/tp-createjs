import BaseContainer from "./BaseContainer";
/**
 * 自定义 绘画出来的加载界面
 */

const PROGRESS_WIDTH = 400;
const PROGRESS_HEIGHT = 40;

export default class ShapePreloadUI extends BaseContainer {

    private _fillColor: string;         // 进度条填充颜色 #FFF
    private _strokeColor: string;       // 进度条描边颜色

    private bar: createjs.Shape;
    private outLine: createjs.Shape;

    constructor ( fillColor: string, strokeColor: string ) {
        super();
        this._fillColor = fillColor;
        this._strokeColor = strokeColor;
        this._initUI();
    }

    private _initUI() {
        this._drawPreloader();
    }

    onProgress( e ) {
        this._updateProgress( e.progress );
        console.log( e.progress );
    }

    /** 绘制进度条 */
    private _drawPreloader() {
        let outline = new createjs.Shape();
        outline.graphics.beginStroke( this._strokeColor );
        outline.graphics.drawRect( 0, 0, PROGRESS_WIDTH, PROGRESS_HEIGHT );
        this.outLine = outline;

        let bar = new createjs.Shape();
        bar.graphics.beginFill( this._fillColor );
        bar.graphics.drawRect( 0, 0, PROGRESS_WIDTH, PROGRESS_HEIGHT );
        bar.scaleX = 0;
        this.bar = bar;

        this.addChild( bar, outline );
        this.setBounds( 0, 0, PROGRESS_WIDTH, PROGRESS_HEIGHT );
    }

    private _updateProgress( progress ) {
        progress = Math.min( 1, progress );
        this.bar.scaleX = progress;
    }
}