/**
 * 游戏配置 以及初始化环境
 */
/**canvas */
export const CVS = document.querySelector( "#canvas" ) as HTMLCanvasElement;
/** 游戏宽度 */
export const STAGE_WIDTH = CVS.width;
/*  游戏宽度*/
export const STAGE_HEIGHT = CVS.height;

/**游戏舞台 */
export const STAGE = new createjs.Stage( CVS );

// 适配方案

let designWidth = 640; // 设计宽度为640

let designHeight = 1136; // 设计高度为1136

let viewWidth = document.documentElement.clientWidth; // 获取浏览器可视区域宽度

let viewHeight = document.documentElement.clientHeight; // 获取浏览器可视区域高度

// let mmScale = designWidth / designHeight;       // 设计宽高比
// let scale = viewWidth / designWidth;            // 缩放因子

CVS.width = designWidth;
CVS.height = designHeight;

// canvas.style.width = viewWidth + "px";

// canvas.style.height = viewHeight / scale+ "px";

setStage( CVS, designWidth, designHeight, viewWidth, viewHeight );
window.onresize = function ( e ) {
    let vw = document.documentElement.clientWidth;
    let vh = document.documentElement.clientHeight;
    setStage( CVS, designWidth, designHeight, vw, vh );
    // console.log( designWidth, designHeight, viewWidth, viewHeight );
};

function setStage( cav, dw, dh, vw, vh ) {
    let ds = dw / dh;
    let vs = vw / vh;

    let nw = 0, nh = 0;
    if ( vs > ds ) {
        nw = Math.ceil( vh * ds );
        nh = vh;
    } else if ( vs <= ds ) {
        nw = vw;
        nh = Math.ceil( vw / ds );
    }

    cav.style.width = nw + "px";
    cav.style.height = nh + "px";
}