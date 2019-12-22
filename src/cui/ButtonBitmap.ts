import Loader from "../Loader";

import BaseContainer from "./BaseContainer";

/**
 * 图片按钮
 */

/** 按钮状态 */
enum EButtonType {
    up = 1,
    down = 2
};

export default class ButtonBitmap extends BaseContainer {

    private _preClick: string;          // 点击前的资源
    private _click: string;             // 点击后的资源
    private _scale: number;             // 缩放显示

    private _icon: createjs.Bitmap;              // 按钮显示

    private _type: EButtonType;              // 按钮状态   


    constructor ( preClick?: string, click?: string, scale?: number ) {
        super();

        this._preClick = preClick || "";
        this._click = click || preClick || "";
        this._scale = scale || 1;

        this._initUI();
    }

    private _initUI() {
        this._icon = new createjs.Bitmap( "" );
        this.addChild( this._icon );

        this._setButtonType( EButtonType.up );
    }

    /** 切换按钮状态 */
    private _setButtonType( type ) {
        if ( this._type == type ) return;
        this._type = type;

        switch ( type ) {
            case EButtonType.up:
                this._icon.image = Loader.getIns().getRes( this._preClick ) as HTMLImageElement;
                this._setScale( 1 );
                break;
            case EButtonType.down:
                this._icon.image = Loader.getIns().getRes( this._click ) as HTMLImageElement;
                this._setScale( this._scale );
                break;
            default:
                break;
        }

        this.anchorOffX = 0.5;
        this.anchorOffY = 0.5;
    }

    /** 切换缩放大小 */
    private _setScale( scale ) {
        if ( this._scale == 1 ) return;
        this.scaleX = scale;
        this.scaleY = scale;
    }

    protected $addEvent(): void {
        super.$addEvent();

        this.on( "pressup", this._onMouseUp, this );
        this.on( "mousedown", this._onMouseDown, this );
    }

    private _onMouseUp() {
        this._setButtonType( EButtonType.up );
    }

    private _onMouseDown() {
        this._setButtonType( EButtonType.down );
    }
}