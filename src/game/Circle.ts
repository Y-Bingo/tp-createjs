import Loader from "../Loader";
import { RADIUS } from "./Constants";

/**
 * 圆圈
 */
export default class Circle extends createjs.Bitmap {

    private _type: number;    // 圆圈类型
    public row: number;       // 行索引
    public col: number;       // 列索引

    constructor ( type ) {
        super( null );
        this.setType( type || 1 );
        this.regX = RADIUS / 2;
        this.regY = RADIUS / 2;
        this.scaleX = 1.4;
        this.scaleY = 1.4;
    }

    setType( type: number ) {
        if ( isNaN( type ) || this._type == type ) return;
        this._type = type;
        if ( type === 1 || type === 2 ) {
            this.image = Loader.getIns().getRes( "pot_" + type ) as any;
        }
        else {
            console.warn( "illegal circle type", type );
        }
    }
}