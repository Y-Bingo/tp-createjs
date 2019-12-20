export default class BaseContainer extends createjs.Container {

    private _width: number;         // 组件宽度
    private _height: number;        // 组件高度
    private _anchorOffX: number;    // 锚点 X
    private _anchorOffY: number;    // 锚点 Y

    constructor () {
        super();
        this.on( "added", this.$onAdd );
    }

    /** 组件宽度 */
    get width(): number {
        let rect = this.getBounds();

        if ( !rect ) return 0;

        this._width = rect.width;
        return this._width;
    }
    /** 组件宽度 */
    set width( value ) {
        if ( isNaN( value ) ) return;
        if ( value == this._width ) return;
        let x = this.x;
        let y = this.y;
        let width = value;
        let height = this.height;
        this.setBounds( x, y, width, height );
    }

    /** 组件高度 */
    get height(): number {
        let rect = this.getBounds();

        if ( !rect ) return 0;

        this._height = rect.height;
        return this._height;
    }
    /** 组件高度 */
    set height( value ) {
        if ( isNaN( value ) ) return;
        if ( value == this._height ) return;
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = value;
        this.setBounds( x, y, width, height );
    }

    /** X锚点 0 ~ 1 */
    set anchorOffX( value: number ) {
        if ( isNaN( value ) ) return;
        if ( value == this._anchorOffX ) return;
        this._anchorOffX = Math.min( Math.max( value, 0 ), 1 );

        let width = this.width;
        this.regX = Math.round( width * value );
    }

    /** Y锚点 0 ~ 1 */
    set anchorOffY( value: number ) {
        if ( isNaN( value ) ) return;
        if ( value == this._anchorOffY ) return;
        this._anchorOffY = Math.min( Math.max( value, 0 ), 1 );

        let height = this.height;
        this.regY = Math.round( height * value );
    }

    /** 添加到舞台 */
    protected $onAdd(): void {
        this.$addEvent();
    }

    /** 事件添加 */
    protected $addEvent(): void {
        this.on( "removed", this.$onRemove );
    }

    /** 移出舞台 */
    protected $onRemove(): void {
        this.$removeEvent();
    }

    /** 事件添加 */
    protected $removeEvent(): void {
        this.removeAllEventListeners();
        // this.removeEventListener( "added", this.$onAdd );
        // this.removeEventListener( "removed", this.$onRemove );
    }

    /** 刷新 */
    protected $update() {

    }

    /** 销毁 */
    destroy(): void {

    }
}
