/**
 * 资源加载器
 */
interface IConfig {

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
    private _progressObj: any;

    constructor () {
        createjs.LoadQueue;
        this._loadQueue = new createjs.LoadQueue();
        this._loadQueue.addEventListener( "complete", this._onComplete.bind( this ) );
        this._loadQueue.addEventListener( "progress", this._onProgress.bind( this ) );
    }

    loadConfig( config: IConfig, callback?: any, obj?: any, args?: any ) {
        this._callBack = callback || null;
        this._callObj = obj || null;
        this._args = args || null;

        this._loadQueue.loadManifest( config );
    }

    // 设置加载进度
    setLoadProgress( progressObj ) {
        this._progressObj = progressObj || null;
    }

    // 获取资源
    getRes( resName: string ) {
        return this._loadQueue.getResult( resName ) || null;
    }

    private _onComplete() {
        if ( !this._callBack ) return;

        this._callBack.apply( this._callObj, this._args );
        this._callBack = null;
        this._args = null;
    }

    private _onProgress( e ) {
        if ( !this._progressObj || !this._progressObj.onProgress ) return;
        this._progressObj.onProgress( e );
    }

}