// declare let DEBUG: boolean;
// declare let DEFAULT_GAME_WIDTH: number;
// declare let DEFAULT_GAME_HEIGHT: number;
// declare let MAX_GAME_WIDTH: number;
// declare let MAX_GAME_HEIGHT: number;
// declare let SCALE_MODE: string;
// declare let GOOGLE_WEB_FONTS: string[];
// declare let SOUND_EXTENSIONS_PREFERENCE: string[];

declare let ASSEST_ROOT: string;

// use wildard module-declarations so typescript don't complain when you import files other than .ts or .js with file-loader

declare module '*.png' {
    const content: string;
    export = content;
}
declare module '*.fnt' {
    const content: string;
    export = content;
}
// This will allow you to load `.json` files from disk
declare module "*.json"
{
    const value: any;
    export default value;
}
// This will allow you to load JSON from remote URL responses
declare module "json!*"
{
    const value: any;
    export default value;
}
declare module '*.ogg' {
    const content: string;
    export = content;
}
declare module '*.mp3' {
    const content: string;
    export = content;
}