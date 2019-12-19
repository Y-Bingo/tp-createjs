/**
 * 字符串操作
*/
module utilsString {
    /**
    * 检查是否为16进制的字符串颜色值
    * @param color  string 
    * @returns boolean   true: 16进制颜色字符串 
    */
    export function check16Color( color: string ): boolean {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test( color );
    }
}

export default utilsString;