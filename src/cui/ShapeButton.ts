import utilsString from "../utils/String";
import BaseContainer from "./BaseContainer";

/** 
 * 自定义 绘画按钮
 */
export default class ShapeButton extends BaseContainer {

    private labelTxt: createjs.Text;
    private background: createjs.Shape;

    private _label: string = "";
    /** 字体大小 */
    private _fontSize: number = 24;
    /** 文字字体 */
    private _fontFamily: string = "Arial";
    /** 顶部内边距 */
    private _paddingTop: number = 10;
    /** 左边内边距 */
    private _paddingLeft: number = 15;


    /** 文字底色 */
    private _buttonColor: string = '#ccc';
    /** 正常色 */
    private _borderColor: string = "#000";
    /** 弹起色 */
    private _upColor: string = "#ccc";
    /** 选中色 */
    private _overColor = '#aaa';

    constructor ( label: string ) {
        super();
        this._label = label;
        this._initPart();
    }

    /** 组件初始化 */
    private _initPart() {
        this._drawButton();
    }

    /** 绘制按钮 */
    private _drawButton() {
        this.removeAllChildren();

        var labelTxt = new createjs.Text( this._label, this.fontSize + 'px' + this._fontFamily );
        labelTxt.textAlign = 'center';
        labelTxt.textBaseline = 'top';

        let width = Math.round( labelTxt.getMeasuredWidth() ) + this._paddingLeft * 2;
        let height = Math.round( labelTxt.getMeasuredHeight() ) + this._paddingTop * 2;
        labelTxt.x = width / 2;
        labelTxt.y = this._paddingTop;

        let background = new createjs.Shape();
        background.setBounds( 0, 0, width, height );
        background.graphics
            .beginStroke( this._borderColor )
            .beginFill( this._buttonColor )
            .drawRect( 0, 0, width, height );

        this.labelTxt = labelTxt;
        this.background = background;
        this.addChild( background, labelTxt );
    }

    /** 弹起颜色 */
    set upColor( value: string ) {
        if ( !utilsString.check16Color( value ) ) return;
        if ( this._upColor == value ) return;
        this._upColor = value;
        this._stageChange();
    }

    /** 弹起颜色 */
    set overColor( value: string ) {
        if ( !utilsString.check16Color( value ) ) return;
        if ( this._overColor == value ) return;
        this._overColor = value;
        this._stageChange();
    }

    /** 设置字体 大小 */
    set fontSize( value: number ) {
        if ( isNaN( value ) ) return;
        if ( this._fontSize == value ) return;
        this._fontSize = value;
        this.labelTxt.font = this.fontSize + 'px' + this._fontFamily;
    }

    protected $addEvent(): void {
        super.$addEvent();
        this.cursor = 'pointer';
        this.on( 'rollover', this._onButtonOver );
        this.on( 'rollout', this._onButtonOut );
    }

    private _onButtonOver(): void {
        this._buttonColor = this._overColor;
        this._stageChange();
    }

    private _onButtonOut(): void {
        this._buttonColor = this._upColor;
        this._stageChange();
    }

    private _stageChange(): void {
        let width = this.width;
        let height = this.height;

        this.removeChild( this.background );

        let background = new createjs.Shape();
        background.setBounds( 0, 0, width, height );
        background.graphics
            .beginStroke( this._borderColor )
            .beginFill( this._buttonColor )
            .drawRect( 0, 0, width, height );
        this.background = background;
        this.addChildAt( background, 0 );
    }

    protected $removeEvent(): void {
        this.off( 'rollover', this._onButtonOver );
        this.off( 'rollout', this._onButtonOut );
    }
}
