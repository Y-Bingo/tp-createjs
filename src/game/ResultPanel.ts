import Circle from "./Circle";
import Loader from "../Loader";

import BaseContainer from "../cui/BaseContainer";
import ButtonBitmap from "../cui/ButtonBitmap";
import core from "../core";

/**
 * 结算面板
 */

export default class ResultPanel extends BaseContainer {

    private _bg: createjs.Bitmap;              // 背景
    private _btn_share: ButtonBitmap;       // 分享
    private _btn_again: ButtonBitmap;       // 再来一次
    private _border: createjs.Bitmap;          // 底部

    constructor () {
        super();

        this._initUI();
    }

    private _initUI() {
        this.width = core.STAGE_WIDTH;
        this.height = core.STAGE_HEIGHT;

        this._bg = new createjs.Bitmap( Loader.getIns().getRes( "win_panel_bg" ) );
        this.regX = this._bg.getBounds().width / 2 * 1.4;
        this.regY = this._bg.getBounds().height / 2 * 1.4;
        this._bg.x = this.width / 2;
        this._bg.y = this.height / 2 - this._bg.getBounds().height / 2;
        this._bg.scaleX = this._bg.scaleY = 1.4;
        this.addChild( this._bg );

        this._btn_share = new ButtonBitmap( "btn_share", "", 0.9 );
        this._btn_share.x = 480;
        this._btn_share.y = 980;
        this.addChild( this._btn_share );

        this._btn_again = new ButtonBitmap( "btn_again", "", 0.9 );
        this._btn_again.x = 780;
        this._btn_again.y = 980;
        this.addChild( this._btn_again );

        // this._border = new createjs.Bitmap( Loader.getIns().getRes( "more" ) );
        // this.addChild( this._border );

        // let x = core.STAGE_WIDTH / 2;
        // let y = core.STAGE_HEIGHT;

        // this._border.x = x;
        // this._border.y = this.height;


        console.log( this.width, this.height );
    }
}