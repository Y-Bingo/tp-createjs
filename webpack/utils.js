const path = require( 'path' );

const ROOT_PATH = process.cwd();

/** 路徑處理 */
exports.resolve = function ( dir ) {
    return path.resolve( ROOT_PATH, dir );
};