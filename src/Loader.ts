/**
 * 资源加载器
 */
interface IConfig {

}

interface IProgressObj {
    onProgress: ( eventObj: IProgressEvent ) => void;
}

interface IProgressEvent {
    progress: number;
}

export default class Loader {

    private static _ins: Loader;
    public static getIns(): Loader {
        if ( !this._ins )
            this._ins = new Loader;
        return this._ins;
    }
    // 加载队列
    private _loadQueue: createjs.LoadQueue;
    // 加载完成回调
    private _callBack: Function;
    // 回调对象
    private _callObj: any;
    // 回调参数
    private _args: any;
    // 进度对象
    private _progressObj: IProgressObj;

    constructor () {
        this._loadQueue = new createjs.LoadQueue();
        this._loadQueue.on( "complete", this._onComplete, this );
        this._loadQueue.on( "progress", this._onProgress, this );
        this._loadQueue.on( "error", this._onError, this );
    }

    /** 加载 miniFest文件 */
    loadConfig( config: IConfig[], callback?: any, obj?: any, args?: any ): void {
        this._callBack = callback || null;
        this._callObj = obj || null;
        this._args = args || null;

        if ( !config || !config.length ) {
            this._onProgress( { progress: 1 } );
            this._onComplete();
            console.warn( "加载配置失败！", config );
            return;
        }

        this._loadQueue.loadManifest( config );
    }

    // 设置加载进度
    setLoadProgress( progressObj: IProgressObj ): void {
        this._progressObj = progressObj || null;
    }

    // 获取资源
    getRes( value?: any, rawResult?: boolean ) {
        return this._loadQueue.getResult( value, rawResult ) || null;
    }

    private _onComplete() {
        if ( !this._callBack ) return;

        this._callBack.apply( this._callObj, this._args );
        this._callBack = null;
        this._args = null;
    }

    private _onProgress( eventObj: IProgressEvent ) {
        if ( !this._progressObj || !this._progressObj.onProgress ) return;
        this._progressObj.onProgress( eventObj );
    }

    private _onError( eventObj: Object ): void {
        console.error( "加载失败！", event );
    }
}